/**
 * Created by Suraj on 30/10/18.
 */
var httpStatus = require('http-status-codes');

class resHandler {
    constructor() {}
    
    sendErr(status, msg,data, res) {
        var obj = {
            success: false,
            data: data || {},
            status: status || {},
            msg : msg || ""
        };
        res.status(status.code || 400)
        .send({success: obj.success, message: obj.msg, status : obj.status, data: obj.data});
    }
    sendRes(success, msg, data, statusObj, res) {
        res.status(httpStatus.OK)
        .send({success: success, message: msg, status : statusObj, data: data});
    }
}

module.exports = new resHandler();