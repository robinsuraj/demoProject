'use strict'
let UserData = require('../schemas/user');
var jwt = require('jsonwebtoken');
var config = require('../../../config/config');
var httpStatus = require('http-status-codes');



let _ = require('lodash');

class userModel {
    constructor(){ };
    

    async registerUser(user){
        try{
            const result = await UserData.findOne({
                email:user.email,status:'ACTIVE'
            });
            if(result){
                return {err: true, msg:'User already exists'} ;
            }else{
                let userData = await new UserData(user);
                return await userData.save() ;
            }
        }
        catch(err){
            console.log('--usersDbOps--',err);
            return {err: true, msg:'Error while saving'} ;
        }
    }

    async logInData(user){
        try{
          
            const result = await UserData.findOne({
                email:user.email,password: user.password });
            if(!result){
                return {err: true, msg:'User does not exists'} ;
            }else{
                return result;
            }
        }
        catch(err){
            console.log('--usersDbOps--',err);
            return {err: true, msg:'Error while saving'} ;
        }
    }

    async resetData(user){
        try{
            const result = await UserData.findOne({_id: user.userId});
            if(result){
                if (result.password != user.oldpass) {
                    return {err: true, msg:'Old password does not match'} ;
                } else {
                    var password = user.newpass;
                    const result = await User.findByIdAndUpdate({ _id: user.userId }, { $set: { password: password } }, { new: true });
                    return result;
                }
            }
        }
        catch(err){
            console.log('--usersDbOps--',err);
            return {err: true, msg:'Error while saving'} ;
        }
    }
}
module.exports = new userModel();
