# flat-object-keys

flat-object-keys returns the flattened keys from an object.

## Installation

```shell
$ npm install flat-object-keys
```

## Quick start

First you need to integrate flat-object-key into your application:

```javascript
const getFlatObjectKeys = require('flat-object-keys');
```

Then, you can use the `getFlatObjectKeys` function to get the flattened keys from an object:

```javascript
const value = {
  a: 23,
  b: {
    c: 42
  }
};

const flattenedObjectKeys = getFlatObjectKeys({
  from: value
});

console.log(flattenedObjectKeys);
// => [ 'a', 'b', 'b.c' ]
```

From time to time it may be needed to exclude some paths. For that, provide the `excludes` property:

```javascript
const value = {
  a: 23,
  b: {
    c: 42
  }
};

const flattenedObjectKeys = getFlatObjectKeys({
  from: value,
  excludes: [ 'b.c' ]
});

console.log(flattenedObjectKeys);
// => [ 'a', 'b' ]
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2019 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
