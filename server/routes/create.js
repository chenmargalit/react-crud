const express = require('express');
const router = express.Router();
const { db } = require('../sql/mySQL');

const ApiError = require('../errors/apiError');
const { getDuplicatedField } = require('../utils/utilFuncs');

const validate = require('../middleware/validation');

router.post('/', validate, async (req, res, next) => {
  try {
    const { israeli_id, name, department, startDate } = req.body;
    const values = { israeli_id, name, department, startDate };
    let sql = `INSERT INTO Employees SET ?`;
    await db.query(sql, values);
    res.status(200).send('adding employee succeeded');
  } catch (err) {
    if (err.errno === 1062) {
      const duplicatedField = getDuplicatedField(err);
      //! big consideration here. On the one hand I do not want to give useful information to someone trying to hack the system. On the other hand it makes sense to tell the user which field has an issue with. In real world I would probably assign a generic message/code that the customer knows means duplicated field
      next(ApiError.duplicatedField(`Could not store ${duplicatedField} in database`));
    }
    console.log(err.message);
    next(ApiError.badRequest('Could not create a new employee, please try again shortly'));
  }
});

module.exports = router;
