const _ = require('lodash');

const _LOGGER_METHODS = ['debug', 'warn', 'info', 'error'];

let debugEnabled = false;

function _trace(fn, ...args) {
  if (debugEnabled === true) {
    return fn(...args);
  }
}

function _debug(...args) {
  return _trace(console.log, ...args);
}

function _error(...args) {
  return _trace(console.error, ...args);
}


function isALogger(logger, options={}) {
  if ((options.debug) && ((options.debug === true) || (options.debug === 1))) {
    debugEnabled = true;
  }

  if (!logger) {
    _error(`[ERROR] Provided logger is undefined`);
    return false;
  }

  for (let i = 0; i < _LOGGER_METHODS.length; i++) {
    const method = _LOGGER_METHODS[i];
    _debug(`[DEBUG] Test if (logger: ${logger.toString()} contains a (method: ${method})`);
    if (!(logger[method] && _.isFunction(logger[method]))) {
      _error(`[ERROR] Provided (logger: ${logger.toString()} does not contain a (method: ${method})`)
      return false;
    }
  }
  return true;
}

module.exports = isALogger;

