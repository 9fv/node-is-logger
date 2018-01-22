/* eslint-env node, mocha */

const should = require('should'); // eslint-disable-line no-unused-vars

const bunyan = require('bunyan');
const winston = require('winston');

const isALogger = require('../lib/is-a-logger');


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
describe('Unit testing for [Function=isALogger]', () => {
  it('should be a function', () => {
    (isALogger).should.be.a.Function();
  });

  it('should return a boolean', () => {
    (isALogger(null)).should.be.a.Boolean();
  });

  it('should return false if none logger is provided', () => {
    (isALogger(null)).should.be.a.Boolean().which.is.False();
  });

  it('should return true if a valid logger is provided', () => {
    (isALogger(this.bunyanLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return false if an invalid logger is provided', () => {
    (isALogger(this.invalidLogger)).should.be.a.Boolean().which.is.False();
  });
});

/**
 * Unit tests for a Bunyan logger.
 */
describe('Unit testing for [Function=isALogger] using a Bunyan logger', () => {
  it('should return a boolean', () => {
    (isALogger(this.bunyanLogger)).should.be.a.Boolean();
  });

  it('should return true when a Bunyan logger is provided', () => {
    (isALogger(this.bunyanLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return false when the Bunyan module is provided', () => {
    (isALogger(bunyan)).should.be.a.Boolean().which.is.False();
  });
});

/**
 * Unit tests for a Winston logger.
 */
describe('Unit testing for [Function=isALogger] using a Winston@2.4.0 logger', () => {
  it('should return a boolean', () => {
    (isALogger(this.winstonLogger)).should.be.a.Boolean();
  });

  it('should return true when a Winston@2.4.0  logger is provided', () => {
    (isALogger(this.winstonLogger)).should.be.a.Boolean().which.is.True();
  });
});

/**
 * Unit tests for the default Winston logger.
 */
describe('Unit testing for [Function=isALogger] using the default logger of Winston@2.4.0', () => {
  it('should return a boolean', () => {
    (isALogger(this.winstonDefaultLogger)).should.be.a.Boolean();
  });

  it('should return true when the default logger of Winston@2.4.0 is provided', () => {
    (isALogger(this.winstonDefaultLogger)).should.be.a.Boolean().which.is.True();
  });
});
