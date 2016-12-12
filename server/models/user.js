console.log('User model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// build your friend schema and add it to the mongoose.models
var UserSchema = new mongoose.Schema({
    //Table Items Here
    name: {type: String, required: true},
    gamer_name: {type: String},
    points: {type: Number},
    level: {type: Number},
    gopher: {type: String},
    status: {type: String},
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true, minlength: 8 },
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    requests: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true });

var User = mongoose.model('User', UserSchema);