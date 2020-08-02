const express = require('express');
const router = express.Router();
const { db } = require('../sql/mySQL');

// delete all employees
router.delete('/', async (req, res) => {
  console.log('reached delete');
  try {
    const sql = 'truncate table Employees';
    await db.query(sql);
    res.status(200).send('success');
  } catch (e) {
    console.log('problem with deleting all form db', e);
    res.status(500).send('problem with deleting');
  }
});

// delete one employee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.body;
    const sql = `delete from Employees where id = ${id}`;
    await db.query(sql);
    res.status(200).send('success');
  } catch (e) {
    console.log('error deleting specific employee', e);
    next(ApiError.badRequest('Could not truncate table, please try again shortly'));
  }
});

module.exports = router;
