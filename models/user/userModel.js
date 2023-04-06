const pool = require('../../database/db');

const getUserByUserName = (userName) => {
    return new Promise((resolve, reject) => {
        pool.connect(function (err, client, release) {
            if (err) return reject(err);
            else {
                let query = `SELECT * FROM "User" WHERE "userName" = $1`;
                client.query(query, [userName], (err, result) => {
                    release(); // always put connection back in pool after last query
                    if (err) return resolve(null);
                    return resolve(result.rows[0]);
                })
            }
        })
    })
}

const createNewUser = (user) => {
    return new Promise((resolve, reject) => {
        pool.connect(function (err, client, release) {
            if (err) {
              return reject(err);
            }
            console.log("vao day");
            let sql = `INSERT INTO "User" ("userName", "passWord", "lifeCode") VALUES ($1, $2, $3) RETURNING "id"`;
            client.query(sql, Object.values(user), function (err, results) {
              release(); // always put connection back in pool after last query
              if (err) {
                console.log(err);
                return resolve(null);
              }
              return resolve(results.rows);
            });
          });
    });
}

const getUser = (userName, passWord) => {
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, release) {
            if (err) return reject(err);
            else {
                let query = `SELECT * FROM "User" WHERE "userName" = $1 AND "passWord" = $2`;
                client.query(query, [userName, passWord], (err, res) => {
                    release();
                    if (err) return resolve(null);
                    else return resolve(res.rows[0]);
                });
            };
        });
    });
}

module.exports = {
    getUserByUserName,
    createNewUser,
    getUser
}