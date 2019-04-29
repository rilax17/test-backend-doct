process.env.NODE_ENV='test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()

chai.use(chaiHttp)

describe('getJurisdictionTopDecisions Controller', () => {

  describe('/getJurisdictionTopDecisions (without query params)', () => {
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getJurisdictionTopDecisions')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(400)
          should.exist(res.body.error)
          res.body.error.should.be.a('object')
          should.exist(res.body.error.message)
          res.body.error.message.should.be.a('string')
          res.body.error.message.should.be.eq('jurisdiction_id needs to be specified')
          done()
        })
    })
  })

  describe('/getJurisdictionTopDecisions?jurisdiction_id=BAD_ID', () => {
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getJurisdictionTopDecisions?jurisdiction_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(404)
          should.exist(res.body.error)
          res.body.error.should.be.a('object')
          should.exist(res.body.error.message)
          res.body.error.message.should.be.a('string')
          res.body.error.message.should.be.eq('Unknown jurisdiction_id (probably)')
          done()
        })
    })
  })

  describe('/getJurisdictionTopDecisions?jurisdiction_id=JUR359D88F9B71718E7F4A6', () => {
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getJurisdictionTopDecisions?jurisdiction_id=JUR359D88F9B71718E7F4A6')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          should.not.exist(res.body.error)
          should.exist(res.body.jurisdiction_top_decisions)
          res.body.jurisdiction_top_decisions.should.be.a('array')
          res.body.jurisdiction_top_decisions.length.should.be.eql(10)
          done()
        })
    })
  })

})

