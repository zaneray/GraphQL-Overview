import { isArray } from 'lodash/fp'
import React from 'react'

const is = (x, y) => x === y || (x !== x && y !== y) // eslint-disable-line

const isReactElement = val => React.isValidElement(val) ||
  (isArray(val) && val.some(React.isValidElement))

export default (objA, objB) => {
  if (is(objA, objB)) {
    return true
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  const entriesA = Object.entries(objA)
  const keysB = Object.keys(objB)

  if (entriesA.length !== keysB.length) {
    return false
  }

  return !entriesA.some(([key, valueA]) => !is(valueA, objB[key]) && !isReactElement(valueA))
}
