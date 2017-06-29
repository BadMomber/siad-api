/**
 * @file consensus.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Consensus(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /consensus
    this.status = function () {
        return this.httprequest.normalGetSync('/consensus');
    };
    this.status.onMessage = function (error, messages) {
        self.status.callback(error, messages);
    };
    this.status.watch = function (callback) {
        self.status.pollId = Math.round(new Date().getTime() / 1000);
        self.status.callback = callback;
        self.httprequest.startPolling('/consensus', self.status.pollId, 'normalGetAsync', self.status.onMessage, self.status.stopWatching.bind(self));
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

    // API: /daemon/stop TODO
    this.validateTransactionset = function () {
        return this.httprequest.post('/consensus/validate/transactionset', {});
    };
}

module.exports = Consensus;
