/**
 * @file tpool.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function TransactionPool(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /tpool/fee
    this.fee = function () {
        return this.httprequest.normalGetSync('/tpool/fee');
    };

    // API: /tpool/raw/:id
    this.getRaw = function (id) {
        return this.httprequest.normalGetSync('/tpool/raw/' + id);
    };

    // API: /tpool/raw TODO
    this.postRaw = function (parents, transaction) {
        
    };
}

module.exports = TransactionPool;
