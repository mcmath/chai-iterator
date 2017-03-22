err = require '../helpers/err'
customIterableFactory = require '../fixtures/custom'

describe 'expect/should: iterate.over(iterable)', ->

  context 'values yielded by target exactly match iterable', ->

    it 'passes', ->
      [2, 3, 5].should.iterate.over [2, 3, 5]
      'abcdefg'.should.iterate.over 'abcdefg'

    it 'throws when negated', ->
      err -> [2, 3, 5].should.not.iterate.over [2, 3, 5]
      err -> 'abcdefg'.should.not.iterate.over 'abcdefg'

  context 'values yielded by target do not exactly match iterable', ->

    it 'throws', ->
      err -> [2, 3, 5].should.iterate.over [2, 3, 5, 7]
      err -> [2, 3, 5].should.iterate.over [2, 3, 6]
      err -> [2, 3, 5].should.iterate.over [2, 3]
      err -> [2, 3, 5].should.iterate.over [3, 5]

    it 'passes when negated', ->
      [2, 3, 5].should.not.iterate.over [2, 3, 5, 7]
      [2, 3, 5].should.not.iterate.over [2, 3, 6]
      [2, 3, 5].should.not.iterate.over [2, 3]
      [2, 3, 5].should.not.iterate.over [3, 5]

  context 'deep flag is set', ->

    it 'uses deep equality to compare values', ->
      [{id: 2}, {id: 3}].should.deep.iterate.over [{id: 2}, {id: 3}]
      [{id: 2}, {id: 3}].should.not.iterate.over [{id: 2}, {id: 3}]

  context 'iterate flag is not set', ->

    it 'throws whether negated or not', ->
      err -> [2, 3, 5].should.over [2, 3, 5]
      err -> [2, 3, 5].should.not.over [2, 3, 6]

  context 'iterator returned by @@iterator is not itself iterable', ->

    it 'works correctly', ->
      iterable = customIterableFactory();
      err -> iterable.should.iterate.over [2, 3, 5]
      iterable.should.iterate.over [0, 1, 2]
