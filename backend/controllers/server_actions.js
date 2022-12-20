const userSchema = require("../schema/signupSchema");
async function getAllUsersData() {
  const users = await userSchema.find({ active: true });
  if (users) {
    const Fusers = users.map((user) => {
      return { name: user.name, id: user._id };
    });

    return Fusers;
  }
}
async function getInactiveChats() {
  const users = await userSchema.find({ active: false });
  if (users) {
    const Fusers = users.map((user) => {
      return { name: user.name, id: user._id };
    });

    return Fusers;
  }
}
async function setActive(id) {
  const user = await userSchema.findById(id);
  if (user.active === true) {
    console.log("changed to false");
    user.active = false;
  } else {
    console.log("changed to true");
    user.active = true;
  }
  user.save();
}

module.exports = { getAllUsersData, setActive, getInactiveChats };
