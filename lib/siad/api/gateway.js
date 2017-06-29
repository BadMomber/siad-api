/**
 * @file gateway.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');
var errors = require('../errors');

function Gateway(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /gateway
    this.status = function () {
        return this.httprequest.normalGetSync('/gateway');
    };
    this.status.onMessage = function (error, messages) {
        self.status.callback(error, messages);
    };
    this.status.watch = function (callback) {
        self.status.pollId = Math.round(new Date().getTime() / 1000);
        self.status.callback = callback;
        self.httprequest.startPolling('/gateway', self.status.pollId, 'normalGetAsync', self.status.onMessage, self.status.stopWatching.bind(self));
    };
    this.status.stopWatching = function (callback) {
        self.status.callback = null;
        try {
            self.httprequest.stopPolling(self.status.pollId);
            callback(null, true);
        } catch(e) {
            callback(e, false);
        }
    };

    // API: /gateway/connect/:___netaddress___
    this.connect = function (netAddress) {
        if (!netAddress) {
            throw errors.InvalidParams();
        }
        return this.httprequest.noContentPostSync('/gateway/connect/' + netAddress);
    };

    // API: /gateway/disconnect/:___netaddress___
    this.disconnect = function (netAddress) {
        if (!netAddress) {
            throw errors.InvalidParams();
        }
        return this.httprequest.noContentPostSync('/gateway/disconnect/' + netAddress);
    };

}

module.exports = Gateway;
