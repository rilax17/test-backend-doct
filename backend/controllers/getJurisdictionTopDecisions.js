const { dbInit } = require('../models/dbInit')

/* CONFIG */
const decisionParams = {
  select: ['title', 'doc_id'],
  formation: 'CHAMBRE_CRIMINELLE',
  solution: '%cassation%',
  date: '1980/01/01',
  limit: '10',
}

module.exports = async function getJurisdictionContactInfos(req, res) {
  let jurisdiction_id = req.query.jurisdiction_id

  // No jurisdiction_id
  if (!jurisdiction_id) {
    let error = {message: "jurisdiction_id needs to be specified"}
    res.status(400)
    return res.json({
      error,
    })
  }

  // Instantiating DB
  const db = await dbInit()

  let jurisdiction_top_decisions = await db.all(`
    select ` + decisionParams.select.join(', ') + ` from decisions as d
    where d.jurisdiction = (select name from jurisdictions where jurisdiction_id = ?)
    and d.formation = ?
    and d.solution like ?
    and d.dec_date > ?
    order by dec_date desc
    limit ?`,
  [jurisdiction_id, decisionParams.formation, decisionParams.solution, decisionParams.date, decisionParams.limit])

  // bad_id
  if (jurisdiction_top_decisions.length === 0) {
    let error = {message: "Unknown jurisdiction_id (probably)"}
    res.status(404)
    return res.json({
      error,
    })
  }

  return res.json({
    jurisdiction_top_decisions,
  })
}

