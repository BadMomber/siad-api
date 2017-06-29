/**
 * @file hostdb.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function HostDb(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    this.active = function (numHosts) {
        if (numHosts) {
            return this.httprequest.normalGetSync('/hostdb/active?numhosts=' + numHosts);
        }
        return this.httprequest.normalGetSync('/hostdb/active');
    };

    this.all = function () {
        return this.httprequest.normalGetSync('/hostdb/all');
    };

    this.hosts = function (pubKey) {
        return this.httprequest.normalGetSync('/hostdb/hosts/' + pubKey);
    };
}

module.exports = HostDb;
