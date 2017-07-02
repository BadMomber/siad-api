/**
 * @file explorer.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.7.2
 */

var HttpRequest = require('../httprequest');

function Explorer(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);

    // API: /explorer/blocks/:height
    this.blocks = function (height) {
        return this.httprequest.normalGetSync('/explorer/blocks/' + height);
    };

    // API: /explorer/hashes/:hash
    this.hashes = function (hash) {
        return this.httprequest.normalGetSync('/explorer/hashes/' + hash);
    };
}

module.exports = Explorer;
