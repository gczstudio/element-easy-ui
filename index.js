#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const childprocess = require('child_process');
const minimist = require('minimist');
const copydir = require('copy-dir');
const chalk = require('chalk');
const boxen = require('boxen');

// get args
const args = minimist(process.argv.slice(2));
const param1 = './' + args.config
const examplePath = path.resolve(process.cwd(), param1)
const isProd = process.env.NODE_ENV === 'production';

// copy examples
if(fs.existsSync(examplePath)) {
  copydir(examplePath, path.resolve(__dirname,'../element-easy-ui'), {
    filter: function(stat, filepath, filename) {
      return true;
    }
  }, function(err) {
    if(err) {
      console.log(err)
    }
  });
} else {
  console.log('请添加examples')
}

// exec start webpack serve
const base = './node_modules/.bin';
const cmd = isProd ? `${base}/cross-env NODE_ENV=production ${base}/webpack --config ./node_modules/element-easy-ui/build/webpack.demo.js` :
`${base}/cross-env NODE_ENV=development ${base}/webpack-dev-server --config ./node_modules/element-easy-ui/build/webpack.demo.js`
childprocess.exec(cmd, function(error, stdout, stderr) {
  console.log(error, stdout, stderr);
});

if(!isProd) {
  let message = chalk.green('Serving!');
  message += `\n\n${chalk.bold('Local:  http://localhost:8085')}`;
  console.log(boxen(message, {
    padding: 1,
    borderColor: 'green',
    margin: 1
  }));
}

