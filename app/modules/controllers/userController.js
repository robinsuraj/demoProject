'use strict'
let userModel = require('../../db/models/usersDbOps');

class userController {
    constructor() { }

    async registerUser(user){
        console.log("USer----",user)
        let resp = await userModel.registerUser(user) ;
        return resp ;
    }

    async logInData(user){
        console.log("USer----",user)
        let resp = await userModel.logInData(user) ;
        return resp ;
    }

    async resetData(user){
        console.log("USer----",user)
        let resp = await userModel.resetData(user) ;
        return resp ;
    }
}

module.exports = new userController();
