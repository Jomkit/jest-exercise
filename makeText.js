/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require('./markov')
const { stripHtml } = require('string-strip-html');
const fs = require('fs');
const axios = require('axios');
const argv = process.argv;
let input = argv[3];

function handleFiles(input){
    fs.readFile(input, 'utf8', function(err, data){
        if(err){
            // error reading file
            console.error(err);
            process.exit(1);
        }
        // success
        let mm = new MarkovMachine(data);
        let text = mm.makeText();
        console.log(text);
        return text;
    });
}

async function handleUrls(input){
    const res = await axios.get(input)
        .then((res) => {
            let strippedRes = stripHtml(res.data).result;
            // console.log(strippedRes);

            let mm = new MarkovMachine(strippedRes);
            let output = mm.makeText();
            console.log(output);
            return output;
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.errors[0]);
        });
}

function genText(){
    if(argv[2]==='file'){
        // console.log('In maketext.js trying to do file stuff');
        // Read a txt file
        handleFiles(input);
    } else if(argv[2]==='url'){
        handleUrls(input);
    }
    console.log('Generating text...');
}
genText();

