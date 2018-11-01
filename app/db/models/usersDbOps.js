'use strict'
let UserData = require('../schemas/user');
var nodemailer = require('nodemailer');



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
            return {err: true, msg:'Error .....'} ;
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
            return {err: true, msg:'Error....'} ;
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
                    const result = await UserData.findByIdAndUpdate({ _id: user.userId }, { $set: { password: password } }, { new: true });
                    return result;
                }
            }else{
                return {err: true, msg:'User does not exists'} ;
            }
        }
        catch(err){
            console.log('--usersDbOps--',err);
            return {err: true, msg:'Error....'} ;
        }
    }

    async forgetPassword(user){
        try{
            const result = await UserData.findOne({email: user.email});
            if(result){
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: "test.avi201@gmail.com",
                        pass: "Mobiloitte1"
                    }
                });
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var link = "";
                for (var i = 0; i < 8; i++) link += possible.charAt(Math.floor(Math.random() * possible.length));
                var to = user.email
                var mailOption = {
                    from: "test.avi201@gmail.com",
                    to: user.email,
                    subject: 'Demo Change Password ',
                    text: 'you have a new submission with following details',
                    html: "Your current Password is :" + link
                }
                const mailResult = await transporter.sendMail(mailOption);
                if(mailResult){
                    const finalResult = await UserData.findOneAndUpdate({ email: user.email }, {$set: {password: link }});
                    return finalResult;
                }
            }else{
                return {err: true, msg:'User does not exists'} ;
            }
        }
        catch(err){
            console.log('--usersDbOps--',err);
            return {err: true, msg:'Error....'} ;
        }
    }
}
module.exports = new userModel();
