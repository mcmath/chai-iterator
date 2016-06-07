err = require '../helpers/err'

describe 'expect/should: iterable', ->

  context 'target has an @@iterator method', ->

    it 'passes', ->
      [2, 3, 5].should.be.iterable
      'abcdefg'.should.be.iterable

    it 'throws when negated', ->
      err -> [2, 3, 5].should.not.be.iterable
      err -> 'abcdefg'.should.not.be.iterable

  context 'target lacks an @@iterator method', ->

    it 'throws', ->
      err -> (235).should.be.iterable
      err -> (true).should.be.iterable

    it 'passes when negated', ->
      (235).should.not.be.iterable
      (true).should.not.be.iterable
