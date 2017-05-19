# rxhr
> A tiny Observable based HTTP client

[![Travis](https://img.shields.io/travis/vesparny/rxhr.svg)](https://travis-ci.org/vesparny/rxhr)
[![David](https://img.shields.io/david/vesparny/rxhr.svg)](https://david-dm.org/vesparny/rxhr)
[![npm](https://img.shields.io/npm/v/rxhr.svg)](https://www.npmjs.com/package/rxhr)
[![npm](https://img.shields.io/npm/dm/rxhr.svg)](https://npm-stat.com/charts.html?package=rxhr&from=2017-05-19)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![MIT License](https://img.shields.io/npm/l/rxhr.svg?style=flat-square)](https://github.com/vesparny/rxhr/blob/master/LICENSE)

The current size of `rxhr/dist/rxhr.umd.min.js` is:

[![gzip size](http://img.badgesize.io/https://unpkg.com/rxhr/dist/rxhr.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/rxhr/dist/)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm i rxhr
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import rxhr from 'rxhr'

// using CommonJS modules
var rxhr = require('rxhr')
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/rxhr/dist/rxhr.umd.js"></script>
```

You can find the library on `window.rhxr`.

## Usage

```js
import rxhr from 'rxhr'

const req$ = rxhr({
  method: 'get',
  responseType: 'json',
  url: 'https://jsonplaceholder.typicode.com/posts'
})
.subscribe(
  res => res.json().forEach(e => console.log(e.title)),
  err => console.log(err),
  () => console.log('completed')
)

// abort request
req$.unsubscribe()


```

## Tests

```sh
$ npm run test
```

[MIT License](LICENSE.md) © [Alessandro Arnodo](https://alessandro.arnodo.net/)
