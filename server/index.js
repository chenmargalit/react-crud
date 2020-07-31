const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { createTable, drop } = require('./sql/mySQL');

const apiErrorHandler = require('./errors/api-error-handler');

const create = require('./routes/create');
const fetch = require('./routes/fetch');
const truncate = require('./routes/truncate');
const edit = require('./routes/edit');

//! Errors must be handled with OOP

app.use(cors());
app.use(bodyParser.json());

app.use('/api/create', create);
// app.use('/authentication', authenticate);
app.use('/api/fetch', fetch);
app.use('/api/truncate', truncate);
app.use('/api/edit/:id', edit);

// app.use(errorHandler);

// createTable('Employees');
// drop('Employees');

app.use(apiErrorHandler);

app.get('/api/wopa', (req, res) => {
  console.log('reached wopa on server');
  res.status(200).send('regular wopa');
});

app.get('/api/wopa2', (req, res) => {
  console.log('reached wopa2 on server');
  res.status(200).send('wopa2');
});

app.get('/api', (req, res) => {
  console.log('reached root /');
  res.send('this is the root');
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
