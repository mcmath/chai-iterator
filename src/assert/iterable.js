export default function(chai) {
  let {assert, Assertion} = chai;

  assert.isIterable = function(value, msg) {
    new Assertion(value, msg).iterable;
  };

  assert.isNotIterable = function(value, msg) {
    new Assertion(value, msg).not.iterable;
  };
}
