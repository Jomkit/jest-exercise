// jest.mock('./makeText')
const { handleFiles } = require("./makeText");
const fs = require('fs');

const testFile = 'Testing a file is great for the heart, is great for the soul, and is great for making sure the code is robust and spicy';

describe('makeText.js tests', function(){
    beforeEach(function(){
        jest.resetAllMocks();
    });
    
    test('handleFiles() calls fs.readFile and passes eggs.txt as an input', function(){
        const logSpy = jest.spyOn(console, 'log');
        let cbMock;
        jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) =>{
            cbMock = callback;
        })

        handleFiles('eggs.txt');
        cbMock(null, testFile);

        expect(fs.readFile).toBeCalledWith('eggs.txt', 'utf8', cbMock);
        expect(logSpy).toBeCalledWith(expect.any(String));
    })
    
})