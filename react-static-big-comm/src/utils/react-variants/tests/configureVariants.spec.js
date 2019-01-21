import React from 'react'
import test from 'ava'
import {configureVariants} from '../src'

test.beforeEach(t => {
  t.context.WrappedComponent = sinon.spy()
})

test('Throws with bad variant configs', t => {
  t.throws(() => configureVariants('good.theme.path', [
    {
      allowedVariants: ['foo', 'bar'],
      mapVariantToStyles: () => {}
    }
  ]))
})

test('Throws with null theme path', t => {
  t.throws(() => configureVariants({
    themePath: null
  }))
})

test('Throws with missing theme path', t => {
  t.throws(() => configureVariants({
    themePath: 'bad.path'
  }))
})
