/**
 * Created by kevin on 1/30/16.
 */

var express = require('express')
var app = express()

app.get('/', function(req, res){
    res.send('hello, world')
})

app.post('/anagram', function(req, res){
    var output = []
    var i, j, list, first, letters, works
    for(i=0; i<req.params.length; i++){
        list = req.params[i]
        first = list[0]
        works = true
        letters = getLetterCounts(first)
        for(j=1; j<list.length; j++){
            works &= testLetters(list[i], letters)
        }
        output.push(works)
    }
    res.send(output)
})

function getLetterCounts(str){
    var letters = {}
    for(var i=0; i<str.length; i++){
        letters[str[i]] = (letters[str[i]] || 0) + 1;
    }
    return letters
}

function testLetters(str, letters){
    var otherLetters = getLetterCounts(str)
    var l
    for(l in letters){
        if(otherLetters[l] != letters[l]){
            return false
        }
    }
    for(l in otherLetters){
        if(otherLetters[l] != letters[l]){
            return false
        }
    }
    return true
}

app.listen(80)