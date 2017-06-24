/**
 * @file daemon.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');
var noContent = true;

function Daemon(siad) {
    this.httprequest = new HttpRequest(siad._host, siad._timeout, siad._agent, siad._password);
}

Daemon.prototype.constants = function () {
    return this.httprequest.get('/daemon/constants');
};

Daemon.prototype.stop = function () {
    return this.httprequest.get('/daemon/stop', noContent);
};

Daemon.prototype.version = function () {
    return this.httprequest.get('/daemon/version');
};

module.exports = Daemon;
