/** 
 * @file errors.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

module.exports = {
    InvalidParams: function () {
        return new Error('Invalid param. Please check the documentation.');
    },
    InvalidConnection: function (host){
        return new Error('CONNECTION ERROR: Couldn\'t connect to sia daemon '+ host +'.');
    },
    InvalidProvider: function () {
        return new Error('Provider not set or invalid');
    },
    InvalidResponse: function (result){
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : 'Invalid JSON RPC response: ' + JSON.stringify(result);
        return new Error(message);
    },
    ConnectionTimeout: function (ms){
        return new Error('CONNECTION TIMEOUT: timeout of ' + ms + ' ms achived');
    }
};