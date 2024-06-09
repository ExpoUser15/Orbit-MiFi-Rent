const express = require('express');
const bodyParser = require('body-parser');
const rentRouter = require('./router/rentRouter/router');
const serviceRouter = require('./router/serviceRouter/router');
const handlePenyediaSocketConnection = require('./middleware/socket/socketPenyedia');
const rentalSchema = require('./models/rentalSchema');

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

io.on('connection', async (socket) => {
    handlePenyediaSocketConnection(socket);
});

let request;

io.of('/penyedia').on('connection', async (socket) => {
    socket.on('message', (data) => {
        request = data.request;
    });

    if(request){
        const countData = await rentalSchema.count();
        io.of('/penyedia').emit('jumlahPesanan', { countData });
        request = null;
    }
});

http.listen('7777', () => {
    console.log('Server running on port 7777');
});