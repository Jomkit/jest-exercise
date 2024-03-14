/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    this.text = text;
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chains = {};
    for(let i in this.words){
      if(!this.chains[this.words[i]]){
        this.chains[this.words[i]] = [];
      };
      this.chains[this.words[i]].push(this.words[+i+1] ? this.words[+i+1] : null);
    }
    // return chains;
  }

  //choice takes an array of possible next words (should be based on a key) and chooses next "key"
  choice(arr) {
    let rnd = Math.floor(Math.random() * arr.length);
    return arr[rnd];
  }
  /** return random text from chains */

  determineStartingWord(){
    let specialRegex = /[\.\?!]/g;
    let curr;
    if(this.text.match(specialRegex)){
      // console.log('Match!');
      let endWords = this.words.filter(word => word.match(/[\.\?!]$/g));
      // console.log(endWords);
      let rndEnd = endWords[Math.floor(Math.random() * endWords.length)];
      // console.log("Random end word:", rndEnd);
      let nextArr = this.chains[rndEnd];
      curr = this.choice(nextArr);

    } else {
      // console.log('no match!');
      let rnd = Math.floor(Math.random() * Object.keys(this.words).length);
      curr = this.words[rnd];
    }
    return curr;
  }

  makeText(numWords = 100) {
    // TODO
    let text = [];
    // let rnd = Math.floor(Math.random() * Object.keys(this.chains).length);
    // let curr = Object.keys(this.chains)[rnd];
    let curr = this.determineStartingWord();

    while(text.length < numWords && curr !== null){
      text.push(curr);
      curr = (this.choice(this.chains[curr]));
    }
    console.log('text:', text.join(' '));
    return text.join(' ');
  }
}

// let mm = new MarkovMachine('I am losing my interest in human beings; in the significance of their lives and their actions. Some one has said it is better to study one man than ten books. I want neither books nor men; they make me suffer. Can one of them talk to me like the night – the Summer night? Like the stars or the caressing wind?');
// console.log("Chains:", mm.chains)
// mm.makeText();

module.exports = {MarkovMachine}