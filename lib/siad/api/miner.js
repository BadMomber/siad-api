/**
 * @file miner.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');
var noContent = true;

function Miner(siad) {
    this.httprequest = new HttpRequest(siad._host, siad._timeout, siad._agent, siad._password);
}

Miner.prototype.status = function () {
    return this.httprequest.get('/miner');
};

Miner.prototype.start = function () {
    return this.httprequest.get('/miner/start', noContent);
};

Miner.prototype.stop = function () {
    return this.httprequest.get('/miner/stop', noContent);
};
//TODO
Miner.prototype.header = function () {
    return this.httprequest.get('/miner/header');
};

module.exports = Miner;
