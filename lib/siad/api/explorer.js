/**
 * @file explorer.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.7.2
 */

var HttpRequest = require('../httprequest');

function Explorer(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /explorer
    this.status = function () {
        return this.httprequest.normalGetSync('/explorer');
    };
    this.status.onMessage = function (error, messages) {
        self.status.callback(error, messages);
    };
    this.status.watch = function (callback) {
        self.status.pollId = Math.round(new Date().getTime() / 1000);
        self.status.callback = callback;
        self.httprequest.startPolling('/explorer', self.status.pollId, 'normalGetAsync', self.status.onMessage, self.status.stopWatching.bind(self));
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

    // API: /explorer/blocks/:height
    this.blocks = function (height) {
        return this.httprequest.normalGetSync('/explorer/blocks/' + height);
    };

    // API: /explorer/hashes/:hash
    this.hashes = function (hash) {
        return this.httprequest.normalGetSync('/explorer/hashes/' + hash);
    };
}

module.exports = Explorer;
