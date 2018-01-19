const assert = require('assert');
const should = require('should');

const bunyan = require('bunyan');
const winston = require('winston');

const isALogger = require('../src/is-a-logger');

beforeEach(() => {

  // A simple Bunyan logger.
  this._bunyanLogger = bunyan.createLogger({name: 'BunyanLoggerTest'});

  // A simple Winston (v2.4.0) logger.
  this._winstonLogger = new winston.Logger();

  // An invalid logger.
  this._invalidLogger = {fn: (x) => x*2};
});

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
    (isALogger(this._bunyanLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return false if an invalid logger is provided', () => {
    (isALogger(this._invalidLogger)).should.be.a.Boolean().which.is.False();
  });
});

describe('Unit testing for [Function=isALogger] using a Bunyan logger', () => {
  it('should return a boolean', () => {
    (isALogger(this._bunyanLogger)).should.be.a.Boolean();
  });

  it('should return true when a Bunyan logger is provided', () => {
    (isALogger(this._bunyanLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return false when the Bunyan module is provided', () => {
    (isALogger(bunyan)).should.be.a.Boolean().which.is.False();
  });
});

describe('Unit testing for [Function=isALogger] using a Winston@2.4.0 logger', () => {
  it('should return a boolean', () => {
    (isALogger(this._winstonLogger)).should.be.a.Boolean();
  });

  it('should return true when a Winston@2.4.0  logger is provided', () => {
    (isALogger(this._winstonLogger)).should.be.a.Boolean().which.is.True();
  });

  it('should return true when the Winston@2.4.0  module is provided', () => {
    (isALogger(winston)).should.be.a.Boolean().which.is.True();
  });
});



