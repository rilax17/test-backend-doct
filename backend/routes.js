const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

let redisMiddleWare = require('./redis')

router.get('/',
  asyncHandler(require('./controllers/index')))
router.get('/jurisdiction/:jurisdiction_id',
  asyncHandler(require('./controllers/jurisdiction')))
router.get('/getJurisdictionContactInfos',
  asyncHandler(require('./controllers/getJurisdictionContactInfos')))
router.get('/getJurisdictionTopDecisions', redisMiddleWare,
  asyncHandler(require('./controllers/getJurisdictionTopDecisions')))
router.get('/getDecision',
  asyncHandler(require('./controllers/getDecision')))

module.exports = router
