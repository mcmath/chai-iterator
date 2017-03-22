{assert} = require 'chai'
customIterableFactory = require '../fixtures/custom'
err = require '../helpers/err'

describe 'assert: iteratesFrom(value, expected, [message])', ->

  context 'initial yielded values match expected values', ->

    it 'passes', ->
      assert.iteratesFrom [2, 3, 5], [2, 3, 5]
      assert.iteratesFrom [2, 3, 5], [2, 3]
      assert.iteratesFrom [2, 3, 5], []

  context 'initial yielded values do not match expected values', ->

    it 'throws', ->
      err -> assert.iteratesFrom [2, 3, 5], [3, 5]

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.iteratesFrom [2, 3, 5], [3, 5], 'ukraine'), 'ukraine')

  context 'value is not iterable', ->

    it 'throws', ->
      err -> assert.iteratesFrom true, []

  context 'expected is not iterable', ->

    it 'throws', ->
      err -> assert.iteratesFrom [], true

describe 'assert: doesNotIterateFrom(value, expected, [message])', ->

  context 'initial yielded do not values match expected values', ->

    it 'passes', ->
      assert.doesNotIterateFrom [2, 3, 5], [3, 5]

  context 'initial yielded values match expected values', ->

    it 'throws', ->
      err -> assert.doesNotIterateFrom [2, 3, 5], [2, 3, 5]
      err -> assert.doesNotIterateFrom [2, 3, 5], [2, 3]
      err -> assert.doesNotIterateFrom [2, 3, 5], []

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.doesNotIterateFrom [2, 3, 5], [2, 3], 'belarus'), 'belarus')

  context 'value is not iterable', ->

    it 'throws', ->
      err -> assert.doesNotIterateFrom true, []

  context 'expected is not iterable', ->

    it 'throws', ->
      err -> assert.doesNotIterateFrom [], true

describe 'assert: deepIteratesFrom(value, expected, [message])', ->

  context 'yielded values deeply equal expected values', ->

    it 'passes', ->
      assert.deepIteratesFrom([{id: 1}, {id: 2}], [{id: 1}])

  context 'yielded values do not deeply equal expected values', ->

    it 'throws', ->
      err -> assert.deepIteratesFrom([{id: 1}, {id: 2}], [{id: 2}])

describe 'assert: doesNotDeepIterateFrom(value, expected, [message])', ->

  context 'yielded values do not deeply equal expected values', ->

    it 'passes', ->
      assert.doesNotDeepIterateFrom([{id: 1}, {id: 2}], [{id: 2}])

  context 'yielded values deeply equal expected values', ->

    it 'throws', ->
      err -> assert.doesNotDeepIterateFrom([{id: 1}, {id: 2}], [{id: 1}])

  context 'iterator returned by @@iterator is not itself iterable', ->

    it 'works correctly', ->
      iterable = customIterableFactory();
      err -> assert.iteratesFrom(iterable, [2, 3]);
      assert.iteratesFrom(iterable, [0, 1]);
