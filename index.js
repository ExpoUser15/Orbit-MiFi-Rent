const express = require('express');
const bodyParser = require('body-parser');
const rentRouter = require('./router/rentRouter/router');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rentRouter);

app.listen('3000', () => {
    console.log('Server running on port 3000');
});