/**
 * @file consensus.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Consensus(siad) {
    this.httprequest = new HttpRequest(siad._host, siad._timeout, siad._agent, siad._password);
}

Consensus.prototype.status = function () {
    return this.httprequest.get('/consensus');
};

// TODO
Consensus.prototype.validateTransactionset = function () {
    return this.httprequest.post('/consensus/validate/transactionset', {});
};

module.exports = Consensus;
