import slice from '../util/slice';
import unquote from '../util/unquote';
import IterateMethodHelper from '../helpers/iterate-method';

const ELLIPSIS = unquote('...');

export default function(chai, utils) {
  let helper = new IterateMethodHelper(chai, utils);

  chai.Assertion.addMethod('over', helper.create('to iterate over',
    function(exp) {
      let it = this._obj[Symbol.iterator]();
      let actual = slice(it, 0, exp.length + 2);
      let suffix = it.next().done ? [] : [ELLIPSIS];

      return actual.concat(suffix);
    }
  ));
}
