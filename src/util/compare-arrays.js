export default function(exp, act, equalFn) {
  equalFn = equalFn || strictEqual;

  return exp.length === act.length && exp.every((value, i) => {
    return equalFn(value, act[i]);
  });
}

function strictEqual(a, b) {
  return a === b;
}
