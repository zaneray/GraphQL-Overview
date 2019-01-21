import test from 'ava'
import createMapThemeToProps from '../src/createMapThemeToProps'
import testTheme from './testTheme'
import testVariantConfig from './testVariantConfig'

test('createMapThemeToPropsMap', t => {
  const result = createMapThemeToProps('components.button.variants', testVariantConfig)(testTheme)

  t.deepEqual(result, {
    variantToPropsMap: {
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
      },
      left: {
        style: {
          textAlign: 'left'
        },
        icon: 'left-arrow'
      },
      right: {
        style: {
          textAlign: 'right'
        },
        icon: 'right-arrow'
      }
    }
  })
})
