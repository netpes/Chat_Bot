const chatsSchema = require('../schema/chatsSchema')
// const bcrypt = require('bcrypt')


module.exports = {
    getAllChats: (req,res) => {
        chatsSchema.find().then((users) => {
            res.status(200).json({
                users
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
    updateChat: (req,res) => {
        const {user, data} = req.body;
        chatsSchema.updateOne(user, data, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
    }
}