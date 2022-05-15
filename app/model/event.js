const bcrypt = require('bcrypt');
const sql = require('../db/db');
// Event object constructor
const Event = function Event(event) {
  this.name = event.name;
  this.fk_locationId = event.fk_locationId;
  this.event_date = event.event_date;
  this.created_by = event.created_by;
};

Event.createEvent = (event, result) => {
  sql.query('INSERT INTO event SET ?', event, (err, res) => {
    if (err) {
        console.log(err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Event.getAll = (result) => {
  sql.query('SELECT * FROM event;', (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Event.updateById = (event, eventId, result) => {
  sql.query(
    `UPDATE event
      SET name = ?, event_date = ?, updated_by = ?
      WHERE id = ?`,
    [event.name, event.event_date, event.updated_by, eventId],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    },
  );
};

Event.getOne = (eventId, result) => {
  sql.query('SELECT * FROM event WHERE id = ?', eventId, (err, res) => {
    if (err) {
      console.error = () => {
        throw new Error(err);
      };
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Event;