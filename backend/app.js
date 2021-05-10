const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const cors = require('cors');
const mongoWorkflow = require('./mongoWorkflow');

// Cors
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({
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
        res.status(401).send(err.message);
    }
});

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const registeredUser = await mongoWorkflow.register(username, password);
        res.send(registeredUser);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await mongoWorkflow.getUsers();
        res.send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await mongoWorkflow.getContacts();
        res.send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/contacts', async (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const lastName = req.body.lastName;
    const telephone = req.body.telephone;
    try {
        const createdContact = await mongoWorkflow.createContact(name, lastName, telephone);
        res.send(createdContact);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Listen
app.listen(port, () => {
    if (env === 'dev') {
        console.log(`Example app listening at http://localhost:${port}`);
    }
})