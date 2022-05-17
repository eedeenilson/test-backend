const sql = require('../db/db');
// Location object constructor
const Location = function Location(location) {
};

Location.getAll = (result) => {
    sql.query('SELECT * FROM location;', (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };

module.exports = Location;