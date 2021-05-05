const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.get('/', (req, res) => {
    res.send('Hello, contacts-api is working!');
});

app.listen(port, () => {
    if (env === 'dev') {
        console.log(`Example app listening at http://localhost:${port}`);
    }
})