{assert} = require 'chai'
customIterableFactory = require '../fixtures/custom'
err = require '../helpers/err'

describe 'assert: iteratesUntil(value, expected, [message])', ->

  context 'final yielded values match expected values', ->

    it 'passes', ->
      assert.iteratesUntil [2, 3, 5], [2, 3, 5]
      assert.iteratesUntil [2, 3, 5], [3, 5]
      assert.iteratesUntil [2, 3, 5], []

  context 'final yielded values do not match expected values', ->

    it 'throws', ->
      err -> assert.iteratesUntil [2, 3, 5], [2, 3]

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.iteratesUntil [2, 3, 5], [2, 3], 'kenya'), 'kenya')

  context 'value is not iterable', ->

    it 'throws', ->
      err -> assert.iteratesUntil true, []

  context 'expected is not iterable', ->

    it 'throws', ->
      err -> assert.iteratesUntil [], true

describe 'assert: doesNotIterateUntil(value, expected, [message])', ->

  context 'final yielded do not values match expected values', ->

    it 'passes', ->
      assert.doesNotIterateUntil [2, 3, 5], [2, 3]

  context 'final yielded values match expected values', ->

    it 'throws', ->
      err -> assert.doesNotIterateUntil [2, 3, 5], [2, 3, 5]
      err -> assert.doesNotIterateUntil [2, 3, 5], [3, 5]
      err -> assert.doesNotIterateUntil [2, 3, 5], []

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.doesNotIterateUntil [2, 3, 5], [3, 5], 'tanzania'), 'tanzania')

  context 'value is not iterable', ->

    it 'throws', ->
      err -> assert.doesNotIterateUntil true, []

  context 'expected is not iterable', ->

    it 'throws', ->
      err -> assert.doesNotIterateUntil [], true

describe 'assert: deepIteratesUntil(value, expected, [message])', ->

  context 'final yielded values deeply equal expected values', ->

    it 'passes', ->
      assert.deepIteratesUntil([{id: 1}, {id: 2}], [{id: 2}])

  context 'final yielded values do not deeply equal expected values', ->

    it 'throws', ->
      err -> assert.deepIteratesUntil([{id: 1}, {id: 2}], [{id: 1}])

describe 'assert: doesNotDeepIterateUntil(value, expected, [message])', ->

  context 'final yielded values do not deeply equal expected values', ->

    it 'passes', ->
      assert.doesNotDeepIterateUntil([{id: 1}, {id: 2}], [{id: 1}])

  context 'final yielded values deeply equal expected values', ->

    it 'throws', ->
      err -> assert.doesNotDeepIterateUntil([{id: 1}, {id: 2}], [{id: 2}])

  context 'iterator returned by @@iterator is not itself iterable', ->

    it 'works correctly', ->
      iterable = customIterableFactory();
      err -> assert.iteratesUntil(iterable, [3, 5]);
      assert.iteratesUntil(iterable, [1, 2]);
