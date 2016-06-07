import isIterable from '../util/is-iterable';

export default function(chai) {
  let {Assertion} = chai;

  Assertion.addProperty('iterable', function() {
    this.assert(
      isIterable(this._obj),
      'expected #{this} to be iterable',
      'expected #{this} not to be iterable'
    );
  });
}
