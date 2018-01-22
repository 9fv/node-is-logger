/* eslint-disable prefer-destructuring */
const _ = require('lodash');
const ExpandableError = require('es6-error');


class NotALoggerError extends ExpandableError {
  constructor(message) {
    super(`NotALoggerError: ${message}`);
  }
}

/**
 * Trace methods searched in the object.
 *
 * @type {string[]}
 * @private
 */
const LOGGER_METHODS = ['debug', 'warn', 'info', 'error'];

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
function log(fn, ...args) {
  if (debugEnabled === true) {
    return fn(...args);
  }
  return null;
}

/**
 * Log a debug message
 *
 * @param args - The arguments to log.
 * @returns {*}
 * @private
 */
function debug(...args) {
  return log(console.log, ...args); // eslint-disable-line no-console
}

/**
 * Log an error.
 *
 * @param args - The arguments.
 * @returns {*}
 * @private
 */
function error(...args) {
  return log(console.error, ...args); // eslint-disable-line no-console
}


/**
 * Check if the provided value in parameter is or not a logger.
 *
 * @param logger {Object} - The logger to validate.
 * @param options {Object} -
 * @returns {boolean} - true if the provided value seems a valid logger; false else.
 */
function isALogger(logger, options = {debug: false, throwOnFalse: false}) {
  let {local: throwOnFalse} = {boolean: false};
  if (options && (options.debug) && ((options.debug === true) || (options.debug === 1))) {
    debugEnabled = true;
  }
  if (options && (options.throwOnFalse)) {
    throwOnFalse = options.throwOnFalse;
  }

  if (!logger) {
    error('[ERROR] Undefined logger');
    if (throwOnFalse === true) {
      throw new NotALoggerError('Undefined logger');
    }
    return false;
  }

  for (let i = 0; i < LOGGER_METHODS.length; i += 1) {
    const method = LOGGER_METHODS[i];
    debug(`[DEBUG] Test if (logger: ${logger.toString()} contains a (method: ${method})`);
    if (!(logger[method] && _.isFunction(logger[method]))) {
      error(`[ERROR] Provided (logger: ${logger.toString()} does not contain a (method: ${method})`);
      if (throwOnFalse === true) {
        throw new NotALoggerError(`Provided (logger: ${logger.toString()} does not contain a (method: ${method})`);
      }
      return false;
    }
  }
  return true;
}

/** @module IsALogger */
module.exports = isALogger;
