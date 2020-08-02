const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// use to create/drop the entire table
// const { createTable, drop, db } = require('./sql/mySQL');

const apiErrorHandler = require('./errors/api-error-handler');

const create = require('./routes/create');
const fetch = require('./routes/fetch');
const truncate = require('./routes/truncate');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/create', create);
app.use('/api/fetch', fetch);
app.use('/api/truncate', truncate);

app.use(apiErrorHandler);

app.listen(5000, () => {
  console.log('listening on 5000');
});
