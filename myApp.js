let express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const { MESSAGE_STYLE } = procces.env;

// app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
}, (req, res) => {
    const message = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : 'Hello json';
    res.json({ message });
})

const middleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
}

app.get('/now', middleware, (req, res) => {
    res.json({ time: req.time });
})

app.get('/:word/echo', (req, res) => {
    const { word } = req.params;
    res.json({ echo: word });
})

app.get('/name', (req, res) => {
    const { firstname, lastname } = req.query;
    res.send({ name: `${firstname} ${lastname}` });
});

app.post('/name', (req, res) => {
    const { first, last } = req.body;
    console.log({ name: `${first} ${last}` });
    res.send({ name: `${first} ${last}` });
});
// console.log(__dirname + '/public');
// console.log(path.join(__dirname, 'public'));
































module.exports = app;
