/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    let chains = new Map();

    for (let idx = 0; idx < this.words.length; idx++) {
      let currentWord = this.words[idx];
      let nextWord = this.words[idx + 1] || null;
      if (chains.has(currentWord)) {
        chains.get(currentWord).push(nextWord);
      } else {
        chains.set(currentWord, [nextWord])
      }
    }

    this.chains = chains;
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    let text = [];
    let word = randomValue(Array.from(this.chains.keys()));

    while (text.length < numWords && word != null) {
      text.push(word);
      word = randomValue(this.chains.get(word));
    }
    return text.join(' ');
  }
}

function randomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  MarkovMachine: MarkovMachine
};