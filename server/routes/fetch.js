const express = require('express');
const router = express.Router();
const { db } = require('../sql/mySQL');

const ApiError = require('../errors/apiError');

router.get('/', async (req, res, next) => {
  try {
    const sql = 'select * from Employees';
    const result = await db.query(sql);
    res.send(result[0]);
  } catch (e) {
    console.log('e is', e);
    next(ApiError.badRequest('Could not fetch data, please try again shortly'));
  }
});

module.exports = router;
