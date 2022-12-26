const chatsSchema = require("../schema/chatsSchema");
const userSchema = require("../schema/signupSchema");
const { unstable_ClassNameGenerator } = require("@mui/material");

module.exports = {
  getChatData: (userId) => {
    return chatsSchema
      .findOne({ user: userId })
      .then((chats) => {
        return chats?.chat;
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  convertSender: (ID) => {
    console.log(`hey! this is my id `, ID);
    return userSchema.findById(ID).then((user) => {
      // console.log("this is user ", user.name);
      return user;
    });
  },
  // (msg, room, sender, admin, time, date, senderId)
  updateChat: async (singleMassage, userId, sender, admin, time, date) => {
    // console.log("hey this is sender:" +senderId + "and the admin is:" + admin + date + time)
    const message = {
      sender: sender,
      message: singleMassage,
      time: time,
      date: date,
    };

    chatsSchema
      .findOne({ user: userId })
      .then((users) => {
        if (users) {
          if (users.admin) {
            users.admin = admin;
          }
          users.chat.push(message);

          users.save().then(console.log("saved!"));
        } else if (userId) {
          const chat = new chatsSchema({
            user: userId,
            admin: admin,
            chat: message,
          });
          chat?.save().then();
        }

        console.log("this is sender By BackEnd: ", message);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  ML: (value, new_chat) => {
    let Obj = {};
    let len, chat_from_db, i, a, m;
    let array = [];
    // console.log(new_chat);

    // find all chats that have the same message.
    chatsSchema.find({ message: value }).then((chats) => {
      for (i = 0; i < chats.length; i++) {
        chat_from_db = chats[i]?.chat;
        len = new_chat.length - 1;
        let jib = [];

        //return the location of the message in the chat from the DB
        const recived_chat = new_chat[len];
        // console.log(chat_from_db, " and ", recived_chat);
        // console.log(chat_from_db.length);
        for (a = 0; a < chat_from_db.length; a++) {
          if (chat_from_db[a].message === recived_chat.message) {
            //jib needs to be an array, so he would know all the times that the message referenced in the chat
            jib.push(a);
            console.log("worked!");
          }
        }
        for (let j = 0; j < jib.length; j++) {
          let matchingLocation = jib[j];

          while (
            chat_from_db[matchingLocation]?.message ===
              new_chat[len]?.message &&
            matchingLocation !== len
          ) {
            array.push(new_chat[len]?.message);
            console.log("heyyyyyyy working");
            matchingLocation = matchingLocation - 1;
            len = len - 1;
          }
        }
        //get the prediction items from DB
        // insert into jib[here] the one with the most values.
        // array.push(chat_from_db[jib[jib.length - 1]]?.message);
        Obj.len = array;
      }
      // only when user send the message
      //returns the highest match.
      //
      // array.map((match) => {
      //   bigger = Math.max(bigger.length, match.length);
      // });
      console.log("thats the result", Obj);
    });
  },
};

//the meat! well the recursion start to look at the older messages and return all the messages that she matched.
// note, it is possible that await will cause problem

// function Recursion(chat_from_db, new_chat) {
//   if (chat_from_db[jib]?.message === new_chat[len]?.message) {
//     array.push(new_chat);
//     console.log("heyyyyyyy working");
//     jib = jib - 1;
//     len = len - 1;
//     return Recursion(chat_from_db, new_chat);
//   } else {
//     return (Obj.arr = array);
//   }
//
//   //will return the opp
// }
// Recursion(chat_from_db, new_chat);
