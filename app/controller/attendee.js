const Attendee = require('../model/attendee');
const config = require('../config/config');


exports.create = function create(req, res) {
  const newAttendee = new Attendee(req.body);
  Attendee.createAttendee(newAttendee, (err, attendee) => {
    if (err) {
        return res.status(500).send({err});
    }else{
        return res.json(attendee);
    }
  });
};