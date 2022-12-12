const userSchema = require("../schema/signupSchema");
async function getAllUsers() {
    const users  = await userSchema.find({}, `_id`)
        if(users) {

           return users.map((user)=> {
              return user._id.toString()
            })
        }
    }



module.exports = {getAllUsers}