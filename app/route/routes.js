const User = require('../controller/user');
const Event = require('../controller/event');
const Attendee = require('../controller/attendee');
const Location = require('../controller/location');
const Group = require('../controller/group');
const Middleware = require('../middleware/auth');

module.exports = function App(app) {
  //USER
  app.route('/api/user/login').post(User.getLogin);

  app
    .route('/api/user')
    .get(User.getAll)
    .post(//Middleware.checkToken, 
        User.create);

  app
    .route('/api/user/:userId')
    .put(//Middleware.checkToken, 
        User.update)
    .get(//Middleware.checkToken, 
        User.getOne);

  //EVENT
  app
    .route('/api/event')
    .get(Event.getAll)
    .post(//Middleware.checkToken, 
        Event.create);

  app
    .route('/api/event/:eventId')
    .put(//Middleware.checkToken, 
        Event.update)
    .get(//Middleware.checkToken, 
        Event.getOne);

  //ATTENDEE
  app
    .route('/api/attendee/')
    .post(//Middleware.checkToken, 
        Attendee.create);

  //LOCATION
  app
    .route('/api/location')
    .get(Location.getAll)
  
  //GROUP
  app
    .route('/api/group/')
    .post(//Middleware.checkToken, 
        Group.create);

  app
    .route('/api/group/:eventId')
    .get(Group.getAll)
};