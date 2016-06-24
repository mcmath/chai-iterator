(function(chaiIterator) {
  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof exports === 'object') {
    module.exports = chaiIterator;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return chaiIterator; });
  } else {
    chai.use(chaiIterator);
  }

}(function(chai, utils) {
  'use strict';

  var Assertion = chai.Assertion;
  var assert = chai.assert;

  var ELLIPSIS = unquote('...');

  // Expect/should assertions =============================

  Assertion.addProperty('iterable', function() {
    this.assert(isIterable(this._obj),
      'expected #{this} to be iterable',
      'expected #{this} not to be iterable'
    );
  });

  Assertion.addProperty('iterate', function() {
    new Assertion(this._obj).iterable;

    utils.flag(this, 'iterate', true);
  });

  Assertion.addMethod('over', iterateMethod('to iterate over', function(exp) {
    var it = this._obj[Symbol.iterator]();
    var actual = slice(it, exp.length + 2);
    var suffix = it.next().done ? [] : [ELLIPSIS];

    return actual.concat(suffix);
  }));

  Assertion.addMethod('from', iterateMethod('to begin iteration with', function(exp) {
    return slice(this._obj, exp.length);
  }));

  Assertion.addMethod('until', iterateMethod('to end iteration with', function(exp) {
    var it = this._obj[Symbol.iterator]();
    var actual = slice(it, exp.length);
    var step = it.next();

    while (!step.done) {
      actual.push(step.value);
      actual.shift();
      step = it.next();
    }

    return actual;
  }));

  // Assert methods =======================================

  assert.isIterable = function(value, msg) {
    new Assertion(value, msg).iterable;
  };

  assert.isNotIterable = function(value, msg) {
    new Assertion(value, msg).not.iterable;
  };

  assert.iteratesFrom = function(value, exp, msg) {
    new Assertion(value, msg).iterate.from(exp);
  };

  assert.doesNotIterateFrom = function(value, exp, msg) {
    new Assertion(value, msg).not.iterate.from(exp);
  };

  assert.deepIteratesFrom = function(value, exp, msg) {
    new Assertion(value, msg).deep.iterate.from(exp);
  };

  assert.doesNotDeepIterateFrom = function(value, exp, msg) {
    new Assertion(value, msg).not.deep.iterate.from(exp);
  };

  assert.iteratesOver = function(value, exp, msg) {
    new Assertion(value, msg).iterate.over(exp);
  };

  assert.doesNotIterateOver = function(value, exp, msg) {
    new Assertion(value, msg).not.iterate.over(exp);
  };

  assert.deepIteratesOver = function(value, exp, msg) {
    new Assertion(value, msg).deep.iterate.over(exp);
  };

  assert.doesNotDeepIterateOver = function(value, exp, msg) {
    new Assertion(value, msg).not.deep.iterate.over(exp);
  };

  assert.iteratesUntil = function(value, exp, msg) {
    new Assertion(value, msg).iterate.until(exp);
  };

  assert.doesNotIterateUntil = function(value, exp, msg) {
    new Assertion(value, msg).not.iterate.until(exp);
  };

  assert.deepIteratesUntil = function(value, exp, msg) {
    new Assertion(value, msg).deep.iterate.until(exp);
  };

  assert.doesNotDeepIterateUntil = function(value, exp, msg) {
    new Assertion(value, msg).not.deep.iterate.until(exp);
  };

  // Helpers ==============================================

  function iterateMethod(predicate, getActual) {
    return function(iterable) {
      assert(utils.flag(this, 'iterate'), 'the iterate flag must be set');
      new Assertion(iterable).iterable;

      var exp = slice(iterable);
      var act = getActual.call(this, exp);

      var deep = utils.flag(this, 'deep') ? ' deep' : '';

      this.assert(compareArrays(exp, act, deep),
        'expected #{this} ' + predicate + deep + ' values #{exp}, but got #{act}',
        'expected #{this} not ' + predicate + deep + ' values #{exp}',
        exp,
        act
      );
    }
  }

  // Utilities ============================================

  function isIterable(value) {
    return value != null && typeof value[Symbol.iterator] === 'function';
  }

  function strictEqual(a, b) {
    return a === b;
  }

  function compareArrays(exp, act, deep) {
    var equalFn = deep ? utils.eql : strictEqual;

    return exp.length === act.length && exp.every(function(value, i) {
      return equalFn(value, act[i]);
    });
  }

  function slice(iterable, stop) {
    stop = stop == null ? Infinity : stop;

    var result = [];
    var max = stop - 1;
    var it = iterable[Symbol.iterator]();
    var step = it.next();

    for (var i = 0; i <= max && !step.done; i++) {
      result.push(step.value);
      if (i < max) step = it.next();
    }

    return result;
  }

  function unquote(str) {
    return {
      inspect: function() { return this.toString(); },
      toString: function() { return str; }
    };
  }

}));
