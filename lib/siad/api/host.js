/**
 * @file host.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Host(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /host
    this.status = function () {
        return this.httprequest.normalGetSync('/host');
    };
    this.status.onMessage = function (error, messages) {
        self.status.callback(error, messages);
    };
    this.status.watch = function (callback) {
        self.status.pollId = Math.round(new Date().getTime() / 1000);
        self.status.callback = callback;
        self.httprequest.startPolling('/host', self.status.pollId, 'normalGetAsync', self.status.onMessage, self.status.stopWatching.bind(self));
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

    // API: /host/announce
    this.announce = function (netAddress) {
        return this.httprequest.noContentPostSync('/host/announce');
    };

    // API: /host/estimatescore
    this.estimateScore = function () {
        return this.httprequest.normalGetSync('/host/estimatescore');
    };

    // API: /host/storage
    this.storageStatus = function () {
        return this.httprequest.normalGetSync('/host/storage');
    };
}

module.exports = Host;
