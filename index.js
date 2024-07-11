const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serviceRouter = require('./router/router');

require('dotenv').config();

const port = process.env.PORT || '7777';

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(serviceRouter);

app.listen(port, () => {
    console.log('Server running on port 7777');
});