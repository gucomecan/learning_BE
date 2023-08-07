const { parse } = require('csv-parse')
const fs = require('fs')

const planetData = []
const isHabitable = (planet) => {
  return planet?.koi_disposition === 'CONFIRMED' && planet?.koi_insol < 1.11 && planet?.koi_insol > 0.36 && planet?.koi_prad < 1.6   
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true
  }
  ))
  .on('data', planet => {
    if (isHabitable(planet)) {
      planetData.push(planet)
    }

  })
  .on('error', error => console.log('--- error: ', error, ' ---'))
  .on('end', () => {
    console.log('--- data:', planetData.length)
  })
