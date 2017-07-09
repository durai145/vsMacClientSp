var quotedPrintable = require('quoted-printable');
var utf8 = require('utf8');

console.log(utf8.decode(quotedPrintable.decode('foo=3Dbar')));
