err = require '../helpers/err'

describe 'expect/should: iterate.from(iterable)', ->

  context 'initial values yielded by target match iterable', ->

    it 'passes', ->
      [2, 3, 5].should.iterate.from [2, 3, 5]
      [2, 3, 5].should.iterate.from [2, 3]
      [2, 3, 5].should.iterate.from []
      'abcdefg'.should.iterate.from 'abc'

    it 'throws when negated', ->
      err -> [2, 3, 5].should.not.iterate.from [2, 3, 5]
      err -> [2, 3, 5].should.not.iterate.from [2, 3]
      err -> [2, 3, 5].should.not.iterate.from []
      err -> 'abcdefg'.should.not.iterate.from 'abc'

  context 'initial values yielded by target do not match iterable', ->

    it 'throws', ->
      err -> [2, 3, 5].should.iterate.from [3, 5]

    it 'passes when negated', ->
      [2, 3, 5].should.not.iterate.from [3, 5]

  context 'deep flag is set', ->

    it 'uses deep equality to compare values', ->
      [{id: 2}, {id: 3}].should.deep.iterate.from [{id: 2}]
      [{id: 2}, {id: 3}].should.not.iterate.from [{id: 2}]

  context 'iterate flag is not set', ->

    it 'throws whether negated or not', ->
      err -> [2, 3, 5].should.from [2, 3]
      err -> [2, 3, 5].should.not.from [3, 5]
