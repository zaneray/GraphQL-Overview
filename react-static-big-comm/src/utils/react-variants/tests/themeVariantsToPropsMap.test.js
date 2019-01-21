import test from 'ava'
import {pick} from 'lodash/fp'
import themeVariantsToPropsMap from '../src/themeVariantsToPropsMap'
import testTheme from './testTheme'

test('Returns correct result', t => {
  const mapVariantToProps = variant => ({
    propName: variant.variantProperty
  })

  const themeVariants = {
    firstVariant: {
      variantProperty: 'firstValue'
    },
    secondVariant: {
      variantProperty: 'secondValue'
    }
  }

  const correctResult = {
    firstVariant: {
      propName: 'firstValue'
    },
    secondVariant: {
      propName: 'secondValue'
    }
  }

  const result = themeVariantsToPropsMap(mapVariantToProps, themeVariants)

  t.deepEqual(result, correctResult)
})

test('Uses test data correctly', t => {
  const mapVariantToProps = variant => ({
    style: {
      backgroundColor: variant.backgroundColor
    },
    textStyle: {
      color: variant.color
    }
  })

  const result = themeVariantsToPropsMap(mapVariantToProps, pick(['go', 'stop'])(testTheme.components.button.variants))
  t.deepEqual(result, {
    go: {
      style: {
        backgroundColor: 'white'
      },
      textStyle: {
        color: 'green'
      }
    },
    stop: {
      style: {
        backgroundColor: 'black'
      },
      textStyle: {
        color: 'red'
      }
    }
  })
})
