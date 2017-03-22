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

  var noop = function() {};

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
    return slice(this._obj[Symbol.iterator](), exp.length);
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

  Assertion.addProperty('for', noop);

  Assertion.overwriteMethod('lengthOf', function(_super) {
    return function(exp) {
        if (utils.flag(this, 'iterate')) {
          var len = iterableLength(this._obj, exp);

        this.assert(
          len === exp,
          'expected #{this} to iterate for length of #{exp}, but got #{act}',
          'expected #{this} not to iterate for length of #{exp}',
          exp,
          len
        );

      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('above', function(_super) {
    return function(exp) {
      if (utils.flag(this, 'iterate')) {
        var len = iterableLength(this._obj, exp);

        this.assert(
          len > exp,
          'expected #{this} to iterate for length above #{exp}, but got #{act}',
          'expected #{this} not to iterate for length above #{exp}',
          exp,
          len
        );

      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('below', function(_super) {
    return function(exp) {
      if (utils.flag(this, 'iterate')) {
        var max = exp + 100;
        var len = iterableLength(this._obj, max);
        var act = len === Infinity ? unquote('more than ' + max) : len;

        this.assert(
          len < exp,
          'expected #{this} to iterate for length below #{exp}, but got #{act}',
          'expected #{this} not to iterate for length below #{exp}',
          exp,
          act
        );

      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('least', function(_super) {
    return function(exp) {
      if (utils.flag(this, 'iterate')) {
        var len = iterableLength(this._obj, exp);

        this.assert(
          len >= exp,
          'expected #{this} to iterate for length of at least #{exp}, but got #{act}',
          'expected #{this} not to iterate for length of at least #{exp}',
          exp,
          len
        );

      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('most', function(_super) {
    return function(exp) {
      if (utils.flag(this, 'iterate')) {
        var max = exp + 100;
        var len = iterableLength(this._obj, max);
        var act = len === Infinity ? unquote('more than ' + max) : len;

        this.assert(
          len <= exp,
          'expected #{this} to iterate for length of at most #{exp}, but got #{act}',
          'expected #{this} not to iterate for length of at most #{exp}',
          exp,
          act
        );

      } else {
        _super.apply(this, arguments);
      }
    };
  });

  Assertion.overwriteMethod('within', function(_super) {
    return function(min, max) {
      if (utils.flag(this, 'iterate')) {
        var cutoff = max + 100;
        var len = iterableLength(this._obj, cutoff);
        var exp = unquote(min + 'and' + max);
        var act = len === Infinity ? unquote('more than ' + cutoff) : len;

        this.assert(
          min <= len && len <= max,
          'expected #{this} to iterate for length within #{exp}, but got #{act}',
          'expected #{this} not to iterate for length within #{exp}',
          exp,
          act
        );

      } else {
        _super.apply(this, arguments);
      }
    };
  });

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

  var _lengthOf = assert.lengthOf;

  assert.lengthOf = function(value, exp, msg) {
    if (isIterable(value) && typeof value.length !== 'number') {
      new Assertion(value, msg).iterate.for.lengthOf(exp);
    } else {
      _lengthOf.apply(assert, arguments);
    }
  }

  // Helpers ==============================================

  function iterateMethod(predicate, getActual) {
    return function(iterable) {
      assert(utils.flag(this, 'iterate'), 'the iterate flag must be set');
      new Assertion(iterable).iterable;

      var exp = slice(iterable[Symbol.iterator]());
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

  function iterableLength(iterable, max) {
    max = max == null ? Infinity : max;

    var it = iterable[Symbol.iterator]();

    for (var i = 0; i <= max; i++) {
      if (it.next().done) {
        return i;
      }
    }

    return Infinity;
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

  function slice(it, stop) {
    stop = stop == null ? Infinity : stop;

    var result = [];
    var max = stop - 1;
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
