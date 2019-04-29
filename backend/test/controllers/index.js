process.env.NODE_ENV='test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Index Controller', () => {

  describe('get /', () => {
    it('It should get all jurisdiciton links', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          should.exist(res.body.links)
          res.body.links.should.be.a('array')
          res.body.links.length.should.be.eql(2)
          for (let i = 0; i < res.body.links.length; i++) {
            should.exist(res.body.links[i].url)
            res.body.links[i].url.should.be.a('string')
            should.exist(res.body.links[i].title)
            res.body.links[i].title.should.be.a('string')
          }
          done()
        })
    })
  })

  describe('get /404', () => {
    it('Should get 404', (done) => {
      chai.request(server)
        .get('/404')
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

})
