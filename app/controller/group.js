const Group = require('../model/group');
const config = require('../config/config');

exports.create = function create(req, res) {
    const newGroup = new Group(req.body);
    Group.createGroup(newGroup, (err, event) => {
      if (err) {
          return res.status(500).send({err});
      }else{
          return res.json(event);
      }
    });
  };

exports.getAll = (req, res) => {
    const { eventId } = req.params;
    Group.getAll(eventId,(err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(data);
    });
  };