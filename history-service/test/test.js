import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import app from "../index.js"
import { userHistory } from "./testData.js"
import History from "../models/history.js"

chai.use(chaiHttp)
chai.should()

let objectId;

describe("history-service tests", () => {
    describe("POST/create-history", () => {
        it("Create history successful", (done) => {
            chai.request(app)
                .post("/create-history")
                .send(userHistory)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("message")
                    assert.equal(res.body.message, `interview history saved for ${userHistory.username}`)
                    done()
                })
        })
    })

    describe("GET/get-history/:username", () => {
        it("Get history succeessful", (done) => {
            chai.request(app)
            .get(`/get-history/${userHistory.username}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("array")
                res.body[0].should.have.property("username")
                assert.equal(res.body[0].username, "test1")
                res.body[0].should.have.property("matchUsername")
                assert.equal(res.body[0].matchUsername, "test2")
                res.body[0].should.have.property("difficulty")
                assert.equal(res.body[0].difficulty, "easy")
                res.body[0].should.have.property("question")
                res.body[0].should.have.nested.property("question.difficulty")
                assert.equal(res.body[0].question.difficulty, "easy")
                res.body[0].should.have.nested.property("question.title")
                assert.equal(res.body[0].question.title, "test")
                res.body[0].should.have.nested.property("question.description")
                assert.equal(res.body[0].question.description, "test")
                res.body[0].should.have.nested.property("question.link")
                assert.equal(res.body[0].question.link, "test")
                objectId = res.body[0]._id
                done()
            })
        })
        after(async () => {
            await History.deleteOne({ _id: objectId })
        })
    })
})