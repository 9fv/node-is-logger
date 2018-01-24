node-is-logger 
======================

## Table of Contents

* [Synopsis](#Synopsis)
* [Usage](#Usage)
* [Installation](#Installation)
* [API Reference](#API Reference)
* [Tests](#Tests)
* [Compatibility](#Compatibility)
* [Contributing](#Contributing)
* [Credits](#Credits)
* [History](#History)
* [License](#License)

## Synopsis

Verify if a value seems or is a logger, including "standardized" methods: `debug`, `info`, `error`... - _as [Bunyan](https://github.com/trentm/node-bunyan) or [Winston](https://github.com/winstonjs/winston)_.

## Usage 

```
   const isLogger = require('is-logger');
   const bunyan = require('bunyan');
   
   const LOG = bunyan.createLogger({name: __filename});
   const FAKE_LOG = {name: 'I am a fake logger!"};
   
   console.log(isLogger(LOG)) 
   # > return true: LOG is a logger.
   
   console.log(isLogger(FAKE_LOG);
   # > return false: FAKE_LOG is not a logger.
   
   console.log(isLogger(FAKE_LOG, {throwOnFalse: true});
   # > throw an error of type `IsNotLoggerError`: FAKE_LOG is not a logger.
   
```

## Installation

    npm install is-logger

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

### Running unit tests

    npm test

## Compatibility

### Node

Tested with [Node v9.4.0](https://nodejs.org/dist/v9.4.0/docs/api/)

### Browser

Untested at this time.

## Contributing

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## Credits

## History

## License

> [The MIT License](https://opensource.org/licenses/MIT)
> 
> Copyright (c) 2018 SAS 9 Février
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

