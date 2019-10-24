const express = require('express');
const app = express();
const EXPRESS_FUNCTIONS = require('./functions');

app.get('/', EXPRESS_FUNCTIONS.ROOT_GET);
app.post('/', EXPRESS_FUNCTIONS.ROOT_POST);

app.listen(3000, () => console.log('Listening on port 3000'));