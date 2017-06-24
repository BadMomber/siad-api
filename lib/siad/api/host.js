/**
 * @file host.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Host(siad) {
    this.httprequest = new HttpRequest(siad._host, siad._timeout, siad._agent, siad._password);
}
// TODO
Host.prototype.status = function () {
    return this.httprequest.get('/host');
};

module.exports = Host;
