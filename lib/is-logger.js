const _ = require('lodash');
const ExpandableError = require('es6-error');


/* istanbul ignore next */
class NotALoggerError extends ExpandableError {
  /* istanbul ignore next */
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
 * Log a message.
 *
 * @param fn {Function} - Used function to log.
 * @param args {args} - The arguments to log.
 * @returns {*}
 * @private
 */

/* istanbul ignore next */
function log(fn, debug = false, message) {
  if (debug === true) {
    return fn(message);
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

/* istanbul ignore next */
function info(debug = false, message) {
  return log(console.log, debug, message); // eslint-disable-line no-console
}

/**
 * Log an error.
 *
 * @param args - The arguments.
 * @returns {*}
 * @private
 */

/* istanbul ignore next */
function error(debug = false, message) {
  return log(console.error, debug, message); // eslint-disable-line no-console
}


/**
 * Check if the provided value in parameter is or not a logger.
 *
 * @param logger {Object} - The logger to validate.
 * @param options {Object} -
 * @returns {boolean} - true if the provided value seems a valid logger; false else.
 */
function isALogger(logger, options = {debug: false, throwOnFalse: false}) {
  let {debug} = options;
  const {throwOnFalse} = options;
  if ((debug === true) || (debug === 1)) {
    debug = true;
  }
  if (!logger) {
    error(debug, '[ERROR] Undefined logger');
    if (throwOnFalse === true) {
      throw new NotALoggerError('Undefined logger');
    }
    return false;
  }

  for (let i = 0; i < LOGGER_METHODS.length; i += 1) {
    const method = LOGGER_METHODS[i];
    info(debug, `[INFO] Test if (logger: ${logger.toString()} contains a (method: ${method})`);
    if (!(logger[method] && _.isFunction(logger[method]))) {
      error(debug, `[ERROR] Provided (logger: ${logger.toString()} does not contain a (method: ${method})`);
      if (throwOnFalse === true) {
        throw new NotALoggerError(`Provided (logger: ?} does not contain a (method: ${method})`);
      } else {
        return false;
      }
    }
  }
  return true;
}

/** @module IsALogger */
/* istanbul ignore next */
module.exports = isALogger;
