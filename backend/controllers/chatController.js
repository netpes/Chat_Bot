const chatsSchema = require("../schema/chatsSchema");
// const bcrypt = require('bcrypt')
const dateantime = require("date-and-time");

module.exports = {
  getChatData: (userId) => {
    return chatsSchema
      .findOne({ user: userId })
      .then((chats) => {
        return chats.chat;
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  // createChat: (req,res) => {
  //     const {user, admin,data} = req.body;
  //     // const salt = bcrypt.genSalt(10);
  //     // const hashed = bcrypt.hash(password, salt)
  //     const chat = new chatsSchema({
  //         user,
  //         admin,
  //         data,
  //     })
  //     chat.save().then(
  //         () => {
  //             res.status(200).json({
  //                 message:"Post saved successfully!",
  //                 data:req.body
  //             })
  //
  //         }
  //     ).catch(
  //         (error) => {
  //             res.status(500).json({
  //                 message: error
  //             })
  //         }
  //     )
  // },
  updateChat: (singleMassage, userId, senderId, admin, time, date) => {
    // console.log("hey this is sender:" +senderId + "and the admin is:" + admin + date + time)
    const message = {
      sender: senderId,
      message: singleMassage,
      time: time,
      date: date,
    };

    chatsSchema
      .findOne({ user: userId })
      .then((users) => {
        if (users) {
          console.log("late AF");
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
          chat.save().then();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
