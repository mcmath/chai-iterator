import iterableAssert from './assert/iterable';
import iterateFromAssert from './assert/iterate-from';
import iterateOverAssert from './assert/iterate-over';
import iterateUntilAssert from './assert/iterate-until';

import iterableAssertion from './expect-should/iterable';
import iterateOverAssertion from './expect-should/iterate-over';
import iterateFromAssertion from './expect-should/iterate-from';
import iterateUntilAssertion from './expect-should/iterate-until';
import iterateAssertion from './expect-should/iterate';

export default function chaiIterator(chai, utils) {
  iterableAssert(chai, utils);
  iterateFromAssert(chai, utils);
  iterateOverAssert(chai, utils);
  iterateUntilAssert(chai, utils);

  iterableAssertion(chai, utils);
  iterateOverAssertion(chai, utils);
  iterateFromAssertion(chai, utils);
  iterateUntilAssertion(chai, utils);
  iterateAssertion(chai, utils);
}
