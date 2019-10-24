const express = require('express');
const bodyParser = require('body-parser');
const EXPRESS_FUNCTIONS = require('./functions');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', EXPRESS_FUNCTIONS.ROOT_GET);
app.post('/', EXPRESS_FUNCTIONS.ROOT_POST);

app.listen(3000, () => console.log('Listening on port 3000'));