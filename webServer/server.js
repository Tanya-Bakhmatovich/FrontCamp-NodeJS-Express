const express = require('express');
const router = require('./blog');

const app = express();

app.use('/', router);

app.set('view engine', 'pug');

app.use((req, resp) => {
  resp.render('index', { title: 'Welcome page', message: 'WELCOME!' })
}
);

app.listen(3000, () => console.log('Listening on port 3000'));
