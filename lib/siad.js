/**
 * @file siad.js
 * @author TimonPeng <timonminipeng@gmail.com>
 * @date 2017.6.24
 */

var Daemon = require('./siad/api/daemon');
var Consensus = require('./siad/api/consensus');
var Gateway = require('./siad/api/gateway');
var Host = require('./siad/api/host');
var HostDb = require('./siad/api/hostdb');
var Miner = require('./siad/api/miner');
var Renter = require('./siad/api/renter');
var TransactionPool = require('./siad/api/tpool');
var Wallet = require('./siad/api/wallet');
var Explorer = require('./siad/api/explorer');
var Version = require('./version.json');

function Siad(config) {
    this._host = config.host || 'http://localhost:9980';
    this._agent = config.agent || 'Sia-Agent';
    this._password = config.password || null;

    this.daemon = new Daemon(this);
    this.consensus = new Consensus(this);
    this.gateway = new Gateway(this);
    this.host = new Host(this);
    this.hostdb = new HostDb(this);
    this.miner = new Miner(this);
    this.renter = new Renter(this);
    this.tpool = new TransactionPool(this);
    this.wallet = new Wallet(this);
    this.explorer = new Explorer(this);

    this.version = Version.version;

    this.isConnected = function(){
        if (this.gateway.status().netaddress) {
            return true;
        }
        return false;
    };

    this.isSynced = function(){
        return this.consensus.status().synced;
    };
}

module.exports = Siad;
