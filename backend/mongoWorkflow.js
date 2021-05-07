const enc = require('./encryption');

// Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ivan:RBBpJvy6wm9maftx@cluster0.ew7po.gcp.mongodb.net/mobileContacts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// TODO: Connection only when login and logout, not all the time
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected");
});

// Schemas
const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: {
        type: String,
        default: null
    },
    contactsIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: null
    }
}, {
    versionKey: false
});

const contactSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    telephone: String
}, {
    versionKey: false
});

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Methods
async function login(username, password) {
    const userLogged = await User.findOne({
        username,
    });

    if (!userLogged) {
        throw 'User not found';
    }

    if (!enc.compare(password, userLogged.passwordHash)) {
        throw 'Password incorrect';
    }

    return userLogged;
}

async function register(username, password) {
    if (!await existUser(username)) {
        const newUser = new User();
        newUser.username = username;
        newUser.passwordHash = enc.encryptPassword(password);
        const userSaved = await newUser.save();
        return userSaved;
    }

    throw 'Username exist in db';
}

async function getUsers() {
    const users = await User.find({});
    return users;
}

async function getContacts() {
    const contacts = await Contact.find({});
    return contacts;
}

// Helpers functions
async function existUser(username) {
    return await User.exists({
        username
    });
}

module.exports = {
    login,
    register,
    getUsers,
    getContacts
};