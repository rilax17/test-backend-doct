const { dbInit } = require('../models/dbInit')

module.exports = async function(req, res) {
  let jurisdiction_id = req.params.jurisdiction_id

  // Database instantiation
  const db = await dbInit()

  let row = await db.get(`
    SELECT *
    FROM jurisdictions
    WHERE jurisdiction_id = ?`,
  [jurisdiction_id])

  if (row == null) {
    let error = {message: "Unknown jurisdiction"}
    res.status(404)
    return res.json({
      error,
    })
  }

  res.json({ jurisdiction_infos: row })
}
