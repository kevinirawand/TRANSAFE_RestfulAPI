import { io } from "socket.io-client";

const args = process.argv.slice(1)

const command = args[1]
const room_id = args[2]
const message = args[3]
const user_id = args[4]

// TODO: implement to flutter app

const socket = io("ws://103.167.136.28:5000", {
   query: `room_id=${room_id}&user_id=${user_id}`
})

socket.connect()

socket.on("send_msg_to_client", (msg) => {
   console.log({
      room_id: msg.room_id,
      user_id: msg.user_id,
      message: msg.message
   })
})

socket.on("nego", (data) => {
   console.log(data)
})

if (command == 'chat') {
   socket.emit("send_msg", message)
} else if (command == 'nego') {
   socket.emit("negotiate", {
      sender: "BUYYER",
      amount: parseInt(message)
   })
}
