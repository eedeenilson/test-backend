const Location = require('../model/location');
const config = require('../config/config');

exports.getAll = (req, res) => {
    Location.getAll((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(data);
    });
  };