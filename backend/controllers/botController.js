const bot_schema = require("../schema/botSchema");

module.exports = {
  //admin approve
  SearchForAnswer: (question) => {
    return bot_schema
      .findOne({ question: question })
      .then((questionValues) => {
        if (questionValues?.answer) {
          return questionValues.anwer;
        } else {
          console.log(false);
          return false;
        }
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  CreateAnswer: (question, answer, admin) => {
    return (
      bot_schema
        .findOne({ question: question })
        //if question exist...
        .then((questionValues) => {
          console.log(questionValues);
          if (questionValues) {
            //later insert here and answer into array of answers
          } else {
            const bot = new bot_schema({
              question: question,
              admin: admin,
              answer: answer,
            });
            bot?.save().then();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    );
  },
};
