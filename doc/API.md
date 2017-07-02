Sia daemon JavaScript API documentation.
========

Any questions about siad API usage, please refer to the [official documentation](https://github.com/NebulousLabs/Sia/blob/master/doc/API.md).

Special API
-----------

| Function Usage     | Support Watch |
| ------------------ | ------------- |
| siad.version()     | False         |
| siad.isConnected() | False         |
| siad.isSynced()    | False         |

Table of contents
-----------------

- [Daemon](#daemon)
- [Consensus](#consensus)
- [Gateway](#gateway)
- [Host](#host)
- [Host DB](#host-db)
- [Miner](#miner)
- [Renter](#renter)
- [Transaction Pool](#transaction-pool)
- [Wallet](#wallet)

Daemon
------

| Route             | HTTP verb | Function Usage          | Support Watch |
| ----------------- | --------- | ----------------------- | ------------- |
| /daemon/constants | GET       | siad.daemon.constants() | True          |
| /daemon/stop      | GET       | siad.daemon.stop()      | False         |
| /daemon/version   | GET       | siad.daemon.version()   | True          |

Gateway
-------

| Route                                 | HTTP verb | Function Usage                   | Support Watch |
| ------------------------------------- | --------- |--------------------------------- | ------------- |
| /gateway                              | GET       | siad.gateway.status()            | True          |
| /gateway/connect/:___netaddress___    | POST      | siad.gateway.connect(ip:port)    | False         |
| /gateway/disconnect/:___netaddress___ | POST      | siad.gateway.disconnect(ip:port) | False         |

Host
----

| Route                                          | HTTP verb | Function Usage            | Support Watch |
| ---------------------------------------------- | --------- |-------------------------- | ------------- |
| /host                                          | GET       | siad.host.status()        | True          |
| /host                                          | POST      |
| /host/announce                                 | POST      | siad.host.announce()      | False         |
| /host/estimatescore                            | GET       | siad.host.estimateScore() | False         |
| /host/storage                                  | GET       | siad.host.storageStatus() | False         |
| /host/storage/folders/add                      | POST      |
| /host/storage/folders/remove                   | POST      |
| /host/storage/folders/resize                   | POST      |
| /host/storage/sectors/delete/:___merkleroot___ | POST      |

Host DB
-------

| Route                       | HTTP verb | Function Usage            | Support Watch |
| --------------------------- | --------- |-------------------------- | ------------- |
| /hostdb/active              | GET       | siad.hostdb.active()      | False         |
| /hostdb/all                 | GET       | siad.hostdb.all()         | False         |
| /hostdb/hosts/:___pubkey___ | GET       | siad.hostdb.hosts(pubKey) | False         |

Miner
-----

| Route         | HTTP verb | Function Usage                | Support Watch |
| ------------- | --------- |------------------------------ | ------------- |
| /miner        | GET       | siad.miner.status()           | True          |
| /miner/start  | GET       | siad.miner.start()            | False         |
| /miner/stop   | GET       | siad.miner.stop()             | False         |
| /miner/header | GET       | siad.miner.header()           | True          |
| /miner/header | POST      | 

Renter
------

| Route                                | HTTP verb | Function Usage          | Support Watch |
| ------------------------------------ | --------- |------------------------------------ | ------------- |
| /renter                              | GET       |
| /renter                              | POST      |
| /renter/contracts                    | GET       |
| /renter/downloads                    | GET       |
| /renter/prices                       | GET       |
| /renter/files                        | GET       |
| /renter/delete/*___siapath___        | POST      |
| /renter/download/*___siapath___      | GET       |
| /renter/downloadasync/*___siapath___ | GET       |
| /renter/rename/*___siapath___        | POST      |
| /renter/upload/*___siapath___        | POST      |

Transaction Pool
------

| Route          | HTTP verb | Function Usage                           | Support Watch |
| -------------- | --------- |----------------------------------------- | ------------- |
| /tpool/fee     | GET       | siad.tpool.fee()                         | False         |
| /tpool/raw/:id | GET       | siad.tpool.getRaw(id)                    | False         |
| /tpool/raw     | POST      | 

Wallet
------

| Route                              | HTTP verb | Function Usage          | Support Watch |
| ---------------------------------- | --------- |------------------------------------ | ------------- |
| /wallet                            | GET       |
| /wallet/033x                       | POST      |
| /wallet/address                    | GET       |
| /wallet/addresses                  | GET       |
| /wallet/backup                     | GET       |
| /wallet/init                       | POST      |
| /wallet/init/seed                  | POST      |
| /wallet/lock                       | POST      |
| /wallet/seed                       | POST      |
| /wallet/seeds                      | GET       |
| /wallet/siacoins                   | POST      |
| /wallet/siafunds                   | POST      |
| /wallet/siagkey                    | POST      |
| /wallet/sweep/seed                 | POST      |
| /wallet/transaction/:___id___      | GET       |
| /wallet/transactions               | GET       |
| /wallet/transactions/:___addr___   | GET       |
| /wallet/unlock                     | POST      |
| /wallet/verify/address/:___addr___ | GET       |
| /wallet/changepassword             | POST      |

Explorer
--------

| Route                          | HTTP verb | Function Usage               | Support Watch |
| ------------------------------ | --------- |----------------------------- | ------------- |
| /explorer                      | GET       | siad.explorer.status()       | True          |
| /explorer/blocks/:___height___ | GET       | siad.explorer.blocks(height) | False         |
| /explorer/hashes/:___hash___   | GET       | siad.explorer.hashes(hash)   | False         |

