'use strict';

const env = require('gulp-env');
const envs = env({
    file: "./env.json"
});

const index = require('./src/index');

console.log("start munchbot");

index.handler({}, {}, (result,error)=>{
    console.log('Result:', result);
    console.log('Error:', error);
});

