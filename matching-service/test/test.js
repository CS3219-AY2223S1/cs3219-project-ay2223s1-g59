import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'
import Match from '../models/match.js'
import Interview from '../models/interview.js'
import {
    firstUserEasyDifficulty,
    firstUserUsernameOnly,
    secondUserHardDifficulty,
    easyInterviewFirstAndThirdUser,
    hardInterviewFifthAndSixthUser
} from './testData.js'

chai.use(chaiHttp)
chai.should()

describe('POST /find-match', () => {
    describe("Checks interview database and finds existing interview.", () => {
        before(async () => {
            await Interview.create(easyInterviewFirstAndThirdUser)
        });
        it("should return interviewId since existing interview found.", (done) => {
            chai.request(app)
                .post('/find-match')
                .send(firstUserEasyDifficulty)
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(200)
                    res.body.should.have.property('interviewId')
                    done()
                })
        })

        after(async () => {
            await Interview.deleteMany({})
            await Match.deleteMany({})
        })
    })

    describe("Unable to find a matching partner", () => {
        it("should timeout after 30s. (Match document will expire after 30s also).", (done) => {
            chai.request(app)
                .post('/find-match')
                .send(secondUserHardDifficulty)
                .end((err, res) => {
                    
                    if (err) return done(err)
                    res.should.have.status(200)
                    res.body.should.have.property('message')
                    done()
                })
        }).timeout(33000)

        after(async () => {
            await Interview.deleteMany({})
            await Match.deleteMany({})
        })
    })
})

describe("DELETE /cancel-find-match", () => {
    before(async () => {
        await Match.create(firstUserEasyDifficulty)
    })
    it("should remove match document from collection.", (done) => {
        chai.request(app)
            .delete('/cancel-find-match')
            .send(firstUserUsernameOnly)
            .end((err, res) => {
                if (err) return done(err)
                res.should.have.status(200)
                done()
            })
    })
    after(async () => {
        await Interview.deleteMany({})
        await Match.deleteMany({})
    })
})

describe("GET /interview-id/:id", () => {
    let interviewId;
    before(async () => {
        const interview = await Interview.create(hardInterviewFifthAndSixthUser)
        interviewId = interview._id.toString() // ObjectId is treated as interviewId
    }) 

    it("should return the interview info, including id", (done) => {
        chai.request(app)
            .get(`/interview-id/${interviewId}`)
            .end((err, res) => {
                if (err) return done(err)
                res.should.have.status(200)
                done()
            })
    })

    after(async () => {
        await Interview.deleteMany({})
        await Match.deleteMany({})
    })
})

describe("DELETE /end-interview/:id", () => {
    let interviewId;
    before(async () => {
        const interview = await Interview.create(hardInterviewFifthAndSixthUser)
        interviewId = interview._id.toString() // ObjectId is treated as interviewId
    }) 

    it("should delete and return the interview info", (done) => {
        chai.request(app)
            .delete(`/end-interview/${interviewId}`)
            .end((err, res) => {
                if (err) return done(err)
                res.should.have.status(200)
                done()
            })
    })

    after(async () => {
        await Interview.deleteMany({})
        await Match.deleteMany({})
    })

})