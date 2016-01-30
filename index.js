/**
 * Created by kevin on 1/30/16.
 */

var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var app = express()
var upload = multer()

app.use(bodyParser.json({ strict: false }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
    res.send('hello, world')
})

app.post('/anagram', function(req, res){
    var output = []
    var i, j, list, first, letters, works
    for(i=0; i<req.body.length; i++){
        console.log(i, req.body[i])
        list = req.body[i]
        first = list[0]
        works = true
        letters = getLetterCounts(first)
        console.log(i, list, letters)
        for(j=1; j<list.length; j++){
            works = works && testLetters(list[j], letters)
        }
        output.push(works)
    }
    res.send(output)
})

function getLetterCounts(str){
    var letters = {}
    for(var i=0; i<str.length; i++){
        if(str[i] != ' ') {
            letters[str[i]] = (letters[str[i]] || 0) + 1;
        }
    }
    return letters
}

function testLetters(str, letters){
    var otherLetters = getLetterCounts(str)
    console.log('  -- ', str, otherLetters)
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



app.post('/palindrome', function(req, res){
    var output = []
    var i, j, list, first, letters, works
    for(i=0; i<req.body.length; i++){
        str = req.body[i]
        works = true
        for(j=0; j<str.length/2; j++){
            works = works && str[j] === str[str.length-j]
        }
        output.push(works)
    }
    res.send(output)
})

app.listen(process.env.PORT || 3000, function(){
    console.log('it works')
})