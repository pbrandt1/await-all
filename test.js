var assert = require('assert')
const all = require('./index')

//
// Helper functions just to make some simple async tasks
//
async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function fast() {
  await sleep(1)
  return 'fast'
}

async function slow() {
  await sleep(10)
  return 'slow'
}

//
// Helper fns for logging
//
const log = console.log.bind(console)
const err = console.error.bind(console)


//
// A single test which handles everything
//
var res
async function tests () {
  log('testing await all with an object')
  res = await all({
    fast: fast(),
    slow: slow()
  })
  assert.deepEqual(res, {
    fast: 'fast',
    slow: 'slow'
  })
  log('passed\n')

  log('testing await all with an array')
  res = await all([fast(), slow()])
  assert.deepEqual(res, ['fast', 'slow'])
  log('passed\n')

  log('testing await all with multiple arguments')
  res = await all(fast(), slow(), [fast()], {slow: slow()}, 3)
  assert.deepEqual(res, [
    'fast',
    'slow',
    ['fast'],
    {slow: 'slow'},
    3
  ])
  log('passed\n')
}


process.on('unhandledRejection', (reason, promise) => {
  err(reason)
  err('res was', res)
});

tests()
