import { Server } from "socket.io"
import mongoose from "mongoose"

const Message = mongoose.model('Message', mongoose.Schema({
    room_id: String,
    user_id: Number,
    message: String
}))

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || 27018
const MONGO_DB   = process.env.MONGO_DB   || 'chat-app'

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`).then(() => {
    console.info("Mongodb successfully connected!")
})

const SERVER_PORT = process.env.SERVER_PORT || 5000

const io = new Server(SERVER_PORT)

io.on("connection", async (socket) => {
    const { room_id, user_id } = socket.handshake.query
 
    socket.join(room_id)

    await Message.find({ room_id: room_id }).then((messages) => {
        messages.forEach(message => {
            io.to(socket.id).emit("send_msg_to_client", message)
        })
    })

    socket.on("send_msg", async (msg) => {
        const message = new Message({
            room_id: room_id,
            user_id: user_id,
            message: msg
        })
        await message.save()
        
        io.to(room_id).emit("send_msg_to_client", message)
    })

    socket.on("negotiate", (data) => {
        io.to(room_id).emit("nego", data)
    })
})