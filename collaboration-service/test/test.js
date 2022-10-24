import io from "socket.io-client"
import chai from 'chai'
import server from '../index.js'
import { user1, user2, codeChange, localUrl } from './testData.js'
let socketUrl = localUrl;

chai.should();

// describe("One user joins the room", () => {
//     it("")
// })