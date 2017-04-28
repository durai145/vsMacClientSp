'use strict';

module.exports = function Validation(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
  this.httpRespCode = 501;
};

require('util').inherits(module.exports, Error);
