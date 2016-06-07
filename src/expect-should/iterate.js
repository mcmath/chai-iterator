export default function(chai, utils) {
  let {Assertion} = chai;

  Assertion.addProperty('iterate', function() {
    new Assertion(this._obj).iterable;
    
    utils.flag(this, 'iterate', true);
  });
}
