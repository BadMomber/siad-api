# siad-api

Sia daemon JavaScript API. 

It supports sync request and async watch to get siad daemon api information, it's awesome.

## Installation

`npm install sia-api`

## Usage Example

```
var Siad = require('siad-api');

var siad = new Siad({});
```

Arguments:

- `host` - Default `http://localhost:9980`
- `agent` - Default `Sia-Agent`
- `password` - Default `null`

```
var Siad = require('siad-api');

var siad = new Siad({
    host: 'http://localhost:9980',
    agent: 'I-Love-Sia'
    // other arguments
});
```

## Get Siad Daemon API Information

```
var consensusStatus = siad.consensus.status();
console.log(consensusStatus);
```

## Watch Example

### Start watching

```
siad.consensus.status.watch(function (error, consensusStatus) {
    if (error) {
    // do something
    }
    else {
        console.log(consensusStatus);
    }
})
```

### Stop watching

```
siad.daemon.version.stopWatching(function (error,msg){
    if (error) {
    // do something
    }
    else {
        console.log('Stop watching success.')
    }
})
```

Please see the [documentation](/doc/API.md) for detailed functions.
