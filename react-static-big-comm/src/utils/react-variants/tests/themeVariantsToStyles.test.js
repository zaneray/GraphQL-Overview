import test from 'ava'
import {pick} from 'lodash/fp'
import themeVariantsToStyles from '../src/themeVariantsToStyles'
import testTheme from './testTheme'

test('Returns correct result', t => {
  const mapVariantToStyles = variant => ({
    styleName: {
      cssProperty: variant.variantProperty
    }
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
    'styleName-firstVariant': {
      cssProperty: 'firstValue'
    },
    'styleName-secondVariant': {
      cssProperty: 'secondValue'
    }
  }

  const result = themeVariantsToStyles(mapVariantToStyles, themeVariants)

  t.deepEqual(result, correctResult)
})

test('Uses test data correctly', t => {
  const mapVariantToStyles = variant => ({
    button: {
      backgroundColor: variant.backgroundColor
    },
    buttonText: {
      color: variant.color
    }
  })

  const result = themeVariantsToStyles(mapVariantToStyles, pick(['go', 'stop'])(testTheme.components.button.variants))

  t.deepEqual(result, {
    'button-go': {
      backgroundColor: 'white'
    },
    'button-stop': {
      backgroundColor: 'black'
    },
    'buttonText-go': {
      color: 'green'
    },
    'buttonText-stop': {
      color: 'red'
    }
  })
})
