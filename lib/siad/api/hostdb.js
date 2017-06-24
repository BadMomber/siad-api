/**
 * @file hostdb.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function HostDb(siad) {
    this.httprequest = new HttpRequest(siad._host, siad._timeout, siad._agent, siad._password);
}

HostDb.prototype.active = function (numHosts) {
    if (numHosts) {
        return this.httprequest.get('/hostdb/active?numhosts=' + numHosts);
    }
    return this.httprequest.get('/hostdb/active');
};

HostDb.prototype.all = function () {
    return this.httprequest.get('/hostdb/all');
};

HostDb.prototype.hosts = function (pubKey) {
    return this.httprequest.get('/hostdb/hosts/' + pubKey);
};

module.exports = HostDb;
