const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rentRouter = require('./router/rentRouter/router');
const serviceRouter = require('./router/serviceRouter/router');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rentRouter);
app.use(serviceRouter);

app.listen('7777', () => {
    console.log('Server running on port 7777');
});