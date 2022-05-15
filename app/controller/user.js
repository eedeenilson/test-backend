const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const config = require('../config/config');

/**
 * @api {post} /user/ New User.
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String} name Full name.
 * @apiParam {String} username Username for login.
 * @apiParam {String} password Pass for login.
 * @apiParam {Number} fk_userType User role (id).
 * @apiParam {Number} createdBy User created by (id).
 *
 * @apiSuccessExample Body:
 *    {
        "name": "John Doe",
        "username": "doe777",
        "password": "contraseniasegura",
        "fk_userType": 1,
        "createdBy": 1
      }
 *
 * @apiError InternalError The user not be created.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.create = function create(req, res) {
  const newUser = new User(req.body);
  if (!newUser.username) {
    res.status(400).send({
      error: true,
      message: 'Please provide all data',
    });
  } else {
    try {
      User.createUser(newUser, (err, user) => {
        if (err) {
          if (err.errno === 1062) {
            return res.status(400).send({
              error: 400,
              message: 'Username has been used',
            });
          }
          return res.status(400).send({
            error: 400,
            message: err.code,
          });
        }
        return res.json(user);
      });
    } catch (err) {
      console.error = () => {
        throw new Error('The user not be created');
      };
    }
  }
};

/**
 * @api {get} /user All users.
 * @apiName GetAllUser
 * @apiGroup User
 *
 * @apiSuccess {Number} id User id.
 * @apiSuccess {String} name Full name.
 * @apiSuccess {String} username Username for login.
 * @apiSuccess {String} password Encrypted pass.
 * @apiSuccess {Number} fk_userType User role (id).
 * @apiSuccess {String} createdAt User created at (date).
 * @apiSuccess {Number} createdBy User created by (id).
 * @apiSuccess {String} updatedAt User updated at (date).
 * @apiSuccess {Number} updatedBy User modified by (id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [{
        "id": 7,
        "name": "John Doe",
        "username": "doe777",
        "password": "$2b$15$0FIdTSCNFu427p6kYP0n4UXmYtep4a57if1TE5ssqxY7Ulm",
        "fk_userType":1
        "createdAt": "2020-09-26T21:00:12.000Z",
        "createdBy": 1,
        "updatedAt": "2020-09-26T21:39:50.000Z",
        "updatedBy": "2020-09-26T21:39:50.000Z"
      },
      {
        "id": 7,
        "name": "John Doe",
        "username": "doe777",
        "password": "$2b$15$0FIdTSCNFu427p6kYP0n4UXmYtep4a57if1TE5ssqxY7Ulm",
        "fk_userType":1
        "createdAt": "2020-09-26T21:00:12.000Z",
        "createdBy": 1,
        "updatedAt": "2020-09-26T21:39:50.000Z",
        "updatedBy": "2020-09-26T21:39:50.000Z"
      }]
 *
 * @apiError InternalError Something was wrong.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.getAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(data);
  });
};

/**
 * @api {get} /user/:id Single user information.
 * @apiName GetOneUser
 * @apiGroup User
 *
 * @apiParam {Number} id Id for user identification.
 * 
 * @apiSuccess {Number} id User id.
 * @apiSuccess {String} name Full name.
 * @apiSuccess {String} username Username for login.
 * @apiSuccess {String} password Encrypted pass.
 * @apiSuccess {Number} fk_userType User role (id).
 * @apiSuccess {String} createdAt User created at (date).
 * @apiSuccess {Number} createdBy User created by (id).
 * @apiSuccess {String} updatedAt User updated at (date).
 * @apiSuccess {Number} updatedBy User modified by (id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [{
        "id": 7,
        "name": "John Doe",
        "username": "doe777",
        "password": "$2b$15$0FIdTSCNFu427p6kYP0n4UXmYtep4a57if1TE5ssqxY7Ulm",
        "fk_userType":1
        "createdAt": "2020-09-26T21:00:12.000Z",
        "createdBy": 1,
        "updatedAt": "2020-09-26T21:39:50.000Z",
        "updatedBy": "2020-09-26T21:39:50.000Z"
      }]
 *
 * @apiError InternalError User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.getOne = (req, res) => {
  const { userId } = req.params;
  User.getOne(userId, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(data);
  });
};

/**
 * @api {put} /user/:id Edit user.
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {Number} id User id.
 * @apiParam {String} name Full name.
 * @apiParam {Number} updated_by User identification (id).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [{
        "name": "John Doe",
        "fk_userTyoe": 2,
        "updatedBy": 1
      }]
 *
 * @apiError InternalError User not be updated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.update = (req, res) => {
  const { userId } = req.params;
  const user = req.body;

  User.updateById(user, userId, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(data);
  });
};

/**
 * @api {post} /user/login Login.
 * @apiName VerifyUserCredentials
 * @apiGroup User
 *
 * @apiSuccess {String} username Username for login.
 * @apiSuccess {String} password User pass.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
        "success": true,
        "message": "Authentication successful!",
        "user": [],
        "token": "0.xfqPWID-Mgl3Yr8VFRadNAR6IlS4n-UDs1fHrk7S0Tk"
      }
 *
 * @apiError InternalError User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.getLogin = (req, res) => {
  const login = req.body;
  User.getCredenciales(login.username, (err, data) => {
    if (err) {
      res.status(500).send(`Internal server error ${err}`);
    } else if (data.length < 1) {
      const message = {
        message: 'Invalid user',
      };
      res.status(400).send(message);
    } else {
      const te = data[0].pass;
      if (bcrypt.compareSync(login.pass, te)) {
        const token = jwt.sign({ user: login }, config.secret, {
          // expiresIn: '5m' // expires in 24 hours
        });
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          user: data,
          token,
        });
      } else {
        const message = {
          message: 'Incorrect password',
        };
        res.status(400).send(message);
      }
    }
  });
};