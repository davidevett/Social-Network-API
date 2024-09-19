const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        //required: true,
        unique: true,
        lowercase: true,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }]
});


const User = model('user', userSchema);

module.exports = User;
