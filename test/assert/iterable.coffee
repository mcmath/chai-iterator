{assert} = require 'chai'
err = require '../helpers/err'

describe 'assert: isIterable(value, [message])', ->

  context 'value is an iterable object', ->

    it 'passes', ->
      assert.isIterable [2, 3, 5]
      assert.isIterable 'abcdefg'

  context 'value is not an iterable object', ->

    it 'throws', ->
      err -> assert.isIterable 235
      err -> assert.isIterable true

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.isIterable 235, 'norway'), 'norway')

describe 'assert: isNotIterable(value, [message])', ->

  context 'value is an iterable object', ->

    it 'passes', ->
      assert.isNotIterable 235
      assert.isNotIterable true

  context 'value is not an iterable object', ->

    it 'throws', ->
      err -> assert.isNotIterable [2, 3, 5]
      err -> assert.isNotIterable 'abcdefg'

  context 'a message is passed', ->

    it 'logs message on error', ->
      err((-> assert.isNotIterable [2, 3, 5], 'sweden'), 'sweden')
