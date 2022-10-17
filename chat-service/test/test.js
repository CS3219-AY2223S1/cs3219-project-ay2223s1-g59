import io from "socket.io-client"
import chai from 'chai'
import server from '../index.js'
import { user1, user2, userMessage } from './testData.js'
let socketUrl = 'http://localhost:8005' // Will abstract to constants file during refactoring

chai.should()

describe('One user joins room', () => {  
    it('should return user joined room', done => {    
        const client = io(socketUrl)

        client.emit('join', user1)
        client.on('receive', (res) => {
            res.message.should.equal('CS2101 has joined the chat room')
            res.username.should.equal('ChatBot')
            client.removeListener('receive')
            done()
        })
    })
})

describe('Two users join room', () => {  
    it('should return second user joined room', done => {
        const client1 = io(socketUrl)
        const client2 = io(socketUrl)

        client1.emit('join', user1)
        client2.emit('join', user2)
        client1.on('receive', (res) => {
            if (res.message === "CS2102 has joined the chat room") {
                res.message.should.equal('CS2102 has joined the chat room')
                res.username.should.equal('ChatBot')
                client1.removeListener('receive')
                done()
            }
        })
    })
})

describe('Send message', () => {  
    it('should return message', done => {
        const client1 = io(socketUrl)
        const client2 = io(socketUrl)

        client1.emit('join', user1)
        client2.emit('join', user2)
        client2.emit('send', userMessage)
        client1.on('receive', (res) => {
            if (res.room) {
                res.message.should.equal("hello world")
                res.username.should.equal('CS2102')
                client1.removeListener('receive')
                done()
            }
        })
    })
})