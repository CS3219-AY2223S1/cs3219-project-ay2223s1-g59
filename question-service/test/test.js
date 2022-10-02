import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'

chai.use(chaiHttp)
chai.should()

describe('GET /easy', () => {
    it("should return an easy question", (done) => {
        chai.request(app)
            .get('/questions/easy')
            .end((err, res) => {
                if (err) return done(err)
                res.should.have.status(200)
                res.body.should.have.property('difficulty', 'easy')
                res.body.should.have.property('title')
                res.body.should.have.property('description')
                done()
            })
    })
})

describe('GET /medium', () => {
    it("should return an medium question", (done) => {
        chai.request(app)
            .get('/questions/medium')
            .end((err, res) => {
                if (err) return done(err)
                res.should.have.status(200)
                res.body.should.have.property('difficulty', 'medium')
                res.body.should.have.property('title')
                res.body.should.have.property('description')
                done()
            })
    })
})

describe('GET /hard', () => {
    it("should return an hard question", (done) => {
        chai.request(app)
            .get('/questions/hard')
            .end((err, res) => {
                if (err) return done(err)
                res.should.have.status(200)
                res.body.should.have.property('difficulty', 'hard')
                res.body.should.have.property('title')
                res.body.should.have.property('description')
                done()
            })
    })
})