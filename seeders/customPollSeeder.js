var Inde = require('../models/index.js');

var optionsArray1 = ["Pescado", "Lasagna", "Cangrejo", "Fideos", "Filete", "Lomo", "Pollo"];
var optionsArray2 = ["Rojo", "Azul", "Verde", "Amarillo", "Morado"];
var optionsArray3 = ["Rock", "Pop", "Jazz", "Electrónica", "Country"];

var optionsObjectFood = [];
var optionsObjectColor = [];
var optionsObjectMusic = [];
var users = [];

var dropTables = function() {
  Inde.OptionsContainerPossibleOptions.drop().then(function() {
    Inde.Answer.drop().then(function() {
      Inde.PossibleOption.drop().then(function() {
        Inde.OptionsContainer.drop().then(function() {
          Inde.Question.drop().then(function() {
            Inde.AnsweredPoll.drop().then(function() {
              Inde.User.drop().then(function() {
                Inde.Poll.drop().then(function() {
                  createTables();
                })
              })
            })
          })
        })
      })
    })
  })
}
dropTables();


var createTables = function() {
  Inde.Poll.sync().then(function() {
    Inde.User.sync().then(function() {
      Inde.AnsweredPoll.sync().then(function() {
        Inde.Question.sync().then(function() {
          Inde.OptionsContainer.sync().then(function() {
            Inde.PossibleOption.sync().then(function() {
              Inde.Answer.sync().then(function() {
                Inde.OptionsContainerPossibleOptions.sync().then(function() {
                  createUsers();
                })
              })
            })
          })
        })
      })
    })
  })
}


//Creamos usuarios
var createUsers = function() {
  Inde.User.create({
    email: "rperez@gmail.com",
    first_name: "Roberto",
    last_name: "Perez",
    birthdate: Date.now(),
    gender: 'm',
    password: "123123123"
  }).then(function(user){
    users.push(user);
    Inde.User.create({
      email: "jrojas@gmail.com",
      first_name: "Javier",
      last_name: "Rojas",
      birthdate: Date.now(),
      gender: 'm',
      password: "321321321"
    }).then(function(user){
      users.push(user);
      Inde.User.create({
        email: "jvenegas@gmail.com",
        first_name: "Julieta",
        last_name: "Venegas",
        birthdate: Date.now(),
        gender: 'f',
        password: "234234234"
      }).then(function(user){
        users.push(user);
        createOptions();
      })
    })
  })
}

//Creamos opciones
var createOptions = function() {
  Inde.OptionsContainer.create({
    name: "Comidas",
    allow_other: true
  }).then(function(oc){
    optionsArray1.map((data) => {
      Inde.PossibleOption.create({
        value: data
      }).then(function(possibleoption){
        oc.addPossibleOption(possibleoption);
        optionsObjectFood.push(possibleoption);
      });
    });
    Inde.OptionsContainer.create({
      name: "Colores",
      allow_other: false
    }).then(function(oc){
      optionsArray2.map((data) => {
        Inde.PossibleOption.create({
          value: data
        }).then(function(possibleoption){
          oc.addPossibleOption(possibleoption);
          optionsObjectFood.push(possibleoption);
        });
      });
      Inde.OptionsContainer.create({
        name: "Géneros Musicales",
        allow_other: true
      }).then(function(oc){
        optionsArray3.map((data) => {
          Inde.PossibleOption.create({
            value: data
          }).then(function(possibleoption){
            oc.addPossibleOption(possibleoption);
            optionsObjectFood.push(possibleoption);
          });
        });
        createQuestions();
      });
    });
  });
}

//Creamos las preguntas
var createQuestions = function() {
  Inde.Question.create({
    text: "¿Cúal es tu comida favorita?",
    type: "options"
  }).then(function (question) {
    Inde.OptionsContainer.findById(1).then(function(oc){
      question.setOptionsContainer(oc);
    })
    Inde.Question.create({
      text: "¿Cúal es tu color favorito?",
      type: "options"
    }).then(function (question) {
      Inde.OptionsContainer.findById(2).then(function(oc){
        question.setOptionsContainer(oc);
      })
      Inde.Question.create({
        text: "¿Cúal es tu género musical favorito?",
        type: "options"
      }).then(function (question) {
        Inde.OptionsContainer.findById(3).then(function(oc){
          question.setOptionsContainer(oc);
        })
        Inde.Question.create({
          text: "Si quieres nos puedes dejar un comentario",
          type: "text"
        }).then(function(question) {
          Inde.Question.create({
            text: "¿Qué nota le pondrías al local?",
            type: "number"
          }).then(function(question) {
            createPolls();
          })
        })
      })
    })
  })
}


//Creamos las encuestas
var createPolls = function() {
  Inde.Poll.create({
    name: "Encuesta de comida",
    description: "Queremos saber la comida favorita de la gente"
  }).then(function(poll){
    Inde.Question.findById(1).then(function(question) {
      poll.addQuestion(question);
    })
    Inde.Question.findById(4).then(function(question) {
      poll.addQuestion(question);
    })
    Inde.Poll.create({
      name: "Encuesta de colores",
      description: "Queremos saber los colores favoritos de la gente"
    }).then(function(poll){
      Inde.Question.findById(2).then(function(question) {
        poll.addQuestion(question);
      })
      Inde.Question.findById(5).then(function(question) {
        poll.addQuestion(question);
      })
      Inde.Poll.create({
        name: "Encuesta de música",
        description: "Queremos saber la música favorita de la gente"
      }).then(function(poll){
        Inde.Question.findById(3).then(function(question) {
          poll.addQuestion(question);
        })
        Inde.Question.findById(4).then(function(question) {
          poll.addQuestion(question);
        })
        Inde.Question.findById(5).then(function(question) {
          poll.addQuestion(question);
        })
        createAnsweredPolls();
      });
    });
  });
}

//Creamos encuestas contestadas
var createAnsweredPolls = function () {
  Inde.AnsweredPoll.create({}).then(function(anspoll) {
    Inde.User.findById(getRandomInt(1,3)).then(function(user) {
      user.addAnsweredPoll(anspoll);
    })
    Inde.Poll.findById(1).then(function(poll) {
      poll.addAnsweredPoll(anspoll);
    })
    Inde.Answer.create({
    }).then(function(answer){
      Inde.PossibleOption.findById(getRandomInt(1,7)).then(function(possopt) {
        answer.setPossibleOption(possopt);
      })
      Inde.Question.findById(1).then(function(question) {
        question.addAnswer(answer);
      })
      anspoll.addAnswer(answer);
    });
    Inde.Answer.create({
      string_value: 'Excelente que me pregunten por mi comida favorita'
    }).then(function(answer){
      Inde.Question.findById(4).then(function(question) {
        question.addAnswer(answer);
      })
      anspoll.addAnswer(answer);
    });
    Inde.AnsweredPoll.create({}).then(function(anspoll) {
      Inde.User.findById(getRandomInt(1,3)).then(function(user) {
        user.addAnsweredPoll(anspoll);
      })
      Inde.Poll.findById(1).then(function(poll) {
        poll.addAnsweredPoll(anspoll);
      })
      Inde.Answer.create({
      }).then(function(answer){
        Inde.PossibleOption.findById(getRandomInt(1,7)).then(function(possopt) {
          answer.setPossibleOption(possopt);
        })
        Inde.Question.findById(1).then(function(question) {
          question.addAnswer(answer);
        })
        anspoll.addAnswer(answer);
      });
      Inde.Answer.create({
        string_value: 'Qué comida favorita elegiré?'
      }).then(function(answer){
        Inde.Question.findById(4).then(function(question) {
          question.addAnswer(answer);
        })
        anspoll.addAnswer(answer);
      });
      Inde.AnsweredPoll.create({}).then(function(anspoll) {
        Inde.User.findById(getRandomInt(1,3)).then(function(user) {
          user.addAnsweredPoll(anspoll);
        })
        Inde.Poll.findById(2).then(function(poll) {
          poll.addAnsweredPoll(anspoll);
        })
        Inde.Answer.create({
        }).then(function(answer){
          Inde.PossibleOption.findById(getRandomInt(8,12)).then(function(possopt) {
            answer.setPossibleOption(possopt);
          })
          Inde.Question.findById(1).then(function(question) {
            question.addAnswer(answer);
          })
          anspoll.addAnswer(answer);
        });
        Inde.Answer.create({
          number_value: 4
        }).then(function(answer){
          Inde.Question.findById(4).then(function(question) {
            question.addAnswer(answer);
          })
          anspoll.addAnswer(answer);
        });
        Inde.AnsweredPoll.create({}).then(function(anspoll) {
          Inde.User.findById(getRandomInt(1,3)).then(function(user) {
            user.addAnsweredPoll(anspoll);
          })
          Inde.Poll.findById(2).then(function(poll) {
            poll.addAnsweredPoll(anspoll);
          })
          Inde.Answer.create({
          }).then(function(answer){
            Inde.PossibleOption.findById(getRandomInt(8,12)).then(function(possopt) {
              answer.setPossibleOption(possopt);
            })
            Inde.Question.findById(1).then(function(question) {
              question.addAnswer(answer);
            })
            anspoll.addAnswer(answer);
          });
          Inde.Answer.create({
            number_value: 5
          }).then(function(answer){
            Inde.Question.findById(4).then(function(question) {
              question.addAnswer(answer);
            })
            anspoll.addAnswer(answer);
          });
          Inde.AnsweredPoll.create({}).then(function(anspoll) {
            Inde.User.findById(getRandomInt(1,3)).then(function(user) {
              user.addAnsweredPoll(anspoll);
            })
            Inde.Poll.findById(3).then(function(poll) {
              poll.addAnsweredPoll(anspoll);
            })
            Inde.Answer.create({
            }).then(function(answer){
              Inde.PossibleOption.findById(getRandomInt(13,17)).then(function(possopt) {
                answer.setPossibleOption(possopt);
              })
              Inde.Question.findById(1).then(function(question) {
                question.addAnswer(answer);
              })
              anspoll.addAnswer(answer);
            });
            Inde.Answer.create({
              number_value: 5
            }).then(function(answer){
              Inde.Question.findById(4).then(function(question) {
                question.addAnswer(answer);
              })
              anspoll.addAnswer(answer);
            });
            Inde.Answer.create({
              string_value: 'Buenísima la música'
            }).then(function(answer){
              Inde.Question.findById(4).then(function(question) {
                question.addAnswer(answer);
              })
              anspoll.addAnswer(answer);
            });
            Inde.AnsweredPoll.create({}).then(function(anspoll) {
              Inde.User.findById(getRandomInt(1,3)).then(function(user) {
                user.addAnsweredPoll(anspoll);
              })
              Inde.Poll.findById(3).then(function(poll) {
                poll.addAnsweredPoll(anspoll);
              })
              Inde.Answer.create({
              }).then(function(answer){
                Inde.PossibleOption.findById(getRandomInt(13,17)).then(function(possopt) {
                  answer.setPossibleOption(possopt);
                })
                Inde.Question.findById(1).then(function(question) {
                  question.addAnswer(answer);
                })
                anspoll.addAnswer(answer);
              });
              Inde.Answer.create({
                number_value: 2
              }).then(function(answer){
                Inde.Question.findById(4).then(function(question) {
                  question.addAnswer(answer);
                })
                anspoll.addAnswer(answer);
              });
              Inde.Answer.create({
                string_value: 'Odié la decoración del lugar'
              }).then(function(answer){
                Inde.Question.findById(4).then(function(question) {
                  question.addAnswer(answer);
                })
                anspoll.addAnswer(answer);
              });
            })
          })
        })
      })
    })
  })
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
