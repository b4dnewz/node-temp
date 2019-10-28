# temp

> A node utility to handle temporary files and folders

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

---

## Getting started

Install the project using your favourite package manager.

```
npm install @b4dnewz/temp
```

Load inside your project all together or separate functions.

```typescript
import temp from "@b4dnewz/temp";
// or
import {file, fileSync, dir, dirSync} from "@b4dnewz/temp";
```

Then create any temporary file you need in your application or your tests.

```typescript
// create a temporary file
// es: /tmp/e6ba9fff240bde04897f/5fb6aa4e9ac8ccf10e2f
temp.file()

// create a temporary file in sync way
temp.fileSync()

// create a temporary directory
// es: /tmp/3c34454971179fc20e99/29d72d3cb2386b904afe
temp.dir()

// create a temporary directory in sync way
temp.dirSync()
```

```typescript
it("should create a temporary file", async () => {
    const tmpFile = await temp.file()
    // do whatever you need with the file
    await tmpFile.remove()
})
```

Later on, when you have done with it, just release it.

```typescript
// will remove the temporary file
tmpFile.remove()

// will remove the temporary directory
// even if has content in it
// such as other temporary files
tmpDir.remove()
```

## Documentation

A very deep documentation with real world usage examples is coming soon, stay tuned.

---

## Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/b4dnewz/node-temp/fork)
3. Create your __feature branch__ (`git checkout -b my-new-feature`)
4. Commit your changes with logic (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Add __some test__ for your new feature
7. Create a new Pull Request

---

## License

[MIT](./LICENSE) © [Filippo Conti](https://b4dnewz.github.io/)

[npm-image]: https://badge.fury.io/js/%40b4dnewz%2Ftemp.svg
[npm-url]: https://npmjs.org/package/@b4dnewz/temp
[travis-image]: https://travis-ci.org/b4dnewz/node-temp.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/node-temp
[coveralls-image]: https://coveralls.io/repos/b4dnewz/node-temp/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/node-temp