# siad-js-api
Sia daemon JavaScript API.

## Installation

`npm install sia-js-api`

## Usage Example

```
var Siad = require('siad-js-api');

var siad = new Siad({});
```

Arguments:

- `host` - Default `http://localhost:9980`
- `agent` - Default `Sia-Agent`
- `password` - Default `null`

```
var Siad = require('siad-js-api');

var siad = new Siad({
    host: 'http://localhost:9980',
    agent: 'I-Love-Sia'
    // other constructor arguments
});
```
