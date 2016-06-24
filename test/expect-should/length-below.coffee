{infiniteGenerator} = require '../fixtures'
{err} = require '../helpers'

describe 'expect/should: iterate.for.length.below(n)', ->

  it 'passes if the target has length below @n', ->
    [2, 3, 5].should.iterate.for.length.below 4

  it 'throws if the target does not have length below @n', ->
    err -> [2, 3, 5].should.iterate.for.length.below 2
    err -> [2, 3, 5].should.iterate.for.length.below 3

  it 'works on infinite iterables', ->
    err -> infiniteGenerator().should.iterate.for.length.below 200

  it 'maintains original assertion', ->
    [2, 3, 5].should.have.length.below 4
    err -> [2, 3, 5].should.have.length.below 3

describe 'expect/should: not.iterate.for.length.below(n)', ->

  it 'throws if the target has length below @n', ->
    [2, 3, 5].should.not.iterate.for.length.below 2
    [2, 3, 5].should.not.iterate.for.length.below 3

  it 'passes if the target does not have length below @n', ->
    err -> [2, 3, 5].should.not.iterate.for.length.below 4

  it 'works on infinite iterables', ->
    infiniteGenerator().should.not.iterate.for.length.below 200
