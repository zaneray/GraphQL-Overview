import test from 'ava'
import createMapThemeToStyles from '../src/createMapThemeToStyles'
import testTheme from './testTheme'
import testVariantConfig from './testVariantConfig'

test('Uses test data correctly', t => {
  const result = createMapThemeToStyles('components.button.variants', testVariantConfig, {})(testTheme)

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
    },
    'button-left': {
      textAlign: 'left'
    },
    'buttonIcon-left': {
      iconName: 'left-arrow'
    },
    'button-right': {
      textAlign: 'right'
    },
    'buttonIcon-right': {
      iconName: 'right-arrow'
    }
  })
})
