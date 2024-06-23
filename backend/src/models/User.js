const mongoose = require('../database/connet');
const { Schema } = mongoose;

const User = mongoose.model(
    'User',
    new Schema({
        name:{
            type: String,
            require: true
        },
        email:{
            type: String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true
        }
    },
    {timestamps: true},
    )
);

module.exports = User;