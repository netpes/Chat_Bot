const chatsSchema = require("../schema/chatsSchema");
// const bcrypt = require('bcrypt')
const dateantime = require("date-and-time");
const userSchema = require("../schema/signupSchema");

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

          users.save().then();
        } else if (userId) {
          const chat = new chatsSchema({
            user: userId,
            admin: admin,
            chat: message,
          });
          chat?.save().then();
        }
        console.log("this is sender By BackEnd: ", sender);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
