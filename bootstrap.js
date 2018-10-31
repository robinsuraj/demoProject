/**
 * Created by Suraj on 30/10/18.
 * bootstraping files for global use
 */

global.rootRequire = function (name) {
    return require(__dirname + "/" + name);
}

/**
 * __base for getting application base folder
 */

global.__base = __dirname + "/";

/**
 * _config for global config
 */

global._config = rootRequire('config/config');

/**
 * _log for logging
 */
global._log = require('debug')('log');
