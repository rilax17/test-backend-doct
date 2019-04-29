process.env.NODE_ENV='test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()

chai.use(chaiHttp)

describe('getJurisdictionContactInfos Controller', () => {

  describe('/getJurisdictionContactInfos (without query params)', () => {
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getJurisdictionContactInfos')
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

  describe('/getJurisdictionContactInfos?jurisdiction_id=BAD_ID', () => {
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getJurisdictionContactInfos?jurisdiction_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(404)
          should.exist(res.body.error)
          res.body.error.should.be.a('object')
          should.exist(res.body.error.message)
          res.body.error.message.should.be.a('string')
          res.body.error.message.should.be.eq('Unknown jurisdiction_id')
          done()
        })
    })
  })

  describe('/getJurisdictionContactInfos?jurisdiction_id=OK_ID (JUR359D88F9B71718E7F4A6)', () => {
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getJurisdictionContactInfos?jurisdiction_id=JUR359D88F9B71718E7F4A6')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          should.not.exist(res.body.error)
          should.exist(res.body.jurisdiction_contact_infos)

          should.exist(res.body.jurisdiction_contact_infos.telephone)
          res.body.jurisdiction_contact_infos.telephone.should.be.a('array')
          if (res.body.jurisdiction_contact_infos.telephone.length !== 0) {
            for (let i = 0; i < res.body.jurisdiction_contact_infos.telephone.length; i++) {
              should.exist(res.body.jurisdiction_contact_infos.telephone[i].data)
              res.body.jurisdiction_contact_infos.telephone[i].data.should.be.a('string')
              should.exist(res.body.jurisdiction_contact_infos.telephone[i].verified)
              res.body.jurisdiction_contact_infos.telephone[i].verified.should.be.a('boolean')
            }
          }

          should.exist(res.body.jurisdiction_contact_infos.email)
          res.body.jurisdiction_contact_infos.email.should.be.a('array')
          if (res.body.jurisdiction_contact_infos.email.length !== 0) {
            for (let i = 0; i < res.body.jurisdiction_contact_infos.email.length; i++) {
              should.exist(res.body.jurisdiction_contact_infos.email[i].data)
              res.body.jurisdiction_contact_infos.email[i].data.should.be.a('string')
              should.exist(res.body.jurisdiction_contact_infos.email[i].verified)
              res.body.jurisdiction_contact_infos.email[i].verified.should.be.a('boolean')
            }
          }

          should.exist(res.body.jurisdiction_contact_infos.fax)
          res.body.jurisdiction_contact_infos.fax.should.be.a('array')
          if (res.body.jurisdiction_contact_infos.fax.length !== 0) {
            for (let i = 0; i < res.body.jurisdiction_contact_infos.fax.length; i++) {
              should.exist(res.body.jurisdiction_contact_infos.fax[i].data)
              res.body.jurisdiction_contact_infos.fax[i].data.should.be.a('string')
              should.exist(res.body.jurisdiction_contact_infos.fax[i].verified)
              res.body.jurisdiction_contact_infos.fax[i].verified.should.be.a('boolean')
            }
          }

          done()
        })
    })
  })

})
