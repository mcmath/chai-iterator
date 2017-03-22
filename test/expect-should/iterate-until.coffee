err = require '../helpers/err'
customIterableFactory = require '../fixtures/custom'

describe 'expect/should: iterate.until(iterable)', ->

  context 'final values yielded by target match iterable', ->

    it 'passes', ->
      [2, 3, 5].should.iterate.until [2, 3, 5]
      [2, 3, 5].should.iterate.until [3, 5]
      [2, 3, 5].should.iterate.until []
      'abcdefg'.should.iterate.until 'efg'

    it 'throws when negated', ->
      err -> [2, 3, 5].should.not.iterate.until [2, 3, 5]
      err -> [2, 3, 5].should.not.iterate.until [3, 5]
      err -> [2, 3, 5].should.not.iterate.until []
      err -> 'abcdefg'.should.not.iterate.until 'efg'

  context 'final values yielded by target do not match iterable', ->

    it 'throws', ->
      err -> [2, 3, 5].should.iterate.until [2, 3]

    it 'passes when negated', ->
      [2, 3, 5].should.not.iterate.until [2, 3]

  context 'deep flag is set', ->

    it 'uses deep equality to compare values', ->
      [{id: 2}, {id: 3}].should.deep.iterate.until [{id: 3}]
      [{id: 2}, {id: 3}].should.not.iterate.until [{id: 3}]

  context 'iterate flag is not set', ->

    it 'throws whether negated or not', ->
      err -> [2, 3, 5].should.until [3, 5]
      err -> [2, 3, 5].should.not.until [2, 3]

  context 'iterator returned by @@iterator is not itself iterable', ->

    it 'works correctly', ->
      iterable = customIterableFactory();
      err -> iterable.should.iterate.until [3, 5]
      iterable.should.iterate.until [1, 2]
