import test from 'ava'
import createMapThemeToProps from '../src/createMapThemeToProps'
import createPropsToNewProps from '../src/createPropsToNewProps'
import testTheme from './testTheme'
import testVariantConfig from './testVariantConfig'

test('createPropsToNewProps', t => {
  const props1 = {
    activity: 'go',
    direction: 'left',
    ...createMapThemeToProps('components.button.variants', testVariantConfig)(testTheme)
  }

  const props2 = {
    activity: 'stop',
    direction: 'right',
    ...createMapThemeToProps('components.button.variants', testVariantConfig)(testTheme)
  }

  const result1 = createPropsToNewProps(testVariantConfig)(props1)
  const result2 = createPropsToNewProps(testVariantConfig)(props2)

  t.deepEqual(result1, {
    style: {
      backgroundColor: 'white',
      textAlign: 'left'
    },
    textStyle: {
      color: 'green'
    },
    icon: 'left-arrow'
  })

  t.deepEqual(result2, {
    style: {
      backgroundColor: 'black',
      textAlign: 'right'
    },
    textStyle: {
      color: 'red'
    },
    icon: 'right-arrow'
  })
})
