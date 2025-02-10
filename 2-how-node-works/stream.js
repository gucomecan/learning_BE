const { log } = require('console')
const fs = require('fs')
const server = require('http').createServer()

const fileName = 'test-file.txt'

server.on('request', (req, res) => {
  // Solution 1
  // NOTE: sending the whole file when it is ready
  // problem: need to read the whole file(can take a lot of tiem), before send it to the client
  // fs.readFile(fileName, (err, data) => {
  //   if (err) log('err')

  //   res.end(data)
  // })

  // Solution 2
  // NOTE: when a chunk(part of the file as data) is ready, we are sending it to the client
  // problem: we read file faster than we send it to the client(backpressure)
  // const readable = fs.createReadStream(fileName)
  // readable.on('data', (chunk) => res.write(chunk))
  // readable.on('end', () => res.end())
  // readable.on('error', (error) => {
  //   log('error: ', error)
  //   res.statusCode = 500
  //   res.end('File not found')
  // })

  // Solution 3
  // NOTE: use pipe 
  const readable = fs.createReadStream(fileName)
  readable.pipe(res)
  // readableSource.pipe(writableDestination)^
})

server.listen(8000, '127.0.0.1', () => log('waiting...'))
