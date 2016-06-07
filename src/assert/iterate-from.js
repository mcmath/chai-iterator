export default function(chai) {
  let {assert, Assertion} = chai;

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
}
