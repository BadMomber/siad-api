/**
 * @file httprequest.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var XHR2 = require('xhr2');
var btoa = require('btoa');
var errors = require('./errors');

if (typeof window !== 'undefined' && window.XMLHttpRequest) {
    XMLHttpRequest = window.XMLHttpRequest; // jshint ignore: line
// node
} else {
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // jshint ignore: line
}

var HttpRequest = function (host, timeout, agent, password) {
    this.host = host;
    this.timeout = timeout || 0;
    this.agent = agent;
    this.password = password;
};

/**
 * Should be called to prepare new XMLHttpRequest
 *
 * @method prepareGet
 * @param {String} path
 * @param {Boolean} true if request should be async
 * @return {XMLHttpRequest} object
 */
HttpRequest.prototype.prepareGet = function (path, async) {
    var request;

    if (async) {
      request = new XHR2();
      request.timeout = this.timeout;
    }else {
      request = new XMLHttpRequest();
    }

    request.open('GET', this.host + path, async);
    if (this.password) {
        var value = 'Basic ' + btoa(this.password);
        request.setRequestHeader('Authorization', value);
    }
    request.setRequestHeader('User-Agent', this.agent);
    return request;
};

/**
 * Should be called to prepare new XMLHttpRequest
 *
 * @method preparePost
 * @param {String} path
 * @param {Boolean} true if request should be async
 * @return {XMLHttpRequest} object
 */
HttpRequest.prototype.preparePost = function (path, async) {
    var request;

    if (async) {
      request = new XHR2();
      request.timeout = this.timeout;
    }else {
      request = new XMLHttpRequest();
    }

    request.open('POST', this.host + path, async);
    if (this.password) {
        var value = 'Basic ' + btoa(this.user + ':' + this.password);
        request.setRequestHeader('Authorization', value);
    }
    request.setRequestHeader('User-Agent', this.agent);
    return request;
};

/**
 * Should be called to make sync request
 *
 * @method get
 * @param {String} path
 * @param {Object} payload
 * @return {Object} result
 */
HttpRequest.prototype.get = function (path, noContent) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var request = this.prepareGet(path, false);

    try {
        request.send();
        if (request.status == 0) {
            throw errors.InvalidConnection(this.host);
        }
    } catch(error) {
        throw errors.InvalidConnection(this.host);
    }

    var result;

    if (noContent) {
        if (request.status == 204) {
            result = '{"message": "command executed successful"}';
        }
    }
    else {
        result = request.responseText;
    }

    try {
        result = JSON.parse(result);
    } catch(e) {
        throw errors.InvalidResponse(result);
    }

    return result;
};

/**
 * Should be called to make sync request
 *
 * @method post
 * @param {String} path
 * @param {Object} payload
 * @return {Object} result
 */
HttpRequest.prototype.post = function (path, noContent, payload) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var request = this.preparePost(path, false);

    try {
        if (payload) {
            request.send(JSON.stringify(payload));
        }
        else {
            request.send();
        }

        if (request.status == 0) {
            throw errors.InvalidConnection(this.host);
        }
    } catch(error) {
        throw errors.InvalidConnection(this.host);
    }

    var result = request.responseText;

    try {
        result = JSON.parse(result);
    } catch(e) {
        throw errors.InvalidResponse(result);
    }

    return result;
};

module.exports = HttpRequest;
