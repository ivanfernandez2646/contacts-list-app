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

app.get('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const contacts = await mongoWorkflow.getContactById(id);
        res.send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/contacts', async (req, res) => {
    const id = req.query.userId;
    try {
        const contacts = await mongoWorkflow.getContactsByUserId(id);
        res.send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/contacts', async (req, res) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const telephone = req.body.telephone;
    try {
        const createdContact = await mongoWorkflow.createContact(userId, name, lastName, telephone);
        res.send(createdContact);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const telephone = req.body.telephone;
    try {
        const contacts = await mongoWorkflow.editContact(id, name, lastName, telephone);
        res.send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await mongoWorkflow.deleteContact(id);
        res.send(result);
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