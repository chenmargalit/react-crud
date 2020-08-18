const mysql2 = require('mysql2/promise');
require('dotenv').config();

const db = mysql2.createPool(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
  },
  () => console.log('mysql on')
);

// table creation function, as requested.
const createTable = (table) => {
  console.log('creating table');
  let sql = `CREATE TABLE ${table}(id int AUTO_INCREMENT, name varchar(80) NOT NULL, department varchar(55) NOT NULL, startDate DATE NOT NULL, israeli_ID varchar(10) UNIQUE, PRIMARY KEY(id))`;
  db.query(sql, (err, result) => {
    err ? console.log(err) : console.log('table creation succeeded');
  });
};

module.exports = { db, createTable, drop };
