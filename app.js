const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('static'));

app.set('port', process.env.PORT || 6060);
app.locals.title = 'Q*BERT';

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;