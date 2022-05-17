const sql = require('../db/db');
// Group object constructor
const Group = function Group(group) {
    
    this.name = group.name,
    this.fk_eventId = group.fk_eventId,
    this.created_by = group.created_by
      
};

Group.createGroup = (group, result) => {
    sql.query('INSERT INTO eventgroup SET ?', group, (err, res) => {
      if (err) {
          console.log(err);
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    });
  };

Group.getAll = (eventId, result) => {
    sql.query('SELECT eg.*, ev.name AS eventname FROM eventgroup eg JOIN event ev ON eg.fk_eventId = ev.id WHERE ev.id = ?;', eventId, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

module.exports = Group;