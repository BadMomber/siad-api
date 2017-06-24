var Siad = require('./lib/siad');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Siad === 'undefined') {
    window.Siad = Siad;
}

module.exports = Siad;