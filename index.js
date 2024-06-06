const express = require('express');
const bodyParser = require('body-parser');
const rentRouter = require('./router/rentRouter/router');
const serviceRouter = require('./router/serviceRouter/router');

require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('socketio', io);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rentRouter);
app.use(serviceRouter);

// io.on('connection', (socket) => {
//     console.log('Socket connected: ', socket.id);

//     socket.emit('jumlahPesanan', 'data');
// })

http.listen('7777', () => {
    console.log('Server running on port 7777');
});