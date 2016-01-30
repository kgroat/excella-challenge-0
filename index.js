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
    var i, j, str, works
    for(i=0; i<req.body.length; i++){
        str = req.body[i]
        works = true
        for(j=0; j<str.length/2; j++){
            works = works && str[j] === str[str.length-1-j]
        }
        output.push(works)
    }
    res.send(output)
})

app.post('/fibonacci', function(req, res){
    var output = []
    var i
    for(i=0; i<req.body.length; i++){
        output.push(fib(1, 1, req.body[i]))
    }
    res.send(output)
})

function fib(one, two, remaining){
    if(remaining <= 1){
        return one
    } else if(remaining === 2){
        return two
    }
    return fib(two, one+two, remaining-1)
}

var numerals = 'MDCLXVI*'

var numeralMap = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1,
    '*': 0,
}

app.post('/numerals', function(req, res){
    var output = []
    var i, num, str, prev, idx
    for(i=0; i<req.body.length; i++){
        str = ''
        prev = '*'
        num = req.body[i]
        console.log(num)
        idx = 0
        while(num > 0){
            var ret = getNumeral(num)
            num = ret[0]
            str += ret[1]
        }
        output.push(str)
    }
    res.send(output)
})

function getNumeral(num){
    var i, j, curr, curr2, add, count, str, prev, prev2
    str = ''
    for(i=0; i<numerals.length; i++){
        prev = numerals[i+1] || '*'
        curr = numerals[i]
        console.log(curr, numeralMap[curr].toString(10), numeralMap[curr].toString(10)[0])
        console.log(prev)
        if(numeralMap[curr].toString(10)[0] == '1'){
            prev = numerals[i+2] || '*'
            console.log('yup', prev)
        }
        count = parseInt((num + numeralMap[prev]) / numeralMap[curr])
        for(j=0; j<count; j++){
            str = str + curr
        }
        num = num - count * numeralMap[curr]
        if(num < 0){
            for(j=numerals.indexOf(prev); j<numerals.length; j++){
                curr2 = numerals[j]
                if(num + numeralMap[curr2] >= 0){
                    str = curr2 + str
                    num = num + numeralMap[curr2]
                    break;
                }
            }
        }
        if(count > 0){
            return [num, str]
        }
    }
}

app.listen(process.env.PORT || 3000, function(){
    console.log('it works')
})