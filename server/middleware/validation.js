const ApiError = require('../errors/apiError');

const doesContainNumber = (name, department) => {
  return name.match(/\d+/g) || department.match(/\d+/g);
};

// make sure date is not set to the future. This means you cannot pre add an employee, which is an assumption Im not 100% comfortable with.
const validDate = (dateString) => {
  const convertDateToNumber = Date.parse(dateString);
  const convertNumberToDateForm = new Date(convertDateToNumber);
  const today = new Date();
  const time_gap = today - convertNumberToDateForm;
  return time_gap > 0;
};

const validate = (req, res, next) => {
  const ID_LENGTH = 9;
  const { name, department, israeli_id, startDate } = req.body;

  const str = typeof name === 'string' && typeof department === 'string';
  const length = name.length < 80 && department.length < 55 && israeli_id.length === ID_LENGTH;
  const idIsANumber = typeof parseInt(israeli_id) === 'number';
  const time_gap = validDate(startDate);
  const containNumbers = doesContainNumber(name, department);

  if (str && length && idIsANumber && time_gap && !containNumbers) {
    next();
  } else {
    // next(ApiError.invalidData(`Invalid data`));
    next(ApiError.badRequest(`Invalid data`));
  }
};

module.exports = validate;
