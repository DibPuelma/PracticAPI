var Answer = require('../models/answer.js');
var OptionsContainer = require('../models/optionscontainer.js');
var Poll = require('../models/poll.js');
var PosibleOption = require('../models/posibleoption.js');
var Question = require('../models/question.js');
var User = require('../models/user.js');
var Inde = require('../models/index.js');

var optionsArray1 = ["Pescado", "Lasagna", "Cangrejo", "Fideos", "Filete", "Lomo", "Pollo"];
var optionsArray2 = ["Rojo", "Azul", "Verde", "Amarillo", "Morado"];
var optionsArray3 = ["Rock", "Pop", "Jazz", "Electrónica", "Country"];

var optionsObjectFood = [];
var optionsObjectColor = [];
var optionsObjectMusic = [];
var users = [];

//Creamos usuarios
for (var i = 0; i < 4; i++) {
  var user = Inde.User.build({
    email: i + "@gmail.com",
    firstName: "Roberto " + i,
    lastName: "Perez " + i,
    birthdate: Date.now(),
    gender: 'm',
    password: "123123123" + i
  })
  users.push(user);
  console.log("pusheado");
}

var OC1, OC2, OC3, Q1, Q2, Q3, Q4, Q5;

//Creamos contenedores de opciones
var OC1 = Inde.OptionsContainer.build({
  name: "Comidas",
  allow_other: true
})

var OC2 = Inde.OptionsContainer.build({
  name: "Colores",
  allow_other: false
})

var OC3 = Inde.OptionsContainer.build({
  name: "Géneros Musicales",
  allow_other: true
})

//Creamos las preguntas
var Q1 = Inde.Question.build({
  text: "¿Cúal es tu comida favorita?",
  type: "options"
})
Q1.setOptionsContainer(OC1);

var Q2 = Inde.Question.build({
  text: "¿Cúal es tu color favorito?",
  type: "options"
})
Q2.setOptionsContainer(OC2);


var Q3 = Inde.Question.build({
  text: "¿Cúal es tu género musical favorito?",
  type: "options"
})
Q3.setOptionsContainer(OC3);

var Q4 = Inde.Question.build({
  text: "Si quieres nos puedes dejar un comentario",
  type: "text"
})

var Q5 = Inde.Question.build({
  text: "¿Qué nota le pondrías al local?",
  type: "number"
})


//Creamos opciones
for (var option in optionsArray1) {
  var posibleoption = Inde.PosibleOption.build({
    value: option
  });
  OC1.addPosibleOption(posibleoption);
  optionsObjectFood.push(posibleoption);
}

for (var option in optionsArray2) {
  var posibleoption = Inde.PosibleOption.build({
    value: option
  });
  OC2.addPosibleOption(posibleoption);
  optionsObjectColor.push(posibleoption);
}

for (var option in optionsArray3) {
  var posibleoption = Inde.PosibleOption.build({
    value: option
  });
  OC3.addPosibleOption(posibleoption);
  optionsObjectMusic.push(posibleoption);
}

//Creamos las encuestas
Inde.Poll.create({
  name: "Encuesta de comida",
  description: "Queremos saber la comida favorita de la gente"
}).then(function(poll){
  poll.addQuestion(Q1);
  poll.addQuestion(Q4);
});

Inde.Poll.create({
  name: "Encuesta de colores",
  description: "Queremos saber los colores favoritos de la gente"
}).then(function(poll){
  poll.addQuestion(Q2);
  poll.addQuestion(Q5);
});

Inde.Poll.create({
  name: "Encuesta de música",
  description: "Queremos saber la música favorita de la gente"
}).then(function(poll){
  poll.addQuestion(Q3);
  poll.addQuestion(Q4);
  poll.addQuestion(Q5);
});


//Creamos respuestas
//Númericas
for (var i = 0; i < 10; i++) {
  var value = i%5;
  Inde.Answer.create({
    number_value: value
  }).then(function(answer){
    Q5.addAnswer(answer);
  });
}
//Texto
for (var i = 0; i < 5; i++) {
  var value = "Pienso que " + i;
  Inde.Answer.create({
    string_value: value
  }).then(function(answer){
    Q4.addAnswer(answer);
  });
}
//Selección Comidas
for (var i = 0; i < 5; i++) {
  Inde.Answer.create({
  }).then(function(answer){
    users[getRandomInt(0, users.length - 1)].addAnswer(answer);
    answer.setPosibleOption(optionsObjectFood[getRandomInt(0, optionsObjectFood.length - 1)])
    Q1.addAnswer(answer);
  });
}
//Selección Colores
for (var i = 0; i < 5; i++) {
  Inde.Answer.create({
  }).then(function(answer){
    users[getRandomInt(0, users.length - 1)].addAnswer(answer);
    answer.setPosibleOption(optionsObjectColor[getRandomInt(0, optionsObjectColor.length - 1)])
    Q2.addAnswer(answer);
  });
}
//Selección Música
for (var i = 0; i < 5; i++) {
  Inde.Answer.create({
  }).then(function(answer){
    users[getRandomInt(0, users.length - 1)].addAnswer(answer);
    answer.setPosibleOption(optionsObjectMusic[getRandomInt(0, optionsObjectMusic.length - 1)])
    Q3.addAnswer(answer);
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
