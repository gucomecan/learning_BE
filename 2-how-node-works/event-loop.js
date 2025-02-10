const fs = require('fs')

process.env.UV_THREADPOOL_SIZE = 4 // 4 is the default
setTimeout(() => console.log('Timer 1 finished'), 0)
setTimeout(() => console.log('Timer 2 finished'), 1000)
setImmediate(() => console.log('Immediate 1 finished'))
setImmediate(() => console.log('Immediate 2 finished'))

fs.readFile('./test-file.txt', () => {
  console.log('I/O finished')
  setTimeout(() => console.log('Timer 3 finished'), 0)
  setTimeout(() => console.log('Timer 4 finished'), 3000)
  setImmediate(() => console.log('Immediate 3 finished'))

  process.nextTick(() => console.log('process.nextTick'))
})

console.log('Simple log')
