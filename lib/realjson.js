/**
 * Module dependencies.
 */

var Base = require('mocha').reporters.Base
  , cursor = Base.cursor
  , color = Base.color;

/**
 * Expose `JSON`.
 */

exports = module.exports = RealJson;

/**
 * Initialize a new `JSON` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function RealJson(runner) {
  var self = this;
  Base.call(this, runner);

  var tests = []
    , failures = []
    , passes = [];

  runner.on('test end', function(test){
    tests.push(test);
  });

  runner.on('pass', function(test){
    passes.push(test);
  });

  runner.on('fail', function(test){
    failures.push(test);
  });

  runner.on('end', function(){
    var obj = {
        stats: self.stats
      , tests: tests.map(clean)
      , failures: failures.map(clean)
      , passes: passes.map(clean)
    };

    process.stdout.write(JSON.stringify(obj, null, 2));
  });
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @param {Object} test
 * @return {Object}
 * @api private
 */

function clean(test) {
  if(test.err == null){
    return {
        // remove smoke tag and test case number
        title: test.title.replace(' @smoke', '').replace(/ \[C\d+\]/, '')
      , fullTitle: test.fullTitle().replace(' @smoke', '').replace(/ \[C\d+\]/, '')
      , duration: test.duration
    }
  } else if(test.duration == null) {
      return {
          title: test.title.replace(' @smoke', '').replace(/ \[C\d+\]/, '')
        , fullTitle: test.fullTitle().replace(' @smoke', '').replace(/ \[C\d+\]/, '')
        , duration: 0
        , err: test.err.message
      }
    } else {
      return {
          title: test.title.replace(' @smoke', '').replace(/ \[C\d+\]/, '')
        , fullTitle: test.fullTitle().replace(' @smoke', '').replace(/ \[C\d+\]/, '')
        , duration: test.duration
        , err: test.err.message
    }
  }
}

