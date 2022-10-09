import chai, { assert } from "chai"
import chaiHttp from "chai-http"
import app from "../index.js"
import { userHistory } from "./testData.js"

chai.use(chaiHttp)
chai.should()

let username

describe("history-service tests", () => {
    describe("POST/create-history", () => {
        it("Create history successful", (done) => {
            chai.request(app)
                .post("/create-history")
                .send(userHistory)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("username")
                    assert.equal(res.body.username, "test1")
                    username = res.body.username
                    res.body.should.have.property("matchUsername")
                    assert.equal(res.body.matchUsername, "test2")
                    res.body.should.have.property("difficulty")
                    assert.equal(res.body.difficulty, easy)
                    res.body.should.have.property("question")
                    res.body.should.have.deep.property("question.difficulty")
                    assert.equal(res.body.question.difficulty, easy)
                    res.body.should.have.deep.property("question.title")
                    assert.equal(res.body.question.title, "test")
                    res.body.should.have.deep.property("question.description")
                    assert.equal(res.body.question.description, "test")
                    res.body.should.have.deep.property("question.link")
                    assert.equal(res.body.question.link, "test")
                    done()
                })
        })
    })

    describe("GET/find-history/:username", () => {
        it("Get history succeessful", (done) => {
            chai.request(app)
            .get(`/find-history/${username}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("username")
                assert.equal(res.body.username, "test1")
                username = res.body.username
                res.body.should.have.property("matchUsername")
                assert.equal(res.body.matchUsername, "test2")
                res.body.should.have.property("difficulty")
                assert.equal(res.body.difficulty, easy)
                res.body.should.have.property("question")
                res.body.should.have.deep.property("question.difficulty")
                assert.equal(res.body.question.difficulty, easy)
                res.body.should.have.deep.property("question.title")
                assert.equal(res.body.question.title, "test")
                res.body.should.have.deep.property("question.description")
                assert.equal(res.body.question.description, "test")
                res.body.should.have.deep.property("question.link")
                assert.equal(res.body.question.link, "test")
                done()
            })
        })
    })
})