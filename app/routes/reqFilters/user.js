/**
 * Created by Suraj on 30/10/18.
 */
'use strict'
const userController = require('../../modules/controllers/userController');
const resHandler = require('../../modules/utils/resHandler');
var jwt = require('jsonwebtoken');
var config = require('../../../config/config');

/**
 * handles ajax calls 
 */
 class userRoutes {
    constructor() {}

    async Register(req, res){
        try{ 
            console.log("req",req.body)
            if(req.body.email && req.body.password){
                let user = {
                    "email": req.body.email,
                    "firstName": req.body.firstName, 
                    "lastName": req.body.lastName, 
                    "contactNumber": req.body.contactNumber,
                    "password": req.body.password,
                }
                let registerData = await userController.registerUser(user);
                if(!registerData.err){
                    resHandler.sendRes(true, 'User registered', registerData, {}, res);
                }
                else{
                    resHandler.sendErr({},registerData.msg,{},res) ;
                }
            }else{
                resHandler.sendErr({},'Invalid request',{},res) ;
            }
                
        }
        catch(err){
            resHandler.sendErr({},'Something Went Wrong',{},res);
        }
    }

    async LogIn(req, res){
        try{ 
            console.log("req",req.body)
            if(req.body.email && req.body.password){
                let user = {
                    "email": req.body.email,
                    "password": req.body.password,
                }
                let logInData = await userController.logInData(user);
                if(!logInData.err){
                    var token_data = {
                        _id: logInData._id,
                        status: logInData.status
                    }
                    var token = jwt.sign(token_data, config.secreteKey);
                    res.header({
                        "appToken": token
                    }).send({
                        success: true,
                        data: logInData,
                        status: 'ACTIVE',
                        msg : "Login succesefully",
                        token: token,
                    });
                }
                else{
                    resHandler.sendErr({},logInData.msg,{},res) ;
                }
            }else{
                resHandler.sendErr({},'Invalid request',{},res) ;
            }    
        }
        catch(err){
            console.log(err);
            resHandler.sendErr({},'Something Went Wrong',{},res);
        }
    }

    async ResetPassword(req, res){
        try{ 
            console.log("req",req.body)
            if(req.body.newpass && req.body.oldpass && req.body.userId){
                let user = {
                    "newpass": req.body.newpass,
                    "oldpass": req.body.oldpass,
                    "userId": req.body.userId,
                }
                let resetData = await userController.resetData(user);
                if(!resetData.err){
                    var token_data = {
                        _id: resetData._id,
                        status: resetData.status
                    }
                    var token = jwt.sign(token_data, config.secreteKey);
                    res.header({
                        "appToken": token
                    }).send({
                        result: resetData,
                        token: token,
                        responseCode: 200,
                    });
                }
                else{
                    resHandler.sendErr({},registerData.msg,{},res) ;
                }
            }else{
                resHandler.sendErr({},'Invalid request',{},res) ;
            }    
        }
        catch(err){
            resHandler.sendErr({},'Something Went Wrong',{},res);
        }
    }
 }
 module.exports = new userRoutes()
