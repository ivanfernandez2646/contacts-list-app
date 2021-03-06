const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        default: null
    }]
}, {
    versionKey: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;