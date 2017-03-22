{assert} = require 'chai'
customIterableFactory = require '../fixtures/custom'
err = require '../helpers/err'

describe 'assert: iteratesOver(value, expected, [message])', ->

  context 'value yields exactly the same values as expected', ->

    it 'passes', ->
      assert.iteratesOver [2, 3, 5], [2, 3, 5]

  context 'value does not yield exactly the same values as expected', ->

    it 'throws', ->
      err -> assert.iteratesOver [2, 3, 5], [2, 3, 5, 7]
      err -> assert.iteratesOver [2, 3, 5], [2, 3, 6]
      err -> assert.iteratesOver [2, 3, 5], [2, 3]
      err -> assert.iteratesOver [2, 3, 5], [3, 5]

  context 'number of yielded values is much larger than expected', ->

    it 'truncates actual values in error message', ->
      err((-> assert.iteratesOver [2, 3, 5, 7, 11], [2]), '...')

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.iteratesOver [2, 3, 5], [2, 3, 6], 'ecuador'), 'ecuador')

  context 'value is not iterable', ->

    it 'throws', ->
      err -> assert.iteratesOver true, []

  context 'expected is not iterable', ->

    it 'throws', ->
      err -> assert.iteratesOver [], true

describe 'assert: doesNotIterateOver(value, expected, [message])', ->

  context 'value does not yields exactly the same values as expected', ->

    it 'passes', ->
      assert.doesNotIterateOver [2, 3, 5], [2, 3, 5, 7]
      assert.doesNotIterateOver [2, 3, 5], [2, 3, 6]
      assert.doesNotIterateOver [2, 3, 5], [2, 3]
      assert.doesNotIterateOver [2, 3, 5], [3, 5]

  context 'value yields exactly the same values as expected', ->

    it 'throws', ->
      err -> assert.doesNotIterateOver [2, 3, 5], [2, 3, 5]

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.doesNotIterateOver [2, 3, 5], [2, 3, 5], 'bolivia'), 'bolivia')

  context 'value is not iterable', ->

    it 'throws', ->
      err -> assert.doesNotIterateOver true, []

  context 'expected is not iterable', ->

    it 'throws', ->
      err -> assert.doesNotIterateOver [], true

describe 'assert: deepIteratesOver(value, expected, [message])', ->

  context 'initial yielded values deeply equal expected values', ->

    it 'passes', ->
      assert.deepIteratesOver([{id: 1}, {id: 2}], [{id: 1}, {id: 2}])

  context 'initial yielded values do not deeply equal expected values', ->

    it 'throws', ->
      err -> assert.deepIteratesOver([{id: 1}, {id: 2}], [{id: 2}, {id: 1}])

describe 'assert: doesNotDeepIterateOver(value, expected, [message])', ->

  context 'initial yielded values do not deeply equal expected values', ->

    it 'passes', ->
      assert.doesNotDeepIterateOver([{id: 1}, {id: 2}], [{id: 2}, {id: 1}])

  context 'initial yielded values deeply equal expected values', ->

    it 'throws', ->
      err -> assert.doesNotDeepIterateOver([{id: 1}, {id: 2}], [{id: 1}, {id: 2}])

  context 'iterator returned by @@iterator is not itself iterable', ->

    it 'works correctly', ->
      iterable = customIterableFactory();
      err -> assert.iteratesOver(iterable, [2, 3, 5]);
      assert.iteratesOver(iterable, [0, 1, 2]);
