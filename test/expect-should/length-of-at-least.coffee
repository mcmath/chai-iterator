{infiniteGenerator} = require '../fixtures'
{err} = require '../helpers'

describe 'expect/should: iterate.for.length.of.at.least(n)', ->

  it 'passes if the target has length of at least @n', ->
    [2, 3, 5].should.iterate.for.length.of.at.least 2
    [2, 3, 5].should.iterate.for.length.of.at.least 3

  it 'throws if the target does not have length of at least @n', ->
    err -> [2, 3, 5].should.iterate.for.length.of.at.least 4

  it 'works on infinite iterables', ->
    infiniteGenerator().should.iterate.for.length.of.at.least 200

  it 'maintains original assertion', ->
    [2, 3, 5].should.have.length.of.at.least 3
    err -> [2, 3, 5].should.have.length.of.at.least 4

describe 'expect/should: not.iterate.for.length.of.at.least(n)', ->

  it 'throws if the target has length of at least @n', ->
    [2, 3, 5].should.not.iterate.for.length.of.at.least 4

  it 'passes if the target does not have length of at least @n', ->
    err -> [2, 3, 5].should.not.iterate.for.length.of.at.least 2
    err -> [2, 3, 5].should.not.iterate.for.length.of.at.least 3

  it 'works on infinite iterables', ->
    err -> infiniteGenerator().should.not.iterate.for.length.of.at.least 200
