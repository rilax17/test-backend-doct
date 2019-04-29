const { dbInit } = require('../models/dbInit')

/* CONFIG */
const contactTypes = ['telephone', 'email', 'fax'] // make sure these exist in database

const getJurisdiction = async function(db, jurisdiction_id) {
  return await db.get(`
    SELECT ` + contactTypes.join(', ') + `
    FROM jurisdictions
    WHERE jurisdiction_id = ?`,
  [jurisdiction_id])
}

const init_jurisdiction_contact_infos = function(jurisdiction_contact_infos, jurisdiction) {
  for (let k in contactTypes) {
    jurisdiction_contact_infos[contactTypes[k]] = []
    if (jurisdiction[contactTypes[k]] != null) {
      jurisdiction_contact_infos[contactTypes[k]].push({
        "data": jurisdiction[contactTypes[k]],
        "verified": false,
      })
    }
  }
}

const populate_verified_contacts = async function(db, jurisdiction_contact_infos,jurisdiction_id) {
  await db.each(`
    SELECT type, data
    FROM jurisdictions_verified_contact_infos
    WHERE jurisdiction_id = ?`,
  [jurisdiction_id], function(err, row) {
    if (err) {
      console.log(err)
      if (!row)
        return
    }
    if (row) {
      if (!jurisdiction_contact_infos[row.type]) {
        jurisdiction_contact_infos[row.type] = []
      }
      let contact_found = false
      for (let k in jurisdiction_contact_infos[row.type]) {
        if (row.data === jurisdiction_contact_infos[row.type][k].data) {
          contact_found = true
          jurisdiction_contact_infos[row.type][k].verified = true
        }
      }
      if (!contact_found) {
        jurisdiction_contact_infos[row.type].push({
          "data": row.data,
          "verified": true,
        })
      }
    }
  })
}

module.exports = async function getJurisdictionContactInfos(req, res) {
  let jurisdiction_id = req.query.jurisdiction_id
  let jurisdiction_contact_infos = Object.create(null)

  // If jurisdiction_id not provided, return error
  if (!jurisdiction_id) {
    let error = {message: "jurisdiction_id needs to be specified"}
    res.status(400)
    return res.json({
      error,
    })
  }

  // Instantiating DB
  const db = await dbInit()

  let jurisdiction = await getJurisdiction(db, jurisdiction_id)

  // If no jurisdiction from query, we assume bad jurisdiction_id and return corresponding error
  if (!jurisdiction) {
    let error = {message: "Unknown jurisdiction_id"}
    res.status(404)
    return res.json({
      error,
    })
  }

  // Initializing jurisdiction_contact_infos with contactTypes and data from DB
  init_jurisdiction_contact_infos(jurisdiction_contact_infos, jurisdiction)

  // Now let's grab verified contacts infos, and match up with data from jurisdiction
  await populate_verified_contacts(db, jurisdiction_contact_infos,jurisdiction_id)

  return res.json({
    jurisdiction_contact_infos,
  })
}
