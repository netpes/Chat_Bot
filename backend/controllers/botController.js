const bot_schema = require("../schema/botSchema");

module.exports = {
  //admin approve
  SearchForAnswer: (question) => {
    return bot_schema
      .findOne({ question: question })
      .then((questionValues) => {
        if (questionValues?.answer) {
          return questionValues.answer;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return console.log(error);
      });
  },
  CreateAnswer: (question, answer, admin) => {
    return bot_schema
      .findOne({ question: question })
      .then((questionValues) => {
        console.log(questionValues);
        if (questionValues?.question) {
          if (questionValues.admin) {
            questionValues.admin = admin?.toString();
          }
          questionValues?.answer.push(answer);

          questionValues.save().then();
        } else {
          const bot = new bot_schema({
            question: question,
            admin: admin,
            answer: answer,
          });
          bot.save().then();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
