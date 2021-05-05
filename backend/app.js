const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const cors = require('cors');
const mongoWorkflow = require('./mongoWorkflow');

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.get('/users', async (req, res) => {
    const users = await mongoWorkflow.getUsers();
    res.send(users);
});

app.get('/contacts', async (req, res) => {
    const contacts = await mongoWorkflow.getContacts();
    res.send(contacts);
});


app.listen(port, () => {
    if (env === 'dev') {
        console.log(`Example app listening at http://localhost:${port}`);
    }
})