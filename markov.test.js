const { MarkovMachine } = require("./markov");

describe("MarkovMachine class methods", function() {
    test('make word arrays and chains on initialization', function(){
        let test = new MarkovMachine('test sentence');
        
        expect(test.words).toEqual(['test', 'sentence'])
        expect(test.chains).toHaveProperty("test", ["sentence"]);
    });

    test('choice(arr) takes an arr and returns random value from arr', function(){
        let test = new MarkovMachine('I am testing');

        expect(test.choice([1,2,3,4,5])).toBeLessThanOrEqual(5);
        expect(test.choice([1,2,3,4,5])).toBeGreaterThanOrEqual(1);
    });

    test('determineStartingWord() returns a sentence starting word', function(){
        let testString = 'I am a firm believer in faith. I believe everyone needs a little faith. Faith is good for everyone';
        let test = new MarkovMachine(testString);

        expect(test.determineStartingWord()).toMatch(/[A-Z][a-z]*/);
    })

    test('determineStartingWord() returns a word when text has no capitalization or punctuation', function(){
        let testString = 'the cat in the hat is in the hat';
        let test = new MarkovMachine(testString);

        expect(test.determineStartingWord()).toEqual(expect.any(String));
        expect(test.determineStartingWord()).toMatch(/[a-z]*/);
    })

    test('makeText(): make random text from natural string', function(){
        let testString = 'I am losing my interest in human beings; in the significance of their lives and their actions. Some one has said it is better to study one man than ten books. I want neither books nor men; they make me suffer. Can one of them talk to me like the night – the Summer night? Like the stars or the caressing wind?';
        let test = new MarkovMachine(testString);
        let t1 = test.makeText();
        let t2 = test.makeText();
        let t3 = test.makeText();

        expect(t1).not.toEqual(testString);
        expect(t1).not.toEqual(t2);
        expect(t2).not.toEqual(t3);
        expect(t1).not.toEqual(t3);
    });

    test('makeText() should still handle non-capitalized, non-punctuated sentences', function(){
        let test = new MarkovMachine('the cat in the hat is in the hat');

        expect(test.makeText()).toEqual(expect.any(String));
    });
    
    test('makeText() should stop at a specified numWords', function(){
        let test = new MarkovMachine('the cat in the hat');
        
        expect(test.makeText(1).split(' ').length).toEqual(1);
    });
    test('makeText() should stop at a terminating word, ie. when the next word would be null', function(){
        let test = new MarkovMachine('I like tests');

        expect(test.makeText().split(' ').length).toBeLessThan(100);
    });
});