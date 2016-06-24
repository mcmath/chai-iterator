{infiniteGenerator} = require '../fixtures'
{err} = require '../helpers'

describe 'expect/should: iterate.for.length.above(n)', ->

  it 'passes if the target has length above @n', ->
    [2, 3, 5].should.iterate.for.length.above 2

  it 'throws if the target does not have length above @n', ->
    err -> [2, 3, 5].should.iterate.for.length.above 3
    err -> [2, 3, 5].should.iterate.for.length.above 4

  it 'works on infinite iterables', ->
    infiniteGenerator().should.iterate.for.length.above 200

  it 'maintains original assertion', ->
    [2, 3, 5].should.have.length.above 2
    err -> [2, 3, 5].should.have.length.above 3

describe 'expect/should: not.iterate.for.length.above(n)', ->

  it 'throws if the target has length above @n', ->
    [2, 3, 5].should.not.iterate.for.length.above 3
    [2, 3, 5].should.not.iterate.for.length.above 4

  it 'passes if the target does not have length above @n', ->
    err -> [2, 3, 5].should.not.iterate.for.length.above 2

  it 'works on infinite iterables', ->
    err -> infiniteGenerator().should.not.iterate.for.length.above 200
