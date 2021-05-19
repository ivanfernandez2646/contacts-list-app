const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 15,
    },
    lastName: {
        type: String,
        required: false,
        maxlength: 20,
    },
    telephone: {
        type: String,
        validate: {
            validator: function (val) {
                return val.match(/[0-9]{9}/);
            },
            message: "You must provide 9 numeric digits."
        },
        required: true,
    },
    img: {
        type: String,
        default: null,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {
    versionKey: false
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;