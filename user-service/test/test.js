import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'
import User from '../model/user.js'
import Blacklist from '../model/blacklist.js'
import {
    user,
    userChangePassword,
    userDeleteAccount
} from './testData.js'

chai.use(chaiHttp)
chai.should()

describe('POST /api/user/signup', () => {
    describe("Checks if new user is created successfully", () => {
        it("should return creation success message", (done) => {
            chai.request(app)
                .post('/api/user/signup')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(201)
                    res.body.should.have.property('message')
                    res.body.message.should.equal(`Created new user ${user.username} successfully!`)
                    done()
                })
        })
        after(async () => {
            await User.deleteMany({})
            await Blacklist.deleteMany({})
        }) 
    })
})

describe('POST /api/user/login', () => {
    describe("Checks if user logged in successfully", () => {
        before((done) => {
            chai.request(app)
                .post('/api/user/signup')
                .send(user)
                .end((err) => {
                    if (err) return done(err)
                    done()
                })
        })
        it("should return login success message and JWT token", (done) => {
            chai.request(app)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(200)
                    res.body.should.have.property('message')
                    res.body.message.should.equal(`${user.username} logged in successfully!`)
                    res.body.should.have.property('token')
                    done()
                })
        })
        after(async () => {
            await User.deleteMany({})
            await Blacklist.deleteMany({})
        })  
    })
})

describe('GET /api/user/logout', () => {
    describe("Checks if user logged out successfully", () => {
        let token;
        before((done) => {
            chai.request(app)
                .post('/api/user/signup')
                .send(user)
                .end((err) => {
                    if (err) return done(err)
                    done()
                })
        })
        before((done) => {
            chai.request(app)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    token = res.body.token
                    done()
                })
        })
        it("should return logout success message", (done) => {
            chai.request(app)
                .get('/api/user/logout')
                .set("Authorization", "Bearer " + token)
                .send()
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(200)
                    res.body.should.have.property('message')
                    res.body.message.should.equal(`${user.username} logged out successfully!`)
                    done()
                })
        })
        after(async () => {
            await User.deleteMany({})
            await Blacklist.deleteMany({})
        })  
    })
})

describe('PUT /api/user/change_password', () => {
    describe("Checks if user changed password successfully", () => {
        let token;
        before((done) => {
            chai.request(app)
                .post('/api/user/signup')
                .send(user)
                .end((err) => {
                    if (err) return done(err)
                    done()
                })
        })
        before((done) => {
            chai.request(app)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    token = res.body.token
                    done()
                })
        })
        it("should return change password success message", (done) => {
            chai.request(app)
                .put('/api/user/change_password')
                .set("Authorization", "Bearer " + token)
                .send(userChangePassword)
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(200)
                    res.body.should.have.property('message')
                    res.body.message.should.equal("Changed password successfully!")
                    done()
                })
        })
        after(async () => {
            await User.deleteMany({})
            await Blacklist.deleteMany({})
        })  
    })
})

describe('POST /api/user/delete_account', () => {
    describe("Checks if user deleted account successfully", () => {
        let token;
        before((done) => {
            chai.request(app)
                .post('/api/user/signup')
                .send(user)
                .end((err) => {
                    if (err) return done(err)
                    done()
                })
        })
        before((done) => {
            chai.request(app)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    token = res.body.token
                    done()
                })
        })
        it("should return deletion success message", (done) => {
            chai.request(app)
                .post('/api/user/delete_account')
                .set("Authorization", "Bearer " + token)
                .send(userDeleteAccount)
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(200)
                    res.body.should.have.property('message')
                    res.body.message.should.equal("Deleted account successfully!")
                    done()
                })
        })
        after(async () => {
            await User.deleteMany({})
            await Blacklist.deleteMany({})
        })  
    })
})

describe('GET /api/user/', () => {
    describe("Checks if get username function is successful", () => {
        let token;
        before((done) => {
            chai.request(app)
                .post('/api/user/signup')
                .send(user)
                .end((err) => {
                    if (err) return done(err)
                    done()
                })
        })
        before((done) => {
            chai.request(app)
                .post('/api/user/login')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    token = res.body.token
                    done()
                })
        })
        it("should return get username success message", (done) => {
            chai.request(app)
                .get('/api/user/')
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    if (err) return done(err)
                    res.should.have.status(200)
                    res.body.should.have.property('username')
                    res.body.username.should.equal("CS2105")
                    done()
                })
        })
        after(async () => {
            await User.deleteMany({})
            await Blacklist.deleteMany({})
        })  
    })
})