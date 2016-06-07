/* global window, global, self */

export default function(chaiIterator) {
  let g = globalScope();

  if (!isNode(g) && !isAMD(g) && isGlobal(g)) {
    g.chai.use(chaiIterator);
  }
}

function globalScope() {
  return typeof window !== 'undefined' ? window :
    typeof global !== 'undefined' ? global :
    typeof self !== 'undefined' ? self :
    this;
}

function isNode(g) {
  return typeof g.exports === 'object' && typeof g.module === 'object';
}

function isAMD(g) {
  return typeof g.define === 'function' && g.define.amd;
}

function isGlobal(g) {
  return typeof g.chai === 'object' && typeof g.chai.use === 'function';
}
