const bcrypt = require('bcrypt');
const sql = require('../db/db');
// Attendee object constructor
const Attendee = function Attendee(attendee) {
  this.full_name = attendee.name;
  this.identification_number = attendee.identification_number ? bcrypt.hashSync(attendee.identification_number,15): null;
  this.fk_groupId = attendee.fk_groupId;
  this.created_by = attendee.created_by;
};

Attendee.createAttendee = (attendee, result) => {
  sql.query('INSERT INTO attendee SET ?', attendee, (err, res) => {
    if (err) {
        console.log(err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

module.exports = Attendee;