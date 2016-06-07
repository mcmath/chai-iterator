export default function(chai) {
  let {assert, Assertion} = chai;

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
}
