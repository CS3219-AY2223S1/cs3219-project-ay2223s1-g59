import io from "socket.io-client"
import chai from 'chai'
import httpServer from '../index.js'
import { roomId, codeChange, localUrl } from './testData.js'

let socketUrl = localUrl

chai.should()

describe("Code change", () => {
    it("client2 should receive the change in code", done => {
        const finish = err => {
            done(err)
            client1.removeListener('receive', finish)
            client2.removeListener('receive', finish)
          }

        const client1 = io.connect(socketUrl)
        const client2 = io.connect(socketUrl)
        client1.emit("join", roomId)
        client2.emit("join", roomId)
        client1.emit("change", codeChange)
        client2.on("receive", (payload) => {
            if (payload.code) {
                payload.code.should.equal("print('Hello World')")
                done()
            }
        })
    })
})