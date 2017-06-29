/**
 * @file renter.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Renter(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);
}
// TODO
Renter.prototype.status = function () {
    return this.httprequest.normalGetSync('/renter');
};

module.exports = Renter;
