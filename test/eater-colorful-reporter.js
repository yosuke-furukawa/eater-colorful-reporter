const EaterColorfulReporter = require('../index');
const Eater = require('eater').Eater;
const reporter = new EaterColorfulReporter();
const eater = new Eater(reporter, './test/fixture', '.js');
const assert = require('assert');

eater.eat();

eater.on('err', (hasAnyError) => {
  assert(hasAnyError);
});
