import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'
import Match from '../models/match.js'
import Interview from '../models/interview.js'
import {
    firstUserEasyDifficulty,
    secondUserHardDifficulty,
    thirdUserEasyDifficulty,
    easyInterviewFirstAndThirdUser
} from './testData.js'

chai.use(chaiHttp)
chai.should()

describe('POST /find-match', () => {
    describe("Checks interview database and finds existing interview.", () => {
        before(async () => {
            await Interview.create(easyInterviewFirstAndThirdUser)
        });

        it("should delete match entry since interview found.", (done) => {
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
            await Interview.deleteOne(easyInterviewFirstAndThirdUser)
        })
    })
        
})
