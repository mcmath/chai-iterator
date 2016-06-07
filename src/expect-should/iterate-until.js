import slice from '../util/slice';
import IterateMethodHelper from '../helpers/iterate-method';

export default function(chai, utils) {
  let helper = new IterateMethodHelper(chai, utils);

  chai.Assertion.addMethod('until', helper.create('to end iteration with',
    function(exp) {
      let it = this._obj[Symbol.iterator]();
      let actual = slice(it, 0, exp.length);

      for (let value of it) {
        actual.push(value);
        actual.shift();
      }

      return actual;
    }
  ));
}
