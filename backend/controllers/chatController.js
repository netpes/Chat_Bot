const chatsSchema = require('../schema/chatsSchema')
// const bcrypt = require('bcrypt')


module.exports = {
    getAllChats: (req,res) => {
        chatsSchema.find().then((users) => {
            res.status(200).json({
               data :req.body.data
            })
        }).catch(
            (error) => {
                res.status(500).json({
                    message: error
                })
            }
        )

    },
    createChat: (req,res) => {
        const {user, admin,data} = req.body;
        // const salt = bcrypt.genSalt(10);
        // const hashed = bcrypt.hash(password, salt)
        const chat = new chatsSchema({
            user,
            admin,
            data,
        })
        chat.save().then(
            () => {
                res.status(200).json({
                    message:"Post saved successfully!",
                    data:req.body
                })

            }
        ).catch(
            (error) => {
                res.status(500).json({
                    message: error
                })
            }
        )
    },
    updateChat: (datatoSave,userId) => {
        chatsSchema.findOne({user: userId}).then((users) => {
            if (users) {
                console.log(users)
                users.chat = datatoSave
                console.log(datatoSave)
                 users.save().then()
            } else {
                const chat = new chatsSchema({
                    user: userId,
                    chat: datatoSave
                })
                chat.save().then();
            }
        }).catch((err)=> {
            console.log(err)
        })
    }
}