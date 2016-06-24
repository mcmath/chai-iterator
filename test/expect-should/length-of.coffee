{infiniteGenerator} = require '../fixtures'
{err} = require '../helpers'

describe 'expect/should: iterate.for.lengthOf(n)', ->

  it 'passes if the target has length @n', ->
    [2, 3, 5].should.iterate.for.lengthOf 3

  it 'throws if the target does not have length @n', ->
    err -> [2, 3, 5].should.iterate.for.lengthOf 4
    err -> [2, 3, 5].should.iterate.for.lengthOf 2

  it 'works on infinite iterables', ->
    err -> infiniteGenerator().should.iterate.for.lengthOf 200

  it 'maintains original assertion', ->
    [2, 3, 5].should.have.lengthOf 3
    err -> [2, 3, 5].should.have.lengthOf 2

describe 'expect/should: not.iterate.for.lengthOf(n)', ->

  it 'throws if the target has length @n', ->
    [2, 3, 5].should.not.iterate.for.lengthOf 4
    [2, 3, 5].should.not.iterate.for.lengthOf 2

  it 'passes if the target does not have length @n', ->
    err -> [2, 3, 5].should.not.iterate.for.lengthOf 3

  it 'works on infinite iterables', ->
    infiniteGenerator().should.not.iterate.for.lengthOf 200
