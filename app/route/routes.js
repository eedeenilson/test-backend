const User = require('../controller/user');
const Event = require('../controller/event');
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
};