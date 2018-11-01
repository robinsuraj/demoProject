var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, },
    firstName: { type: String },
    lastName: { type: String },
    contactNumber: { type: String },
    password: { type: String,required: true },
    status: {type: String,default: 'ACTIVE',trim: true},
    createdAt:{type: Date,default: Date.now()},
    amount:{ type:Number,default: 0 }
});
var userDetail = mongoose.model('users_info', userSchema);
module.exports = userDetail;


