const fs = require('fs')
const http = require('http')
const url = require('url')

const replaceTemplate = require('./modules/replateTemplate')

const dataOfProducts = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(dataOfProducts)

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const page404 = (res) => {
  res.writeHead(404, { 'Content-type': 'text/html' })
  res.end('<h1>Not found!</h1>')
  return
}

// ---------- server -------------
const server = http.createServer((req, res) => {
  const path = req.url
  const { pathname, query } = url.parse(path, true)

  if (pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    const cardsHtml = dataObj.map((product) => replaceTemplate(tempCard, product)).join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output)
    return
  }

  if (pathname === '/product') {
    const searchedId = query?.id

    if ([undefined, null, ''].includes(searchedId)) {
      page404(res)
    }
    const output = dataObj.find((product) => product.id == parseInt(searchedId))

    if (!output) {
      page404(res)
    }

    res.writeHead(200, { 'Content-type': 'text/html' })
    const productHtml = replaceTemplate(tempProduct, output)
    res.end(productHtml)
    return
  }

  if (pathname === '/' || pathname === '/data') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(dataOfProducts)

    return
  }

  page404(res)
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000')
})
