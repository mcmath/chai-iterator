import compareArrays from '../util/compare-arrays';
import slice from '../util/slice';

export default class IterateMethodHelper {

  constructor(chai, utils) {
    this.Assertion = chai.Assertion;
    this.assert = chai.assert;
    this.utils = utils;
  }

  create(predicate, getActual) {
    let {Assertion, assert, utils} = this;

    return function(iterable) {
      assert(utils.flag(this, 'iterate'), 'the iterate flag must be set');
      new Assertion(iterable).iterable;

      let exp = slice(iterable);
      let act = getActual.call(this, exp);

      let deep = utils.flag(this, 'deep') ? ' deep' : '';

      this.assert(
        compareArrays(exp, act, deep ? utils.eql : null),
        `expected #{this} ${predicate}${deep} values #{exp}, but got #{act}`,
        `expected #{this} not ${predicate}${deep} values #{exp}`,
        exp,
        act
      );
    }
  }
}
