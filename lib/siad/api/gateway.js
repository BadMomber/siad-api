/**
 * @file gateway.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Gateway(siad) {
    this.httprequest = new HttpRequest(siad._host, siad._timeout, siad._agent, siad._password);
}

Gateway.prototype.status = function () {
    return this.httprequest.get('/gateway');
};

Gateway.prototype.connect = function (netAddress) {
    return this.httprequest.post('/gateway/connect/' + netAddress);
};

Gateway.prototype.disconnect = function (netAddress) {
    return this.httprequest.post('/gateway/disconnect/' + netAddress);
};

module.exports = Gateway;
