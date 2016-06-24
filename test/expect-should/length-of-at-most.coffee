{infiniteGenerator} = require '../fixtures'
{err} = require '../helpers'

describe 'expect/should: iterate.for.length.of.at.most(n)', ->

  it 'passes if the target has length of at most @n', ->
    [2, 3, 5].should.iterate.for.length.of.at.most 3
    [2, 3, 5].should.iterate.for.length.of.at.most 4

  it 'throws if the target does not have length of at most @n', ->
    err -> [2, 3, 5].should.iterate.for.length.of.at.most 2

  it 'works on infinite iterables', ->
    err -> infiniteGenerator().should.iterate.for.length.of.at.most 200

  it 'maintains original assertion', ->
    [2, 3, 5].should.have.length.of.at.most 3
    err -> [2, 3, 5].should.have.length.of.at.most 2

describe 'expect/should: not.iterate.for.length.of.at.most(n)', ->

  it 'throws if the target has length of at most @n', ->
    [2, 3, 5].should.not.iterate.for.length.of.at.most 2

  it 'passes if the target does not have length of at most @n', ->
    err -> [2, 3, 5].should.not.iterate.for.length.of.at.most 3
    err -> [2, 3, 5].should.not.iterate.for.length.of.at.most 4

  it 'works on infinite iterables', ->
    infiniteGenerator().should.not.iterate.for.length.of.at.most 200
