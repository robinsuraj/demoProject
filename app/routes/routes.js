/**
 * Created by Suraj on 30/10/18.
 */
var express = require('express');
var router = express.Router();
var reqUserFilter = require('./reqFilters/user');
router
    .post('^/user/userRegistration',reqUserFilter.Register)
    .post('^/user/logIn',reqUserFilter.LogIn)
    .post('^/user/resetPassword',reqUserFilter.ResetPassword)
module.exports = router;
