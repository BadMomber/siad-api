/**
 * @file wallet.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var HttpRequest = require('../httprequest');

function Wallet(siad) {
    var self = this;
    this.httprequest = new HttpRequest(siad._host, siad._agent, siad._password);
}

Wallet.prototype.status = function () {
    return this.httprequest.normalGetSync('/wallet');
};

Wallet.prototype.address = function () {
    return this.httprequest.normalGetSync('/wallet/address');
};

Wallet.prototype.addresses = function () {
    return this.httprequest.normalGetSync('/wallet/addresses');
};

Wallet.prototype.backup = function (destination) {
    return this.httprequest.noContentGetSync('/wallet/backup?destination=' + destination, noContent);
};

Wallet.prototype.init = function (encryptionPassword, dictionary, force) {
    encryptionPassword = encryptionPassword || '';
    dictionary = dictionary || 'english';
    force = force || false;
    var payload = {
        'encryptionPassword': encryptionPassword,
        'dictionary': dictionary,
        'force': force
    };
    console.log(payload);
    return this.httprequest.post('/wallet/init');
};

// TODO

module.exports = Wallet;
