const fs = require('fs');
const axios = require('axios');

/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov');

function handleFile(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data);
    }
  });
}

async function handleUrl(url) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

function handleOutput(data) {
  let mm = new MarkovMachine(data);
  console.log(mm.makeText());
}

function main() {
  let [type, input] = process.argv.slice(2);
  try {
    if (type && input) {
      switch (type) {
        case 'file':
          handleFile(input);
          break;
        case 'url':
          handleUrl(input);
          break;
        default:
          throw ('Input type should be "file" or "url"!')
      }
    } else {
      throw ('Missing arguments.')
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
}

main();