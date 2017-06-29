/**
 * @file miner.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Miner(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /miner
    this.status = function () {
        return this.httprequest.normalGetSync('/miner');
    };
    this.status.onMessage = function (error, messages) {
        self.status.callback(error, messages);
    };
    this.status.watch = function (callback) {
        self.status.pollId = Math.round(new Date().getTime() / 1000);
        self.status.callback = callback;
        self.httprequest.startPolling('/miner', self.status.pollId, 'normalGetAsync', self.status.onMessage, self.status.stopWatching.bind(self));
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

    // API: /miner/start
    this.start = function () {
        return this.httprequest.noContentGetSync('/miner/start');
    };

    // API: /miner/stop
    this.stop = function () {
        return this.httprequest.noContentGetSync('/miner/stop');
    };

    // API: /miner/header TODO POST
    this.header = function (minedBlock) {
        if (!minedBlock) {
            return this.httprequest.rawDataGetSync('/miner/header');
        }
        else {
            
        }
    };
    this.header.onMessage = function (error, messages) {
        self.header.callback(error, messages);
    };
    this.header.watch = function (callback) {
        self.header.pollId = Math.round(new Date().getTime() / 1000);
        self.header.callback = callback;
        self.httprequest.startPolling('/miner/header', self.header.pollId, 'rawDataGetAsync', self.header.onMessage, self.header.stopWatching.bind(self));
    };
    this.header.stopWatching = function (callback) {
        self.header.callback = null;
        try {
            self.httprequest.stopPolling(self.header.pollId);
            callback(null, true);
        } catch(e) {
            callback(e, false);
        }
    };
}

module.exports = Miner;
