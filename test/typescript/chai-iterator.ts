import chai = require("chai");
import chaiIterator = require("../..");
const {assert} = chai;

chai.should();

// Plugin function

chai.use(chaiIterator);

// Expect/Should

[2, 3, 5].should.be.iterable;
"abcdefg".should.be.iterable;

[2, 3, 5].should.iterate.over([2, 3, 5]);
"abcdefg".should.iterate.over("abcdefg");
[{id: 2}, {id: 3}].should.deep.iterate.over([{id: 2}, {id: 3}]);

[2, 3, 5].should.iterate.from([2, 3]);
"abcdefg".should.iterate.from("abc");
[{id: 2}, {id: 3}].should.deep.iterate.from([{id: 2}]);

[2, 3, 5].should.iterate.until([3, 5]);
"abcdefg".should.iterate.until("efg");
[{id: 2}, {id: 3}].should.deep.iterate.until([{id: 3}]);

[2, 3, 5].should.iterate.for.lengthOf(3);
[2, 3, 5].should.iterate.for.length.above(2);
[2, 3, 5].should.iterate.for.length.below(4);
[2, 3, 5].should.iterate.for.length.of.at.least(3);
[2, 3, 5].should.iterate.for.length.of.at.most(3);
[2, 3, 5].should.iterate.for.length.within(2, 4);

// Assert

assert.isIterable([2, 3, 5]);
assert.isNotIterable(235);

assert.iteratesOver([2, 3, 5], [2, 3, 5]);
assert.doesNotIterateOver([2, 3, 5], [2, 3, 7]);
assert.deepIteratesOver([{id: 2}, {id: 3}], [{id: 2}, {id: 3}]);
assert.doesNotDeepIterateOver([{id: 2}, {id: 3}], [{id: 2}, {id: 5}]);

assert.iteratesFrom([2, 3, 5], [2, 3]);
assert.doesNotIterateFrom([2, 3, 5], [3, 5]);
assert.deepIteratesFrom([{id: 2}, {id: 3}], [{id: 2}]);
assert.doesNotDeepIterateFrom([{id: 2}, {id: 3}], [{id: 3}]);

assert.iteratesUntil([2, 3, 5], [3, 5]);
assert.doesNotIterateUntil([2, 3, 5], [2, 3]);
assert.deepIteratesUntil([{id: 2}, {id: 3}], [{id: 3}]);
assert.doesNotDeepIterateUntil([{id: 2}, {id: 3}], [{id: 2}]);

assert.lengthOf([2, 3, 5], 3);
