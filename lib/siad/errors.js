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
        return new Error('Connection error: Couldn\'t connect to sia daemon ' + host + '.');
    },
    InvalidJsonResponse: function (){
        return new Error('Invalid JSON response.');
    },
    ErrorMessage: function (msg){
        return new Error('Siad daemon api return error message: ' + msg + '.');
    }

};