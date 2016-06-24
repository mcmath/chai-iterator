{assert} = require 'chai'
{customGenerator, infiniteGenerator} = require '../fixtures'
{err} = require '../helpers'

describe 'assert: lengthOf(act, len, [msg])', ->

  context '@act is an iterable without a length:number property', ->
    customIterable =

    beforeEach ->
      customIterable = customGenerator()

    it 'passes if @act has length of @len', ->
      assert.lengthOf(customIterable, 3)

    it 'throws if @act does not have length of @n', ->
      err -> assert.lengthOf(customIterable, 4)
      err -> assert.lengthOf(customIterable, 2)

    it 'works on infinite iterables', ->
      err -> assert.lengthOf(infiniteGenerator(), 200);

  context '@act has a length:number property', ->

    it 'uses original method', ->
      assert.lengthOf [2, 3, 5], 3
      err -> assert.lengthOf [2, 3, 5], 4
