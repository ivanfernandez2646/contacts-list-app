const bcrypt = require('bcrypt');

const saltRounds = 10;

function encryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function compare(password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = {
    encryptPassword,
    compare
}