'use strict';

const colo = require('colo');
const Reporter = require('eater').Reporter;
const Progress = require('progress');

class EaterColorfulReporter extends Reporter {
  reportFileNumber(num) {
    this.executeFileNum = 0;
    this.testFileNum = num;
    this.bar = new Progress('[:bar] :percent :etas', {
      total: num,
      complete: '=',
      incomplete: ' ',
    });
    console.log(colo.cyan.bold(`Test Count: `) + colo.cyan(`${num}`));
  }
  reportTestName(name) {
  }
  setChildProc(child) {
    child.stdout.on('data', () => {process.stdout.emit('data', '')});
    child.stderr.on('data', () => {process.stderr.emit('data', '')});
  }
  reportFailure(name) {
    this.bar.tick();
  }
  reportSuccess(name) {
    this.bar.tick();
  }
  reportFinish(hasAnyError, errors) {
    Object.keys(errors).forEach((file) => {
      console.error(colo.red.bold(`✗ ${file}`));
      const errorLines = errors[file].split('\n').map((e, i) => i < 3 ? colo.red.bold(e) : colo.green(e)).join('\n');
      console.error(errorLines);
    });
  }
}

module.exports = EaterColorfulReporter;
