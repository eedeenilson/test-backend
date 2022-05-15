const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Event = require('../model/event');
const config = require('../config/config');


exports.create = function create(req, res) {
  const newEvent = new Event(req.body);
  Event.createEvent(newEvent, (err, event) => {
    if (err) {
        return res.status(500).send({err});
    }else{
        return res.json(event);
    }
  });
};

exports.getAll = (req, res) => {
  Event.getAll((err, data) => {
    if (err) {
      return res.status(500).send({err});
    }
    return res.json(data);
  });
};

exports.getOne = (req, res) => {
  const { eventId } = req.params;
  Event.getOne(eventId, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(data);
  });
};

exports.update = (req, res) => {
  const { eventId } = req.params;
  const user = req.body;

  Event.updateById(user, eventId, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(data);
  });
};