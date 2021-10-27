var matcherCount = 10;

const { spawn } = require('child_process');

const { exec } = require("child_process");

// KEEP SIZE 1000
const SIZE = 1000;

const count = parseInt(process.argv[2]) || 1;
const aoi = parseInt(process.argv[3]) || 100;

// Declare funtions

var _addMatcher = function(x, y, radius){
    var cmd = "start node test/random_matcher.js" + " " + x + " " + y + " " + radius;

    exec(cmd, (error, data, getter) => {
        if(error){
            console.log("error",error.message);
            return;
        }
        if(getter){
            console.log("data",data);
            return;
        }
        console.log("data",data);
    
    });
}

// add matchers
setTimeout(function(){
    
    // must use while loop and setIntervalin order to pause
    var i = 1;
    var generate = setInterval(function(){
        if(i >= x.length || i >= y.length || i >= count){
            clearInterval(generate);
        }else{

            var x = Math.random()*SIZE;
            var y = Math.random()*SIZE;
            _addMatcher(x, y, aoi);
            i++;
        }
    }, 1500);
}, 1000);