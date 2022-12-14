const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 2000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./views/user");
const multer = require("multer");
const forms = multer();
const {
  getAllUsersId,
  getAllUsersName,
} = require("./controllers/server_actions");
const { updateChat, getChatData } = require("./controllers/chatController");
const dateantime = require("date-and-time");

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(forms.array());
app.use(cors({ origin: " http://localhost:3000" }));
app.use("/", users);

// mongo connection
const url =
  "mongodb+srv://netpes:netpes@cluster0.cnxmrap.mongodb.net/?retryWrites=true&w=majority";
mongoose?.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose?.connection.on("connected", () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.sendFile("../src/components/userChat.js");
  console.log("this is true");
});

//SOCKET-IO:

//socket reacting to connection/disconnection
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

let messageCheck = "";
io.on("connection", (socket) => {
  const date = dateantime.format(new Date(), "DD/MM/YYYY");
  const time = dateantime.format(new Date(), "HH:mm");
  let sender = "";
  let rooma = "";

  socket.on("chat message", (msg, room, senderId, userId, admin) => {
    // rooma = userId;
    console.log("this is room" + room);
    socket.emit("who-is-connected", room);
    if (msg === messageCheck) {
      console.log("stopped");
    } else {
      updateChat(msg, room, senderId, admin, time, date);
      sender = senderId;

      if (!room) {
        socket.broadcast.emit("chat message", msg, room);
        console.log("sure...but why boardcast?");
        socket.emit("send-chats", msg);
      } else {
        const message = [
          { sender: senderId, message: msg, time: time, date: date },
        ];
        if (room) {
          getChatData(room).then((chats) => {
            if (chats) {
              Array.prototype.push.apply(chats, message);
              // console.log(chats)
              io.sockets.emit("send-chats", chats);
              console.log(true);
            } else {
              io.sockets.emit("send-chats", message);
              console.log(false);
            }
          });
        }
        console.log("room number " + room + " send msg");
        io.sockets.to(room).emit("chat message", msg, room);
      }
      messageCheck = msg;
    }
  });

  //join a room
  socket.on("join-room", (room) => {
    if (room) {
      socket.join(room);
      getChatData(room).then((chats) => {
        if (chats) {
          socket.emit("send-chats", chats);
        } else {
          socket.emit("send-chats", "");
        }
      });
      // insert here get chats
      socket.emit("message room", room);
      console.log(`room ${room}`);
    }
  });

  //get all the usersId
  getAllUsersId()
    .then((list) => {
      socket.emit("chat-list", list);
    })
    .catch((err) => {
      console.log(err + "in chats");
    });
  // getAllUsersName().then((name) => {
  //     socket.emit("name-list",name)
  // }).catch((err)=> {
  //     console.log(err + "in names")
  // })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
