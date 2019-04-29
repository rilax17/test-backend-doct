process.env.NODE_ENV='test' //todo

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const should = chai.should()

chai.use(chaiHttp)

describe('getDecision Controller', () => {

  describe('/getDecision (without query params)', () => {
    it('Should have err == null', (done) => {
      chai.request(server)
        .get('/getDecision')
        .end((err, res) => {
          should.not.exist(err)
          done()
        })
    })
    it('Should have status == 400', (done) => {
      chai.request(server)
        .get('/getDecision')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(400)
          done()
        })
    })
    it('Should have body.error', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res.body.error)
          done()
        })
    })
    it('Should have typeof error == object', (done) => {
      chai.request(server)
        .get('/getDecision')
        .end((err, res) => {
          should.not.exist(err)
          res.body.error.should.be.a('object')
          done()
        })
    })
    it('Should have body.error.message', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res.body.error.message)
          done()
        })
    })
    it('Should have typeof error.message == string', (done) => {
      chai.request(server)
        .get('/getDecision')
        .end((err, res) => {
          should.not.exist(err)
          res.body.error.message.should.be.a('string')
          done()
        })
    })
    it('Should have error.message === \'doc_id needs to be specified\'', (done) => {
      chai.request(server)
        .get('/getDecision')
        .end((err, res) => {
          should.not.exist(err)
          res.body.error.message.should.be.eq('doc_id needs to be specified')
          done()
        })
    })
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getDecision')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(400)
          should.exist(res.body.error)
          res.body.error.should.be.a('object')
          should.exist(res.body.error.message)
          res.body.error.message.should.be.a('string')
          res.body.error.message.should.be.eq('doc_id needs to be specified')
          done()
        })
    })
  })

  describe('/getDecision?doc_id=BAD_ID', () => {
    it('Should have err == null', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          done()
        })
    })
    it('Should have status == 404', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(404)
          done()
        })
    })
    it('Should have body.error', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res.body.error)
          done()
        })
    })
    it('Should have typeof error == object', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.body.error.should.be.a('object')
          done()
        })
    })
    it('Should have body.error.message', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res.body.error.message)
          done()
        })
    })
    it('Should have typeof error.message == string', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.body.error.message.should.be.a('string')
          done()
        })
    })
    it('Should have error.message === \'Unknown doc_id\'', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.body.error.message.should.be.eq('Unknown doc_id')
          done()
        })
    })
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=BAD_ID')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(404)
          should.exist(res.body.error)
          res.body.error.should.be.a('object')
          should.exist(res.body.error.message)
          res.body.error.message.should.be.a('string')
          res.body.error.message.should.be.eq('Unknown doc_id')
          done()
        })
    })
  })

  describe('/getDecision?doc_id=OK_ID  (JURITEXT000035924269)', () => {
    it('Should have err == null', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          done()
        })
    })
    it('Should have status == 200', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          done()
        })
    })
    it('Should not have body.error', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          should.not.exist(res.body.error)
          done()
        })
    })
    it('Should have body.decision', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res.body.decision)
          done()
        })
    })
    it('Should have body.decision.title', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res.body.decision.title)
          done()
        })
    })
    it('Should have body.decision.html_content', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res.body.decision.html_content)
          done()
        })
    })
    it('Should not have body.decision.html_content containing \\\\n', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          res.body.decision.html_content.should.be.a('string').that.not.contains('\\n')
          done()
        })
    })
    it('Should not have body.decision.html_content containing \\\\t', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          res.body.decision.html_content.should.be.a('string').that.not.contains('\\t')
          done()
        })
    })
    it('Should pass tests: no err, good status, good response (in details)', (done) => {
      chai.request(server)
        .get('/getDecision?doc_id=JURITEXT000035924269')
        .end((err, res) => {
          should.not.exist(err)
          res.should.have.status(200)
          should.not.exist(res.body.error)
          should.exist(res.body.decision)
          res.body.decision.should.be.a('object')
          should.exist(res.body.decision.title)
          res.body.decision.title.should.be.a('string')
          should.exist(res.body.decision.html_content)
          res.body.decision.html_content.should.be.a('string')
          res.body.decision.html_content.should.be.a('string').that.not.contains('\\n')
          res.body.decision.html_content.should.be.a('string').that.not.contains('\\t')
          done()
        })
    })
  })

})
