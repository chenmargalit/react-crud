const express = require('express');
const router = express.Router();
const { db } = require('../sql/mySQL');

const ApiError = require('../errors/apiError');

router.put('/', async (req, res, next) => {
  try {
    const { israeli_ID, id, name, department, startDate } = req.body.data;
    console.log(req.body.data);
    let sql = `UPDATE Employees
    SET name = ?,  department = ?, israeli_ID = ?, startDate = ?
    WHERE id = ?`;

    let data = [name, department, israeli_ID, startDate, id];
    const result = await db.query(sql, data);

    console.log('result is', result);

    res.status(200).send('success');
  } catch (e) {
    console.log('problem editing', e);
    next(ApiError.badRequest('Could not edit, please try again shortly'));
  }
});

module.exports = router;
