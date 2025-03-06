const { log } = require('console');
const fs = require('fs');

fs.readFile(`${__dirname}/dog.tsx`, (err, data) => {
  log('Breed: ', data);
});

const url = 'https://dog.ceo/api/breed/hound/images/random';
