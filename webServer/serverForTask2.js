const express = require('express');
const stubJson = require('./stub/stubJson');

const app = express();

app.use((req, resp) =>
  resp.send(stubJson)
);

app.listen(1337, () => console.log('Listening on port 1337'));
