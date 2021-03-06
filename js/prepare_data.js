var natural = require('natural');
var fs      = require('fs');
var file    = 'dataset1.txt';
//sw = require('stopword');

exports.english = require('./english').english;

//zoznam vecí na vypísanie
var responseData = {
    stack: ""
}

//uloží argumentu do zoznamu vecí na vypísanie
function println(arg1){
    //ak je argument pole tak sa pre každý prvok zavolá samú seba rekurzívne
    if(Array.isArray(arg1)){
        for(var i=0 ; i<arg1.length ; i++){
            println(arg1[i]);
        }
    }
    else{
        //ináč prejde všetkýmy argumentami a pridá ich do zoznamu vecí na vypísanie
        for(var i=0 ; i<arguments.length ; i++){
            responseData.stack += arguments[i] + "<br/>\n";
        }
    }
}

//vráti zoznam veci na vypísanie
exports.getData = function(){
    return JSON.stringify(responseData);
}

//funkcie kde sa všetko deje
exports.start = function(res){
    println("ahoj ako sa maš??");
    println("ja sa mam dobre");
    // read file from current directory
    fs.readFile(file, 'utf8', function (err, data)
    {
        if (err) throw err;

        var wordsArray = splitByWords(data);
        var wordsMap = createWordMap(wordsArray);
        var finalWordsArray = sortByCount(wordsMap);

        var tokenizeArray = tokenizeText(data);
        responseData.tokenizeArray = tokenizeArray;

        //var stopArray = stopWord(tokenizeArray);
        //console.log(stopArray);

        //var stemmArray = stemmingText(stopArray);
        //console.log(stemmArray);



        //console.log(wordsArray);
        //console.log(finalWordsArray);
        //console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
         //   finalWordsArray[0].total + ' times');

        /*
         output:
         [ { name: 'he', total: 10 },
         { name: 'again', total: 7 },
         { name: 'away', total: 7 },
         ... ]
         The word "he" appears the most in the file 10 times
         */
    });
}

function splitByWords (text) {
    // split string by spaces (including spaces, tabs, and newlines)
    var wordsArray = text.split(/\s+/);
    return wordsArray;
}



function createWordMap (wordsArray) {

    // create map for word counts
    var wordsMap = {};
    /*
     wordsMap = {
     'Oh': 2,
     'Feelin': 1,
     ...
     }
     */
    wordsArray.forEach(function (key) {
        if (wordsMap.hasOwnProperty(key)) {
            wordsMap[key]++;
        } else {
            wordsMap[key] = 1;
        }
    });

    return wordsMap;

}


function sortByCount (wordsMap) {

    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function(key) {
        return {
            name: key,
            total: wordsMap[key]
        };
    });

    finalWordsArray.sort(function(a, b) {
        return b.total - a.total;
    });

    return finalWordsArray;

}

function tokenizeText (text) {
    var tokenizer = new natural.WordTokenizer();
    var result = tokenizer.tokenize(text);

    return result;

}

function stopWord (text) {
    var newText = exports.english.removeStopwords(text);

    return newText;

}

function stemmingText (text) {
    var stemmer = natural.PorterStemmer;
    var result = [];

    text.forEach(function (item) {
        result.push(stemmer.stem(item));
    })


    return result;

}









