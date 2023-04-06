const pool = require("../../database/db");

const list = () => {
  return new Promise((resolve, reject) => {
    pool.connect(function (err, client, release) {
      if (err) {
        return reject(err);
      }
      let sql = `SELECT * FROM "GroupReport"`;
      client.query(sql, [], function (err, results) {
        release(); // always put connection back in pool after last query
        if (err) {
          console.log(err);
          return resolve(null);
        }
        return resolve(results.rows);
      });
    });
  });
};

const insert = (groupReport) => {
  return new Promise((resolve, reject) => {
    pool.connect(function (err, client, release) {
      if (err) {
        return reject(err);
      }
      let sql =
        `INSERT INTO "GroupReport" (userId, date, dt, hh, bt, 1L, 4L, menChi) Values (?, ?, ?, ?, ?, ?, ?, ?)`;
        client.query(
        sql,
        Object.values(groupReport),
        function (err, results) {
          release(); // always put connection back in pool after last query
          if (err) {
            console.log(err);
            return resolve(null);
          }
          return resolve(results);
        }
      );
    });
  });
};

module.exports = {
    list,
    insert
}