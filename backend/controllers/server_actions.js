const userSchema = require("../schema/signupSchema");
async function getAllUsersId() {
  const users = await userSchema.find({}, `name`);
  if (users) {
    return users.map((user) => user.name.toString());
  }
}

async function getAllUsersName() {
  const users = await userSchema.find({}, `_id`);
  if (users) {
    return users.map((user) => user.name.toString());
  }
}

module.exports = { getAllUsersId, getAllUsersName };
