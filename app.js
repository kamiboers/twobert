const express = require('express');
const app = express();
const path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('static'));

// app.set('port', process.env.PORT || 6060);
app.locals.title = 'Q*BERT';


if (!module.parent) {
  // app.listen(app.get('port'), () => {
  //   console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  // });
  server.listen(6060)
}

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});


// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

io.on('connection', function(socket) {
    console.log('New connection');

    socket.on('message', function(msg) {
        console.log('Got message from client: ' + msg);
    });
});

module.exports = app;