const enc = require('./encryption');
const User = require('./models/user');
const Contact = require('./models/contact');

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

async function getContactById(id) {
    if (!id) {
        throw new Error('Id parameter is mandatory');
    }

    const contact = await Contact.findById({
        _id: id
    });
    return contact;
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

async function createContact(userId, name, lastName, telephone, img) {
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
        newContact.img = img;
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

async function editContact(id, name, lastName, telephone, img) {
    const contact = await Contact.findById({
        _id: id
    });

    if (contact) {
        contact.name = name;
        contact.lastName = lastName;
        contact.telephone = telephone;
        if (img) {
            contact.img = img;
        }
        await contact.save();
        return contact;
    }

    throw new Error('Contact not found');
}

async function deleteContact(id) {
    const contact = await Contact.findById({
        _id: id
    });

    if (contact) {
        const session = await Contact.startSession();
        session.startTransaction();
        try {
            const deletedContact = await contact.deleteOne();
            const userWithThisContact = await User.findOne({
                contacts: {
                    $in: contact._id
                },
            });

            const index = userWithThisContact.contacts.findIndex(c => c === contact.id);
            userWithThisContact.contacts.splice(index, 1);
            await userWithThisContact.save();

            await session.commitTransaction();
            session.endSession();
            return deletedContact;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    throw new Error('Contact not found');
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
    getContactById,
    getContactsByUserId,
    createContact,
    editContact,
    deleteContact
};