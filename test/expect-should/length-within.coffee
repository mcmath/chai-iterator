{infiniteGenerator} = require '../fixtures'
{err} = require '../helpers'

describe 'expect/should: iterate.for.length.within(min, max)', ->

  it 'passes if the target has lenght between @min and @max, inclusive', ->
    [2, 3, 5].should.iterate.for.length.within 2, 4
    [2, 3, 5].should.iterate.for.length.within 3, 3

  it 'throws if the target does not have length between @min and @max, inclusive', ->
    err -> [2, 3, 5].should.iterate.for.length.within 0, 2
    err -> [2, 3, 5].should.iterate.for.length.within 4, 6

  it 'works on infinite iterables', ->
    err -> infiniteGenerator().should.iterate.for.length.within 200, 300

  it 'maintains original assertion', ->
    [2, 3, 5].should.have.length.within 2, 4
    err -> [2, 3, 5].should.have.length.within 4, 5

describe 'expect/should: not.iterate.for.length.within(n)', ->

  it 'throws if the target has length between @min and @max, inclusive', ->
    [2, 3, 5].should.not.iterate.for.length.within 0, 2
    [2, 3, 5].should.not.iterate.for.length.within 4, 6

  it 'passes if the target does not have length between @min and @max, inclusive', ->
    err -> [2, 3, 5].should.not.iterate.for.length.within 2, 4
    err -> [2, 3, 5].should.not.iterate.for.length.within 3, 3

  it 'works on infinite iterables', ->
    infiniteGenerator().should.not.iterate.for.length.within 200, 300
