export default function(chai) {
  let {assert, Assertion} = chai;

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
}
