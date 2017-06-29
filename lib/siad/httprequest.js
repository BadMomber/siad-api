/**
 * @file httprequest.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var requestSync = require('sync-request');
var requestAsync = require('then-request');
var btoa = require('btoa');
var errors = require('./errors');

/**
 * Default poll timeout is 500 ms
 */

var HttpRequest = function (host, agent, password) {
    this.host = host;
    this.agent = agent;
    this.password = password;

    this.polls = {};
    this.timeout = null;
};

/**
 * request normal json data sync, method: get.
 *
 * @method get
 * @param {String} path
 * @return {Object} result
 */
HttpRequest.prototype.normalGetSync = function (path) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;

    try {
        response = requestSync('GET', this.host + path, options);

        try {
            result = JSON.parse(response.body.toString('utf8'));
        } catch (e) {
            throw errors.InvalidJsonResponse();
        }
    } catch (e) {
        if (e.statusCode) {
            var message = JSON.parse(e.body.toString('utf8')).message;
            throw errors.ErrorMessage(message);
        }
        else {
            throw errors.InvalidConnection(this.host);
        }
    }

    return result;
};

/**
 * request without content (HTTP code 204) sync, method: get.
 *
 * @method get
 * @param {String} path
 * @return {Object} result
 */
HttpRequest.prototype.noContentGetSync = function (path) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;

    try {
        response = requestSync('GET', this.host + path, options);
        if (response.statusCode != 204) {
            result = JSON.parse(response.body.toString('utf8'));
        }
        else {
            if (path == '/daemon/stop' || path == '/miner/start' || path == '/miner/stop') {
                result = JSON.parse('{"message": "command executed success"}');
            }
            else {
                result = JSON.parse(response.body.toString('utf8'));
            }
        }
    } catch (e) {
        if (e.statusCode) {
            var message = JSON.parse(e.body.toString('utf8')).message;
            throw errors.ErrorMessage(message);
        }
        else {
            throw errors.InvalidConnection(this.host);
        }
    }

    return result;
};

/**
 * request raw data sync, method: get.
 *
 * @method get
 * @param {String} path
 * @return {Object} result
 */
HttpRequest.prototype.rawDataGetSync = function (path) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;

    try {
        response = requestSync('GET', this.host + path, options);
        result = response.getBody();
    } catch (e) {
        if (e.statusCode) {
            var message = JSON.parse(e.body.toString('utf8')).message;
            throw errors.ErrorMessage(message);
        }
        else {
            throw errors.InvalidConnection(this.host);
        }
    }

    return result;
};

/**
 * request normal json data async, method: get.
 *
 * @method get
 * @param {String} path
 * @param {Function} callback
 * @return {Object} result
 */

HttpRequest.prototype.normalGetAsync = function (path, callback) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;
    var self = this;

    requestAsync('GET', this.host + path, options)
        .done(function (response) {
            result = JSON.parse(response.body.toString('utf8'));
            callback(null, result);
        },function (e) {
            var error, message;
            if (e.statusCode) {
                error = 'Siad daemon api return error message.'
                message = JSON.parse(e.body.toString('utf8')).message;
                callback(error, message);
            }
            else {
                message = 'Connection error. Couldn\'t connect to sia daemon: ' + self.host;
                callback(e, message);
            }
        }
    );
};

/**
 * request without content (HTTP code 204) async, method: get.
 *
 * @method get
 * @param {String} path
 * @param {Function} callback
 * @return {Object} result
 */

HttpRequest.prototype.noContentGetAsync = function (path, callback) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;
    var self = this;

    requestAsync('GET', this.host + path, options)
        .done(function (response) {
            result = JSON.parse('{"message": "command executed success"}');
            callback(null, result);
        },function (e) {
            var error, message;
            if (e.statusCode) {
                error = 'Siad daemon api return error message.'
                message = JSON.parse(e.body.toString('utf8')).message;
                callback(error, message);
            }
            else {
                message = 'Connection error. Couldn\'t connect to sia daemon: ' + self.host;
                callback(e, message);
            }
        }
    );
};

/**
 * request raw data async, method: get.
 *
 * @method get
 * @param {String} path
 * @param {Function} callback
 * @return {Object} result
 */

HttpRequest.prototype.rawDataGetAsync = function (path, callback) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;
    var self = this;

    requestAsync('GET', this.host + path, options)
        .done(function (response) {
            result = response.getBody();
            callback(null, result);
        },function (e) {
            var error, message;
            if (e.statusCode) {
                error = 'Siad daemon api return error message.'
                message = JSON.parse(e.body.toString('utf8')).message;
                callback(error, message);
            }
            else {
                message = 'Connection error. Couldn\'t connect to sia daemon: ' + self.host;
                callback(e, message);
            }
        }
    );
};

/**
 * request normal json data sync, method: post.
 *
 * @method post
 * @param {String} path
 * @param {Object} payload
 * @return {Object} result
 */
HttpRequest.prototype.normalPostSync = function (path, payload) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;

    try {
        response = requestSync('POST', this.host + path, options);

        try {
            result = JSON.parse(response.body.toString('utf8'));
        } catch (e) {
            throw errors.InvalidJsonResponse();
        }
    } catch (e) {
        if (e.statusCode) {
            var message = JSON.parse(e.body.toString('utf8')).message;
            throw errors.ErrorMessage(message);
        }
        else {
            throw errors.InvalidConnection(this.host);
        }
    }

    return result;
};

/**
 * request without content (HTTP code 204) sync, method: post.
 *
 * @method post
 * @param {String} path
 * @param {Object} payload
 * @return {Object} result
 */
HttpRequest.prototype.noContentPostSync = function (path, payload) {
    if (!path) {
        throw errors.InvalidParams();
    }

    var options = {
        'headers': {
            'User-Agent': this.agent
        }
    };

    if (this.password) {
        var value = 'Basic ' + btoa(':' + this.password);
        options['headers']['Authorization'] = value;
    }

    var response, result;

    try {
        response = requestSync('POST', this.host + path, options);
        try {
            result = JSON.parse(response.body.toString('utf8'));
        } catch (e) {
            throw errors.InvalidJsonResponse();
        }
    } catch (e) {
        if (e.statusCode) {
            var message = JSON.parse(e.body.toString('utf8')).message;
            throw errors.ErrorMessage(message);
        }
        else {
            throw errors.InvalidConnection(this.host);
        }
    }

    return result;
};

/**
 * Should be used to start polling
 *
 * @method startPolling
 * @param {String} path
 * @param {Number} pollId
 * @param {Function} callback
 * @param {Function} uninstall
 *
 * @todo cleanup number of params
 */
HttpRequest.prototype.startPolling = function (path, pollId, getType, callback, uninstall) {
    this.polls[pollId] = {path: path, id: pollId, callback: callback, uninstall: uninstall};

    // start polling
    if (!this.timeout) {
        this.poll(pollId, getType);
    }
};

/**
 * Should be used to stop polling for filter with given id
 *
 * @method stopPolling
 * @param {Number} pollId
 */
HttpRequest.prototype.stopPolling = function (pollId) {
    delete this.polls[pollId];

    // stop polling
    if(Object.keys(this.polls).length === 0 && this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};

/**
 * Should be called to reset the polling mechanism of the request manager
 *
 * @method reset
 */
HttpRequest.prototype.reset = function (keepIsSyncing) {
    /*jshint maxcomplexity:5 */

    for (var key in this.polls) {
        // remove all polls, except sync polls,
        // they need to be removed manually by calling syncing.stopWatching()
        if(!keepIsSyncing || key.indexOf('syncPoll_') === -1) {
            this.polls[key].uninstall();
            delete this.polls[key];
        }
    }

    // stop polling
    if(Object.keys(this.polls).length === 0 && this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};

/**
 * Should be called to poll for changes on filter with given id
 *
 * @method poll
 * @param {Number} pollId
 */
HttpRequest.prototype.poll = function (pollId, getType) {
    /*jshint maxcomplexity: 6 */
    this.timeout = setTimeout(this.poll.bind(this, pollId, getType), 1000/2);

    if (Object.keys(this.polls).length === 0) {
        return;
    }

    if (!this.polls[pollId]) {
        return;
    }

    var self = this;

    if (getType == 'normalGetAsync') {
        this.normalGetAsync(self.polls[pollId].path, function (error, results) {
            if (self.polls[pollId]) {
                var callback = self.polls[pollId].callback;
                callback(error, results);
            }
        });
    }

    if (getType == 'noContentGetAsync') {
        this.noContentGetAsync(self.polls[pollId].path, function (error, results) {
            if (self.polls[pollId]) {
                var callback = self.polls[pollId].callback;
                callback(error, results);
            }
        });
    }

    if (getType == 'rawDataGetAsync') {
        this.rawDataGetAsync(self.polls[pollId].path, function (error, results) {
            if (self.polls[pollId]) {
                var callback = self.polls[pollId].callback;
                callback(error, results);
            }
        });
    }

};

module.exports = HttpRequest;
