var env = process.env.ENV || 'local';
require('dotenv').config({ path: __base + 'envs/.env.'+env });

var config = {
    env: env ,
    dbUrl: process.env.MONGODB_URL,
    secreteKey: 'Suraj',
}; 

module.exports = config;
