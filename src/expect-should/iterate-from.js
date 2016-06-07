import slice from '../util/slice';
import IterateMethodHelper from '../helpers/iterate-method';

export default function(chai, utils) {
  let helper = new IterateMethodHelper(chai, utils);

  chai.Assertion.addMethod('from', helper.create('to begin iteration with',
    function(exp) {
      return slice(this._obj, 0, exp.length);
    }
  ));
}
