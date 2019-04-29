const { dbInit } = require('../models/dbInit')

module.exports = async function getDecision(req, res) {
  let doc_id = req.query.doc_id

  // If doc_id not provided, return error
  if (!doc_id) {
    let error = {message: "doc_id needs to be specified"}
    res.status(400)
    return res.json({
      error,
    })
  }

  // Database instantiation
  const db = await dbInit()

  // database query
  let decision = await db.get(`
    SELECT *
    FROM decisions
    WHERE doc_id = ?`,
  [doc_id]).then(await db.close())


  // If no decision from query, we assume bad doc_id and return corresponding error
  if (!decision) {
    let error = {message: "Unknown doc_id"}
    res.status(404)
    return res.json({
      error,
    })
  }

  // Cleaning a little bit html_content
  if (decision.html_content) {
    decision.html_content = decision.html_content.toString().replace(/\\n/gi, '')
    decision.html_content = decision.html_content.toString().replace(/\\t/gi, '')
  }

  return res.json({
    decision,
  })
}
