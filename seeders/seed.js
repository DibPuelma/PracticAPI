var Models = require('../models/index.js');

var restaurantMenu = ["California Kani", "California Teri", "California Ebi", "California Sake", "Sake Cream",
"California Ika", "Teri Cream", "Koni", "Lu", "Kai", "Ebi Panko", "Tama", "Oko", "Pime",
"Kei", "Zeta", "Ebi Tempura", "Rayo", "Crab", "Cream", "Niku", "Ika", "Isi", "Sake", "Tori",
"Kaki", "Mori", "Sakana", "Kani", "Zumi", "Tochi", "Chizu", "Furaido", "Chai", "Kyro", "Taki",
"Moky", "Taku", "Ryu", "Tiradito", "Huancaina", "Nikkei", "Acevichado", "Pita", "Chibolo",
"Dragón", "Bei", "Dai", "Toku", "Niji", "Asu", "Nor", "Tamago", "Nanay", "Chili", "Banana",
"Furay", "Chikin", "Kino", "Pilpil", "Emi", "Unagui", "Tosu", "Ebi Cream", "Chin", "Aka", "Negi",
"Koma", "Suna", "Sei", "Bichi", "Hama", "Jiro", "Kabu", "Maguru", "Dario", "Avo Maki", "Kani Maki",
"Teri Maki", "Ebi Maki", "Sake Maki", "Kuni", "Kan", "Ebi", "Sumo", "Koro", "Almond",
"Crudo para uno", "Tartar de salmon", "Carpaccio de carne", "Carpaccio de salmon", "Gohan Tori",
"Gohan Ebisake", "Gohan Nikkei", "Gohan Tako", "Gohan Tuna", "Gohan Super Hama", "Gohan Vegetariano",
"Gohan Acevichado", "Gohan Mango"];
var favoriteTypeOfDish = ["Envuelto en tempura", "Envuelto en palta", "Envuelto en salmón", "Panko", "Gohan",
"Envuelto en sésamo", "Envuelto en ciboulette", "Envuelto en nori", "Envuelto en queso crema"];

var salesmanAction = ["Conversando", "Ocupados con otros clientes", "Viendo el celular", "No estaban", "Comiendo"];
var favoriteSport =["Basketbol", "Tenis", "Golf", "Rugby", "Hockey", "Voleibol", "Gimnasio", "Fútbol", "Polo", "Ski",
"Snowboard", "Surf", "Pingpong"];

var names = ["Javier", "Rodrigo", "Claudio", "Benjamín", "Franco", "Esteban", "Felipe",
"Aurora", "María Jose", "Josefina", "Javiera", "Alicia", "Fernanda", "Rosa"];
var lastNames = ["Ochoa", "Rojas", "Reyes", "Perez", "Gonzalez", "Urrutia", "Undurraga", "Ruiz", "Kramer",
"Contardo", "Abusleme", "García-Huidobro", "Lopez", "Del Campo", "Vega"];

var employeesCompany1Pictures = ["http://www.illumni.co/wp-content/uploads/2014/06/No.-1.jpg",
"http://www.ericparryarchitects.co.uk/profile/people/images/julian-ogiwara.jpg",
"http://www.outdoordesign.com.au/uploads/articles/PeopleProfile-JamieD.jpg",
"http://42devlabs.com/kemri-wellcome-trust/wp-content/uploads/2016/03/Mike-English-Black-and-White-1.jpg",
"http://segal.northwestern.edu/images/people/profile-photos/anne-marie-piper-profile-main.jpg"]
var employeesCompany2Pictures = ["http://www.uh.edu/nsm/physics/people/profiles/zhifeng-ren/profile-photo.jpg",
"http://piratespages.ncmissouri.edu/000145435/pictures%20for%20website/woman%201.jpg",
"https://www.erdw.ethz.ch/content/specialinterest/erdw/d-erdw/en/personen/profil.person_image.jpeg?persid=225247",
"http://www.illumni.co/wp-content/uploads/2010/03/Alkestie.jpg",
"https://segal.northwestern.edu/images/people/profile-photos/achal-bassmboo-main.jpg"]

var companiesData = [
  {
    name: 'Puma',
    email: 'contacto@puma.puma',
    logo: 'https://images.seeklogo.net/2013/04/puma-eps-vector-logo-400x400.png'
  }, {
    name: 'Sushi Home',
    email: 'contacto@sushi.home',
    logo: 'https://pbs.twimg.com/profile_images/1272217407/logo_sushihome.jpg'
  }
];

var sellPointsData = [
  {
    company: 'Puma',
    info: {
      location : 'Alto las Condes',
      code: 'code-puma-alc'
    }
  },
  {
    company: 'Puma',
    info: {
      location : 'Plaza Vespucio',
      code: 'code-puma-pv'
    }
  },
  {
    company: 'Puma',
    info: {
      location : 'Marina Arauco',
      code: 'code-puma-ma'
    }
  },
  {
    company: 'Sushi Home',
    info: {
      location : 'Reñaca',
      code: 'code-sushi-home-r'
    }
  },
  {
    company: 'Sushi Home',
    info: {
      location : 'Viña del Mar',
      code: 'code-sushi-home-v'
    }
  },
  {
    company: 'Sushi Home',
    info: {
      location : 'Santiago',
      code: 'code-sushi-home-s'
    }
  }
];

// 2 opc, 2 text, 3 bool, 5 num x company
var questionsData = [
  {
    company: "Puma",
    attended: "both",
    info: {
      text: "¿Qué tan ordenada estaba la tienda?",
      type: "number"
    }
  },
  {
    company: "Puma",
    attended: "both",
    info: {
      text: "¿Qué tan bonita encontraste nuestra vitrina?",
      type: "number"
    }
  },
  {
    company: "Puma",
    attended: "both",
    info: {
      text: "¿Qué tanto deporte haces a la semana?",
      type: "number"
    }
  },
  {
    company: "Puma",
    attended: "true",
    info: {
      text: "¿Qué tanto conocimiento tenía nuestro vendedor sobre los productos?",
      type: "number"
    }
  },
  {
    company: "Puma",
    attended: "true",
    info: {
      text: "¿Qué tan rápido te atendieron?",
      type: "number"
    }
  },
  {
    company: "Puma",
    attended: "true",
    info: {
      text: "¿Te contaron de nuestra promoción de zapatillas?",
      type: "boolean"
    }
  },
  {
    company: "Puma",
    attended: "false",
    info: {
      text: "¿Fuiste ignorado por nuestros vendedores?",
      type: "boolean"
    }
  },
  {
    company: "Puma",
    attended: "both",
    info: {
      text: "Cuéntanos que es lo que menos te gusta de la tienda",
      type: "text"
    }
  },
  {
    company: "Puma",
    attended: "both",
    info: {
      text: "¿Qué tan ordenada estaba la tienda?",
      type: "number"
    }
  },
  {
    company: "Puma",
    attended: "both",
    info: {
      text: "Cuéntanos que es lo que más te gusta de la tienda",
      type: "text"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Qué tanto te gusta el sushi?",
      type: "number"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Con cuantas estrellas calificarías nuestra comida?",
      type: "number"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Qué tan rápido te atendieron?",
      type: "number"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Qué tan rápido llegó la comida?",
      type: "number"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Cuanto conocimiento de los platos tenía la persona que los atendió?",
      type: "number"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Qué tan a gusto te sentiste en el restaurant?",
      type: "number"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Es primera vez que vienes?",
      type: "boolean"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Quedaste satisfecho?",
      type: "boolean"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "Déjanos un comentario para poder mejorar",
      type: "text"
    }
  },
  {
    company: "Sushi Home",
    attended: "true",
    info: {
      text: "¿Qué le dirías al chef?",
      type: "text"
    }
  },
]

var contestData = [
  {
    company: "Puma",
    info: {
      name: "2x1 en zapatillas",
      draw_date: new Date("March 31, 2017 00:00:00")
    }
  },
  {
    company: "Puma",
    info: {
      name: "Dinero en productos",
      draw_date: new Date("April 30, 2017 00:00:00")
    }
  },
  {
    company: "Sushi Home",
    info: {
      name: "Cena para 2 personas",
      draw_date: new Date("March 31, 2017 00:00:00")
    }
  },
  {
    company: "Sushi Home",
    info: {
      name: "Tragos gratis",
      draw_date: new Date("May 31, 2017 00:00:00")
    }
  },
]

var prizesData = [
  {
    contest: "2x1 en zapatillas",
    info: {
      name: "Zapatillas de running",
      description: "El cliente podrá comprar 2 zapatillas de la categoría running por el precio de 1",
      code: "73F5R2"
    }
  },
  {
    contest: "Dinero en productos",
    info: {
      name: "$25.000",
      description: "El cliente puede canjear este premio por $25.000 pesos en productos. No acumulable con otras promociones",
      code: "53RF6H"
    }
  },
  {
    contest: "Dinero en productos",
    info: {
      name: "$40.000",
      description: "El cliente puede canjear este premio por $40.000 pesos en productos. No acumulable con otras promociones",
      code: "11FW4L"
    }
  },
  {
    contest: "Cena para 2 personas",
    info: {
      name: "Cena para 2",
      description: "El cliente puede canjear este premio por una cena para 2 personas. Incluye 1 entrada, 3 rolls y 2 tragos",
      code: "39KV3N"
    }
  },
  {
    contest: "Tragos gratis",
    info: {
      name: "2 mojitos",
      description: "El cliente puede canjear este premio por 2 mojitos",
      code: "03KD5B"
    }
  },
  {
    contest: "Tragos gratis",
    info: {
      name: "2 tragos",
      description: "El cliente puede canjear este premio por 2 tragos cualquiera de la carta",
      code: "88YE2K"
    }
  },
]

var dropTables = function() {
  Models.sequelize.sync({ force: true }).then(function() {
    createTables();
  });
}

dropTables();

var createTables = function() {
  Models.Company.sync().then(function() {
    Models.Contest.sync().then(function() {
      Models.Prize.sync().then(function() {
        Models.Poll.sync().then(function() {
          Models.SellPoint.sync().then(function() {
            Models.Employee.sync().then(function() {
              Models.User.sync().then(function() {
                Models.AnsweredPoll.sync().then(function() {
                  Models.OptionsContainer.sync().then(function() {
                    Models.Question.sync().then(function() {
                      Models.PossibleOption.sync().then(function() {
                        Models.Answer.sync().then(function() {
                          Models.UserContest.sync().then(function() {
                            Models.OptionsContainerPossibleOptions.sync().then(function() {
                              Models.PollQuestion.sync().then(function() {
                                createUsers();
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

var createUsers = function() {
  var userPromises = [];
  for (var i = 0; i < 30; i++) {
    var yearOfBirth = getRandomInt(1936, 2006);
    var monthOfBirth = getRandomInt(0, 11);
    var dayOfBirth = getRandomInt(0, 30);
    var name = names[getRandomInt(0, names.length - 1)];
    var lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
    var userData = {
      email: name + lastName + "@example.com",
      name: name,
      last_name: lastName,
      birthdate: new Date(yearOfBirth, monthOfBirth, dayOfBirth),
      gender: getRandomInt(0,1) === 0 ? 'm' : 'f',
      password: 123
    }
    var createUserPromise = Models.User.create(userData)
    userPromises.push(createUserPromise);
  }
  Promise.all(userPromises)
  .then(() => {
    createCompanies();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createCompanies = function() {
  var companiesPromises = [];
  companiesData.map((data) => {
    var createCompanyPromise = Models.Company.create(data);
    companiesPromises.push(createCompanyPromise);
  })
  Promise.all(companiesPromises)
  .then(() => {
    createSellPoints();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createSellPoints = function() {
  var sellPointsPromises = [];
  sellPointsData.map((data) => {
    Models.Company.find({where: {name: data.company}})
    .then((company) => {
      var createSellPointPromise = Models.SellPoint.create({
        company_id: company.id,
        location:data.info.location,
        code:data.info.code
      });
      sellPointsPromises.push(createSellPointPromise);
    })
  })
  Promise.all(sellPointsPromises)
  .then(() => {
    createEmployees();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createEmployees = function() {
  var employeesPromises = []
  for (var i = 1; i <= 6; i++) {
    Models.SellPoint.findById(i)
    .then((sellPoint) => {
      var employeesAmount = getRandomInt(1, 5);
      for (var i = 0; i < employeesAmount; i++) {
        var name = names[getRandomInt(0, names.length - 1)];
        var lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
        var picture = "";
        if(sellPoint.company_id === 1) picture = employeesCompany1Pictures[getRandomInt(0, employeesCompany1Pictures.length - 1)];
        else picture = employeesCompany2Pictures[getRandomInt(0, employeesCompany2Pictures.length - 1)]
        var createEmployeePromise = Models.Employee.create({
          name: name,
          last_name: lastName,
          picture: picture,
          company_id: sellPoint.company_id
        })
        .then((employee) => {
          sellPoint.addEmployee(employee);
        })
        employeesPromises.push(createEmployeePromise);
      }
    })
  }
  Promise.all(employeesPromises)
  .then(() => {
    createOptionsContainers();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createOptionsContainers = function() {
  optionsContainersPromises = [];
  var createOptionsContainerPromise
  var findCompanyPromise;
  findCompanyPromise = Models.Company.find({where: {name: "Sushi Home"}})
  .then((company) => {
    createOptionsContainerPromise = Models.OptionsContainer.create({
      name: "Menú restaurant",
      allow_other: false,
      company_id: company.id
    })
    optionsContainersPromises.push(createOptionsContainerPromise);

    createOptionsContainerPromise = Models.OptionsContainer.create({
      name: "Plato favorito",
      allow_other: true,
      company_id: company.id
    })
    optionsContainersPromises.push(createOptionsContainerPromise);
  })
  optionsContainersPromises.push(findCompanyPromise);
  findCompanyPromise = Models.Company.find({where: {name: "Puma"}})
  .then((company) => {
    createOptionsContainerPromise = Models.OptionsContainer.create({
      name: "Acción vendedores",
      allow_other: true,
      company_id: company.id
    })
    optionsContainersPromises.push(createOptionsContainerPromise);

    createOptionsContainerPromise = Models.OptionsContainer.create({
      name: "Deporte favorito",
      allow_other: true,
      company_id: company.id
    })
    optionsContainersPromises.push(createOptionsContainerPromise);
  })
  optionsContainersPromises.push(findCompanyPromise);
  Promise.all(optionsContainersPromises)
  .then(() => {
    createPossibleOptions();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createPossibleOptions = function() {
  var possibleOptionsPromises = [];
  Models.OptionsContainer.find({where: {name: "Menú restaurant"}})
  .then((optcont) => {
    restaurantMenu.map((data) => {
      var createPossibleOptionPromise = Models.PossibleOption.create({
        value: data,
        company_id:optcont.company_id
      })
      .then((possopt) => {
        optcont.addPossibleOption(possopt);
      })
      possibleOptionsPromises.push(createPossibleOptionPromise);
    })
  })
  Models.OptionsContainer.find({where: {name: "Plato favorito"}})
  .then((optcont) => {
    favoriteTypeOfDish.map((data) => {
      var createPossibleOptionPromise = Models.PossibleOption.create({
        value: data,
        company_id:optcont.company_id
      })
      .then((possopt) => {
        optcont.addPossibleOption(possopt);
      })
      possibleOptionsPromises.push(createPossibleOptionPromise);
    })
  })
  Models.OptionsContainer.find({where: {name: "Acción vendedores"}})
  .then((optcont) => {
    salesmanAction.map((data) => {
      var createPossibleOptionPromise = Models.PossibleOption.create({
        value: data,
        company_id:optcont.company_id
      })
      .then((possopt) => {
        optcont.addPossibleOption(possopt);
      })
      possibleOptionsPromises.push(createPossibleOptionPromise);
    })
  })
  Models.OptionsContainer.find({where: {name: "Deporte favorito"}})
  .then((optcont) => {
    favoriteSport.map((data) => {
      var createPossibleOptionPromise = Models.PossibleOption.create({
        value: data,
        company_id:optcont.company_id
      })
      .then((possopt) => {
        optcont.addPossibleOption(possopt);
      })
      possibleOptionsPromises.push(createPossibleOptionPromise);
    })
  })
  Promise.all(possibleOptionsPromises)
  .then(() => {
    createQuestions();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createQuestions = function() {
  var questionsPromises = [];
  var createQuestionPromise;
  questionsData.map((data) => {
    Models.Company.find({where: {name: data.company}})
    .then((company) => {
      createQuestionPromise = Models.Question.create({
        company_id: company.id,
        text: data.info.text,
        type: data.info.type
      })
      questionsPromises.push(createQuestionPromise);
    })
  })
  Models.OptionsContainer.find({where: {name: "Menú restaurant"}})
  .then((optcont) => {
    createQuestionPromise = Models.Question.create({
      company_id: optcont.company_id,
      text: "¿Qué plato comiste hoy?",
      type: "options"
    })
    questionsPromises.push(createQuestionPromise);
  })
  Models.OptionsContainer.find({where: {name: "Plato favorito"}})
  .then((optcont) => {
    createQuestionPromise = Models.Question.create({
      company_id: optcont.company_id,
      text: "¿Cuál tipo de plato es tu favorito?",
      type: "options"
    })
    questionsPromises.push(createQuestionPromise);
  })
  Models.OptionsContainer.find({where: {name: "Deporte favorito"}})
  .then((optcont) => {
    createQuestionPromise = Models.Question.create({
      company_id: optcont.company_id,
      text: "Cual es tu deporte favorito",
      type: "options"
    })
    questionsPromises.push(createQuestionPromise);
  })
  Models.OptionsContainer.find({where: {name: "Acción vendedores"}})
  .then((optcont) => {
    createQuestionPromise = Models.Question.create({
      company_id: optcont.company_id,
      text: "¿En qué estaban los vendedores?",
      type: "options"
    })
    questionsPromises.push(createQuestionPromise);
  })
  Promise.all(questionsPromises)
  .then(() => {
    createPolls();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createPolls = function () {
  var pollsPromises = [];
  var pollOneTypes = ["number", "number", "boolean", "text"];
  var pollTwoTypes = ["number", "number", "number", "options"];
  var pollThreeTypes = ["number", "number", "options", "text"];
  var pollFourTypes = ["boolean", "options", "text"];
  Models.Company.find({where: {name: "Puma"}})
  .then((company) => {
    pollsPromises.push(createPoll(company, pollOneTypes));
    pollsPromises.push(createPoll(company, pollTwoTypes));
    pollsPromises.push(createPoll(company, pollThreeTypes));
    pollsPromises.push(createPoll(company, pollFourTypes));
  })
  Models.Company.find({where: {name: "Sushi Home"}})
  .then((company) => {
    pollsPromises.push(createPoll(company, pollOneTypes));
    pollsPromises.push(createPoll(company, pollTwoTypes));
    pollsPromises.push(createPoll(company, pollThreeTypes));
    pollsPromises.push(createPoll(company, pollFourTypes));
  })
  Promise.all(pollsPromises)
  .then(() => {
    createContests();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createContests = function() {
  var contestsPromises = [];
  contestData.map((data) => {
    var createContestPromise = Models.Contest.create(data.info)
    .then((contest) => {
      Models.Company.find({where: {name: data.company}})
      .then((company) => {
        company.addContest(contest);
      })
    })
    contestsPromises.push(createContestPromise);
  })
  Promise.all(contestsPromises)
  .then(() => {
    createPrizes();
  })
  .catch((error) => {
    console.log(error);
  })
}

var createPrizes = function() {
  var prizesPromises = [];
  prizesData.map((data) => {
    var createPrizePromise = Models.Prize.create(data.info)
    .then((prize) => {
      Models.Contest.find({where: {name: data.contest}})
      .then((contest) => {
        contest.addPrize(prize);
      })
    })
  })
  Promise.all(prizesPromises)
  .then(() => {
    addPollsToSellPoints();
  })
}

var addPollsToSellPoints = function() {
  var getDataPromises = [];
  var setDataPromises = [];
  var companyOnePolls, companyTwoPolls, companyOneSellPoints, companyTwoSellPoints;
  var findCompanyOnePolls = Models.Poll.findAll({where: {company_id: 1}})
  .then((polls) => {
    companyOnePolls = polls
  })
  getDataPromises.push(findCompanyOnePolls);
  var findCompanyTwoPolls = Models.Poll.findAll({where: {company_id: 2}})
  .then((polls) => {
    companyTwoPolls = polls
  })
  getDataPromises.push(findCompanyTwoPolls);
  var findCompanyOneSellPoints = Models.SellPoint.findAll({where: {company_id: 1}})
  .then((sellPoints) => {
    companyOneSellPoints = sellPoints;
  })
  getDataPromises.push(findCompanyOneSellPoints);
  var findCompanyTwoSellPoints = Models.SellPoint.findAll({where: {company_id: 2}})
  .then((sellPoints) => {
    companyTwoSellPoints = sellPoints;
  })
  getDataPromises.push(findCompanyTwoSellPoints);
  Promise.all(getDataPromises)
  .then(() => {
    companyOneSellPoints.map((sellPoint) => {
      setDataPromises.push(sellPoint.setAttendedPoll(companyOnePolls[getRandomInt(0, companyOnePolls.length -1)]));
      setDataPromises.push(sellPoint.setUnattendedPoll(companyOnePolls[getRandomInt(0, companyOnePolls.length -1)]));
    })
    companyTwoSellPoints.map((sellPoint) => {
      setDataPromises.push(sellPoint.setAttendedPoll(companyTwoPolls[getRandomInt(0, companyTwoPolls.length -1)]));
      setDataPromises.push(sellPoint.setUnattendedPoll(companyTwoPolls[getRandomInt(0, companyTwoPolls.length -1)]));
    })
    Promise.all(setDataPromises)
    .then(() => {
      createAnsweredPolls(companyOneSellPoints, companyTwoSellPoints);
    })
    .catch((error) => {
      console.log(error);
    })
  })
  .catch((error) => {
    console.log(error);
  })
}

var createAnsweredPolls = function(companyOneSellPoints, companyTwoSellPoints) {
  var allAnsweredPollPromises = [];
  Models.Employee.findAll({where: { company_id: 1}})
  .then((employees) => {
    companyOneSellPoints.map((sellPoint) => {
      sellPoint.getAttendedPoll()
      .then((attendedPoll) => {
        allAnsweredPollPromises.push(createAnswersToPoll(sellPoint, attendedPoll, employees));
      })
      sellPoint.getUnattendedPoll()
      .then((unattendedPoll) => {
        allAnsweredPollPromises.push(createAnswersToPoll(sellPoint, unattendedPoll, employees));
      })
    })
  })
  Models.Employee.findAll({where: { company_id: 2}})
  .then((employees) => {
    companyTwoSellPoints.map((sellPoint) => {
      sellPoint.getAttendedPoll()
      .then((attendedPoll) => {
        allAnsweredPollPromises.push(createAnswersToPoll(sellPoint, attendedPoll, employees));
      })
      sellPoint.getUnattendedPoll()
      .then((unattendedPoll) => {
        allAnsweredPollPromises.push(createAnswersToPoll(sellPoint, unattendedPoll, employees));
      })
    })
  })
  Promise.all(allAnsweredPollPromises)
  .then(() => {
    console.log("TODO CREADO");
  })
  .catch((error) => {
    console.log(error);
  })
}

var createAnswersToPoll = function(sellPoint, poll, employees){
  poll.getQuestions()
  .then((questions) => {
    var numberOfAnswers = getRandomInt(10, 20);
    var answeredPollsPromises = [];
    for(var i = 0; i < numberOfAnswers; i++){
      var createAnsweredPollPromise = Models.AnsweredPoll.create({user_id: getRandomInt(1,30)})
      .then((answeredPoll) => {
        answeredPoll.setSellPoint(sellPoint);
        answeredPoll.setPoll(poll);
        var answersPromises = [];
        var createAnswerPromise;
        questions.map((question) => {
          switch (question.type) {
            case 'number':
            Answer.create({number_value: getRandomInt(0, 5)})
            .then((answer) => {
              answeredPoll.addAnswer(answer);
              question.addAnswer(answer);
            })
            break;
            case 'boolean':
            Answer.create({boolean_value: getRandomInt(0, 1) > 1 ? true : false})
            .then((answer) => {
              answeredPoll.addAnswer(answer);
              question.addAnswer(answer);
            })
            break;
            case 'text':
            Answer.create({text_value: "Muchas gracias por su pregunta, esta es una respuesta de prueba"})
            .then((answer) => {
              answeredPoll.addAnswer(answer);
              question.addAnswer(answer);
            })
            break;
            case 'options':
            question.getOptionsContainer()
            .then((optcont) => {
              optcont.getPossibleOptions()
              .then((possopts) => {
                Answer.create({possible_option_id: possopts[getRandomInt(0, possopts.length - 1)].id})
                .then((answer) => {
                  answeredPoll.addAnswer(answer);
                  question.addAnswer(answer);
                })
              })
            })
            break;
          }
        })
      })
      answeredPollsPromises.push(createAnsweredPollPromise);
    }
  })
  return Promise.all(answeredPollsPromises)
}

var createPoll = function(company, questionTypes) {
  var pollQuestions = [];
  var getQuestionsPromises = [];
  questionTypes.map((type) => {
    var currentRequest = getRandomQuestionByType(company.id, type)
    getQuestionsPromises.push(currentRequest[0])
    pollQuestions.push(currentRequest[1])
  })
  Promise.all(getQuestionsPromises)
  .then(() => {
    var createPollPromise = Models.Poll.create({
      name: "Encuesta 1",
      description: "Parte del seed, aquí va el objetivo de la encuesta"
    })
    .then((poll) => {
      pollQuestions.map((question) => {
        poll.addQuestion(question);
      })
      company.addPoll(poll);
    })
    return createPollPromise;
  })
}

var getRandomQuestionByType = function(company_id, type) {
  var response = [];
  var findAll = Models.Question.findAll({where: {company_id: company_id, type: type}})
  .then((questions) => {
    question = getRandomQuestion(questions);
    response.push(findAll);
    response.push(question);
    return response;
  })
}

var getRandomQuestion = function(questions){
  var index = getRandomInt(0, questions.length - 1);
  var question = questions[index];
  questions.splice(index, 1);
  return question;
}

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
