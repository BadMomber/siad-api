/**
 * @file tpool.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function TransactionPool(siad) {
    this.httprequest = new HttpRequest(siad._host, siad._timeout, siad._agent, siad._password);
}

TransactionPool.prototype.fee = function () {
    return this.httprequest.get('/tpool/fee');
};

// TODO
TransactionPool.prototype.raw = function () {
    return this.httprequest.get('/tpool/raw');
};

module.exports = TransactionPool;
