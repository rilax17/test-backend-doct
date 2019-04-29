process.env.NODE_ENV='test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Jurisdiction Controller', () => {

  describe('get /jurisdiction ', () => {
    it('It should return 404', (done) => {
      chai.request(server)
        .get('/jurisdiction')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(404)
          should.exist(res.error)
          res.error.should.be.a('error')
          should.exist(res.error.text)
          res.error.text.should.be.eq('Page doesn\'t exist')
          should.exist(res.error.status)
          res.error.status.should.be.a('number')
          res.error.status.should.be.eq(404)
          done()
        })
    })
  })

  describe('get /jurisdiction/BAD_ID ', () => {
    it('It should return 404 \'Unknown jurisdiction\'', (done) => {
      chai.request(server)
        .get('/jurisdiction/BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(404)
          should.exist(res.body.error)
          res.body.error.should.be.a('object')
          should.exist(res.body.error.message)
          res.body.error.message.should.be.a('string')
          res.body.error.message.should.be.eq('Unknown jurisdiction')
          done()
        })
    })
  })


  describe('get /jurisdiction/JUR359D88F9B71718E7F4A6 ', () => {
    it('It should return jurisdiction', (done) => {
      chai.request(server)
        .get('/jurisdiction/JUR359D88F9B71718E7F4A6')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          should.not.exist(res.body.error)
          should.exist(res.body.jurisdiction_infos)
          res.body.jurisdiction_infos.should.be.a('object')
          should.exist(res.body.jurisdiction_infos.id)
          res.body.jurisdiction_infos.id.should.be.a('number')
          should.exist(res.body.jurisdiction_infos.jurisdiction_id)
          res.body.jurisdiction_infos.jurisdiction_id.should.be.a('string')
          should.exist(res.body.jurisdiction_infos.pivot_local)
          res.body.jurisdiction_infos.pivot_local.should.be.a('string')
          should.exist(res.body.jurisdiction_infos.name)
          res.body.jurisdiction_infos.name.should.be.a('string')
          should.exist(res.body.jurisdiction_infos.address)
          res.body.jurisdiction_infos.address.should.be.a('string')
          should.exist(res.body.jurisdiction_infos.postal_code)
          res.body.jurisdiction_infos.postal_code.should.be.a('string')
          should.exist(res.body.jurisdiction_infos.commune_name)
          res.body.jurisdiction_infos.commune_name.should.be.a('string')
          // should.exist(res.body.jurisdiction_infos.telephone)
          // res.body.jurisdiction_infos.telephone.should.be.a('string')
          // should.exist(res.body.jurisdiction_infos.fax)
          // res.body.jurisdiction_infos.fax.should.be.a('string')
          // should.exist(res.body.jurisdiction_infos.email)
          // res.body.jurisdiction_infos.email.should.be.a('string')
          should.exist(res.body.jurisdiction_infos.website)
          res.body.jurisdiction_infos.website.should.be.a('string')

          done()
        })
    })
  })

})
