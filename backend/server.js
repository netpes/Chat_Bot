const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 2000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const users = require('./views/user')
const multer = require('multer');
const forms = multer();
const {getAllUsersId, getAllUsersName} = require('./controllers/server_actions')
const {updateChat, getChatData} = require("./controllers/chatController");
const dateantime = require("date-and-time");


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);



// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(forms.array());
app.use(cors({origin:' http://localhost:3000'}))
app.use('/', users)


// mongo connection
const url = 'mongodb+srv://netpes:netpes@cluster0.cnxmrap.mongodb.net/?retryWrites=true&w=majority';
mongoose?.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
mongoose?.connection.on('connected', () => {
    console.log("connected")
})


app.get('/', (req, res) => {
    res.sendFile('../src/components/userChat.js');
    console.log('this is true')
});

//SOCKET-IO:

//socket reacting to connection/disconnection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//getting the message from the form and print it
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//
//         console.log('message: ' + msg );
//     });
// });

let messageCheck = "";
io.on('connection', (socket) => {
    const date =dateantime.format(new Date(), 'DD/MM/YYYY');
    const time = dateantime.format(new Date(), 'HH:mm');
    let sender= "";
    let rooma = ""
  socket.on('chat message', (msg, room, datatoSave, userId,senderId,admin) => {
      getChatData(room).then((chats)=> {
        if (chats) {
            socket.emit('send-chats', chats)
        } else {
            socket.emit('send-chats', '')
            }
          });
      if(userId && datatoSave && senderId && msg) {
          updateChat(datatoSave, userId,senderId,msg,admin,time,date)
          sender = senderId;
      }
        rooma = userId;

      if(msg === messageCheck){
          console.log("stopped")
      } else {
          if (!rooma) {
              socket.broadcast.emit('chat message', msg,rooma);
              console.log("but why boardcast")
          } else {
              console.log("room number "+ rooma)
              socket.to(rooma).emit('chat message', msg,rooma)
          }
          messageCheck = msg;
      }
  });

    //join a room
    socket.on("join-room",(room) => {
        if (room) {
            socket.join(room)
            getChatData(room).then((chats)=> {
                if (chats) {
                    socket.emit('send-chats', chats)
                } else {
                    socket.emit('send-chats', "")
                }
            });
            // insert here get chats
            socket.emit('message room', room);
            console.log(`room ${room}`)

        }
    })


    //get all the usersId
        getAllUsersId().then((list) => {
            socket.emit("chat-list",list)
        }).catch((err)=> {
            console.log(err + "in chats")
        })
        // getAllUsersName().then((name) => {
        //     socket.emit("name-list",name)
        // }).catch((err)=> {
        //     console.log(err + "in names")
        // })

});





http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});