const { log } = require('console')
const fs = require('fs')
const superagent = require('superagent')

// NOTE: callback hell example
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   log('Breed: ', data)

//   const url = `https://dog.ceo/api/breed/${data}/images/random`
//   superagent
//     .get(url)
//     .then((res) => {
//       log('res:', res.body.message)

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         log('random dog save to file!')
//       })
//     })
//     .catch((err) => {
//       log('err:', err.message)
//     })
// })

// ---- promises ----
// NOTE: solve callback hell with promise
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject("Can't find the file: ", err)
      resolve(data)
    })
  })
}

const writeFilePromis = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Can't write the file", err)
      resolve('success')
    })
  })
}

// readFilePromise(`${__dirname}/dog.txt`)
//   .then((data) => {
//     const url = `https://dog.ceo/api/breed/${data}/images/random`
//     return superagent.get(url)
//   })
//   .then((res) => {
//     log('res:', res.body.message)
//     return writeFilePromis('dog-img.txt', res.body.message)
//   })
//   .then(() => {
//     log('random dog save to file!')
//   })
//   .catch((err) => {
//     log('err:', err.message)
//   })

// ----- async/await -----
// NOTE: solve callback hell with async/await
// const getDogPic = async () => {
//   try {
//     const data = await readFilePromise(`${__dirname}/dog.txt`)
//     log('Breed: ', data)
//     const url = `https://dog.ceo/api/breed/${data}/images/random`
//     const res = await superagent.get(url)
//     log('res:', res.body.message)
//     await writeFilePromis('dog-img.txt', res.body.message)
//     log('random dog save to file!')
//   } catch (err) {
//     log(err)
//     throw err
//   }

//   return 'fake 2: ready'
// }

// // tests
// log('-- 1 --')
// getDogPic()
//   .then((x) => {
//     log(x)
//     log('-- 3 --')
//   })
//   .catch((err) => log('ERROR:', err))
// log('-- actual 2: flow is not blocked --')

// ---- parallel promises ----
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`)
    const url = `https://dog.ceo/api/breed/${data}/images/random`

    const promise1 = superagent.get(url)
    const promise2 = superagent.get(url)
    const promise3 = superagent.get(url)

    const resArray = await Promise.all([promise1, promise2, promise3])
    const res = resArray.map((res) => res.body.message)
    log(res)
    await writeFilePromis('dog-img.txt', res.join('\n'))
  } catch (err) {
    log(err)
  }
}

getDogPic()
