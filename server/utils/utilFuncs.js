const getDuplicatedField = (error) => {
  const errorArray = error.sqlMessage.split(' ');
  return errorArray[errorArray.length - 1];
};

module.exports = { getDuplicatedField };
