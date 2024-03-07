/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    let chains = {};
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
      console.log(i);
      if(!this.chains[this.words[i]]){
        this.chains[this.words[i]] = [];
      };
      this.chains[this.words[i]].push(this.words[+i+1]);
    }
    // return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}
