const mysql2 = require('mysql2/promise');
require('dotenv').config();

// a bit slower, but more secure. Allow 5 connections at any given time. Feel free to uncomment and retrieve the mysql.createConnection in the next lines for quicker reactions
const db = mysql2.createPool(
  {
    connectionLimit: 5,
    host: 'remotemysql.com',
    user: 'QHumDJGXfj',
    password: 'NQMKK0TM1U',
    database: 'QHumDJGXfj',
    dateStrings: true,
  },
  () => console.log('mysql on')
);

// a bit faster, but less secure
// module.exports = db = mysql.createConnection({
//   host: 'remotemysql.com',
//   user: 'QHumDJGXfj',
//   password: 'NQMKK0TM1U',
//   database: 'QHumDJGXfj'
// });
// // createdb();
// db.connect(err => {
//   if (err) {
//     console.log('problem with connecting to db', err);
//   } else {
//     console.log(`connected successfully to db`);
//   }
// });

// a few convenience sql functions

const createTable = (table) => {
  console.log('creating table');
  let sql = `CREATE TABLE ${table}(id int AUTO_INCREMENT, name varchar(80) NOT NULL, department varchar(55) NOT NULL, startDate DATE NOT NULL, israeli_ID varchar(10) UNIQUE, PRIMARY KEY(id))`;
  db.query(sql, (err, result) => {
    err ? console.log(err) : console.log('table creation succeeded');
  });
};

const drop = (table) => {
  console.log('dropping table');
  let sql = `drop table ${table}`;
  db.query(sql, (err, result) => {
    err ? console.log('dropping table issue') : console.log('dropping table succeeded');
  });
};

const clearTable = (table) => {
  console.log('clearing table');
  let sql = `DELETE from ${table}`;
  db.query(sql, (err, result) => {
    err ? console.log('clearing table issue') : console.log('clearing table succeeded');
  });
};

module.exports = { db, createTable, drop };
