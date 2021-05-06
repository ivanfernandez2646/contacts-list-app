const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const cors = require('cors');
const mongoWorkflow = require('./mongoWorkflow');

// Cors
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// API Methods
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const loggedUser = await mongoWorkflow.login(username, password);
        res.send(loggedUser);
    } catch (err) {
        res.send(401, err);
    }
});

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const registeredUser = await mongoWorkflow.register(username, password);
        res.send(registeredUser);
    } catch (err) {
        res.send(401, err);
    }
});

app.get('/users', async (req, res) => {
    const users = await mongoWorkflow.getUsers();
    res.send(users);
});

app.get('/contacts', async (req, res) => {
    const contacts = await mongoWorkflow.getContacts();
    res.send(contacts);
});

// Listen
app.listen(port, () => {
    if (env === 'dev') {
        console.log(`Example app listening at http://localhost:${port}`);
    }
})