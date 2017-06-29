/**
 * @file daemon.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Daemon(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /daemon/constants
    this.constants = function () {
        return this.httprequest.normalGetSync('/daemon/constants');
    };
    this.constants.onMessage = function (error, messages) {
        self.constants.callback(error, messages);
    };
    this.constants.watch = function (callback) {
        self.constants.pollId = Math.round(new Date().getTime() / 1000);
        self.constants.callback = callback;
        self.httprequest.startPolling('/daemon/constants', self.constants.pollId, 'normalGetAsync', self.constants.onMessage, self.constants.stopWatching.bind(self));
    };
    this.constants.stopWatching = function (callback) {
        self.constants.callback = null;
        try {
            self.httprequest.stopPolling(self.constants.pollId);
            callback(null, true);
        } catch(e) {
            callback(e, false);
        }
    };

    // API: /daemon/stop
    this.stop = function () {
        return this.httprequest.noContentGetSync('/daemon/stop');
    };

    // API: /daemon/version
    this.version = function () {
        return this.httprequest.normalGetSync('/daemon/version');
    };
        this.version.onMessage = function (error, messages) {
        self.version.callback(error, messages);
    };
    this.version.watch = function (callback) {
        self.version.pollId = Math.round(new Date().getTime() / 1000);
        self.version.callback = callback;
        self.httprequest.startPolling('/daemon/version', self.version.pollId, 'normalGetAsync', self.version.onMessage, self.version.stopWatching.bind(self));
    };
    this.version.stopWatching = function (callback) {
        self.version.callback = null;
        try {
            self.httprequest.stopPolling(self.version.pollId);
            callback(null, true);
        } catch(e) {
            callback(e, false);
        }
    };
}

module.exports = Daemon;
