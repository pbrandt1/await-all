# await-all

```
npm install await-all
```

```
const all = require('await-all')

async function tests () {
  // using await all with an object
  var res = await all({
    fast: fast(), // a promise or async function
    slow: slow() // another promise or async function
  })

  res.fast // result of fast()
  res.slow // result of slow()

  // using await all with an array
  res = await all([
    fast(),
    slow()
  ])
  res[0] // result of fast()
  res[1] // result of slow()

  // using await all with multiple arguments is just like passing a big array
  res = await all(
    fast(),
    slow(),
    [fast()],
    {slow: slow()},
    3
  )
  res[0] // result of fast()
  res[2][0] // guess what this is
}
```

# Credit

I literally copied parts of [co](https://www.github.com/tj/co) to make this library.

# License

MIT

