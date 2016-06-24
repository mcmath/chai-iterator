module.exports = () ->
  Object.defineProperty {}, Symbol.iterator,
    value: ->
      i = 0
      next: ->
        value: i++
        done: i > 3
