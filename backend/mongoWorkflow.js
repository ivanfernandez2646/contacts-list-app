const enc = require('./encryption');

// Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ivan:RBBpJvy6wm9maftx@cluster0.ew7po.gcp.mongodb.net/mobileContacts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected");
});

// Schemas
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        default: null
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        default: null
    }]
}, {
    versionKey: false
});

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        validate: {
            validator: function (val) {
                return val.match(/[0-9]{9}/);
            },
            message: "You must provide 9 numeric digits."
        },
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
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
        throw new Error('User not found');
    }

    if (!enc.compare(password, userLogged.passwordHash)) {
        throw new Error('Password incorrect');
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

    throw new Error('Username exist in db');
}

async function getContactsByUserId(userId) {
    if (!userId) {
        throw new Error('UserId parameter is mandatory');
    }

    const contacts = await Contact.find({
        user: userId
    });
    return contacts;
}

async function createContact(userId, name, lastName, telephone) {
    if (!userId) {
        throw new Error('UserId parameter is mandatory');
    }

    const session = await Contact.startSession();
    session.startTransaction();
    try {
        const newContact = new Contact();
        newContact.name = name;
        newContact.lastName = lastName;
        newContact.telephone = telephone;
        newContact.user = userId;
        const contactSaved = await newContact.save();

        const updateUser = await User.findOne({
            _id: userId,
        });
        updateUser.contacts.push(newContact._id);
        await updateUser.save();

        await session.commitTransaction();
        session.endSession();
        return contactSaved;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
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
    getContactsByUserId,
    createContact
};