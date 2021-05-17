const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});
const mongoWorkflow = require('./mongoWorkflow');

// Generic router and build config
const router = express.Router();
app.use(cors({
    origin: '*'
}));
app.use('/api', router);

// Bodyparser
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Build config
app.use(express.static(__dirname + '/dist'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

router.post('/login', async (req, res) => {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    try {
        const loggedUser = await mongoWorkflow.login(username, password);
        res.send(loggedUser);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const registeredUser = await mongoWorkflow.register(username, password);
        res.send(registeredUser);
    } catch (err) {
        res.status(401).send(err.message);
    }
});

router.get('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const contacts = await mongoWorkflow.getContactById(id);
        res.send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/contacts', async (req, res) => {
    const id = req.query.userId;
    try {
        const contacts = await mongoWorkflow.getContactsByUserId(id);
        res.send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/contacts', upload.single('img'), async (req, res) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const telephone = req.body.telephone;
    const img = req.file;
    let imgBase64 = undefined;
    if (img) {
        imgBase64 = `data:${img.mimetype};base64,${img.buffer.toString('base64')}`;
    }
    try {
        const createdContact = await mongoWorkflow.createContact(userId, name, lastName, telephone, imgBase64);
        res.send(createdContact);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/contacts/:id', upload.single('img'), async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const telephone = req.body.telephone;
    const img = req.file;
    let imgBase64 = undefined;
    if (img) {
        imgBase64 = `data:${img.mimetype};base64,${img.buffer.toString('base64')}`;
    }
    try {
        const contacts = await mongoWorkflow.editContact(id, name, lastName, telephone, imgBase64);
        res.send(contacts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/contacts/:id', async (req, res) => {
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