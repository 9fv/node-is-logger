/**
 * @module isALogger
 */

const _ = require('lodash');

/**
 * Trace methods searched in the object.
 *
 * @type {string[]}
 * @private
 */
const _LOGGER_METHODS = ['debug', 'warn', 'info', 'error'];

/**
 * Enable debug if true.
 *
 * @type {boolean}
 */
let debugEnabled = false;

/**
 * Log a message.
 *
 * @param fn {Function} - Used function to log.
 * @param args {args} - The arguments to log.
 * @returns {*}
 * @private
 */
function _log(fn, ...args) {
  if (debugEnabled === true) {
    return fn(...args);
  }
}

/**
 * Log a debug message
 *
 * @param args - The arguments to log.
 * @returns {*}
 * @private
 */
function _debug(...args) {
  return _log(console.log, ...args);
}

/**
 * Log an error.
 *
 * @param args - The arguments.
 * @returns {*}
 * @private
 */
function _error(...args) {
  return _log(console.error, ...args);
}

/**
 * Check if the provided value in parameter is or not a logger.
 *
 * @param logger {Object} - The logger to validate.
 * @param options {Object} -
 * @returns {boolean} - true if the provided value seems a valid logger; false else.
 */
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

