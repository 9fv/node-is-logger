/* eslint-env node, mocha */

const should = require('should'); // eslint-disable-line no-unused-vars

const bunyan = require('bunyan');
const winston = require('winston');

const isLogger = require('../lib/is-logger');


/**
 * Before each unit test.
 */
beforeEach(() => {
  // A simple Bunyan logger.
  this.bunyanLogger = bunyan.createLogger({name: 'BunyanLoggerTest'});
  // A simple Winston (v2.4.0) logger.
  this.winstonLogger = new winston.Logger();
  // The default logger of Winston.
  this.winstonDefaultLogger = winston;
  // An invalid logger.
  this.invalidLogger = {fn: x => x * 2};
});


/**
 * Base unit tests.
 */
describe('Unit testing for [Function=isLogger]', () => {
  it('should be a function', () => {
    (isLogger).should.be.a.Function();
  });

  it('should return a boolean', () => {
    (isLogger(null)).should.be.a.Boolean();
  });

  it('should return a boolean if (options.debug=true)', () => {
    (isLogger(null, {debug: true})).should.be.a.Boolean();
  });

  it('should return false if none logger is provided', () => {
    (isLogger(null)).should.be.a.Boolean().which.is.False();
  });

  it('should return false if none logger is provided and (options.debug=true)', () => {
    (isLogger(null, {debug: true})).should.be.a.Boolean().which.is.False();
  });

  it('should return true if a valid logger is provided', () => {
    (isLogger(this.bunyanLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return true if a valid logger is provided and (options.debug=true)', () => {
    (isLogger(this.bunyanLogger, {debug: true})).should.be.a.Boolean().which.is.True();
  });

  it('should return false if an invalid logger is provided', () => {
    (isLogger(this.invalidLogger)).should.be.a.Boolean().which.is.False();
  });

  it('should return false if an invalid logger is provided and (options.debug=true)', () => {
    (isLogger(this.invalidLogger, {debug: true})).should.be.a.Boolean().which.is.False();
  });
});

/**
 * Unit tests for a Bunyan logger.
 */
describe('Unit testing for [Function=isLogger] using a Bunyan logger', () => {
  it('should return a boolean', () => {
    (isLogger(this.bunyanLogger)).should.be.a.Boolean();
  });

  it('should return true when a Bunyan logger is provided', () => {
    (isLogger(this.bunyanLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return false when the Bunyan module is provided', () => {
    (isLogger(bunyan)).should.be.a.Boolean().which.is.False();
  });

  it('should throw if the Bunyan module is provided', () => {
    (() => {
      isLogger(bunyan, {throwOnFalse: true});
    }).should.throw('NotALoggerError: Provided logger does not contain a (method: debug)');
  });
});

/**
 * Unit tests for a Winston logger.
 */
describe('Unit testing for [Function=isLogger] using a Winston@2.4.0 logger', () => {
  it('should return a boolean', () => {
    (isLogger(this.winstonLogger)).should.be.a.Boolean();
  });

  it('should return true when a Winston@2.4.0 logger is provided', () => {
    (isLogger(this.winstonLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return true when a Winston@2.4.0 logger is provided and (options.debug=true)', () => {
    (isLogger(this.winstonLogger, {debug: true})).should.be.a.Boolean().which.is.True();
  });
});

/**
 * Unit tests for the default Winston logger.
 */
describe('Unit testing for [Function=isLogger] using the default logger of Winston@2.4.0', () => {
  it('should return a boolean', () => {
    (isLogger(this.winstonDefaultLogger)).should.be.a.Boolean();
  });

  it('should return true when the default logger of Winston@2.4.0 is provided', () => {
    (isLogger(this.winstonDefaultLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return true when the default logger of Winston@2.4.0 is provided (options.debug=true)', () => {
    (isLogger(this.winstonDefaultLogger, {debug: true})).should.be.a.Boolean().which.is.True();
  });
});
