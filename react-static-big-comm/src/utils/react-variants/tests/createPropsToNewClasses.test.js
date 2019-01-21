import test from 'ava'
import createPropsToNewClasses from '../src/createPropsToNewClasses'
import testClasses from './testClasses'
import testVariantConfig from './testVariantConfig'

test.beforeEach(t => {
  t.context = {
    variantConfigs: [
      {
        propName: 'variantProp',
        allowedVariants: ['firstValue', 'secondValue']
      },
      {
        propName: 'secondVariantProp',
        allowedVariants: ['thirdValue', 'forthValue']
      }
    ],
    classes: {
      'style-firstValue': 'style-firstValue-1',
      'style-secondValue': 'style-secondValue-2',
      'style-thirdValue': 'style-thirdValue-3',
      'style-forthValue': 'style-forthValue-4'
    }
  }
})

test('Single variant prop with single value', t => {
  const props = {
    variantProp: 'firstValue',
    classes: t.context.classes
  }

  const correctResult = {
    ...props.classes,
    style: 'style-firstValue-1'
  }

  const result = createPropsToNewClasses(t.context.variantConfigs)(props)

  t.deepEqual(result, correctResult)
})

test('Single variant prop with two values', t => {
  const props = {
    variantProp: 'firstValue secondValue',
    classes: t.context.classes
  }

  const correctResult = {
    ...props.classes,
    style: 'style-firstValue-1 style-secondValue-2'
  }

  const result = createPropsToNewClasses(t.context.variantConfigs)(props)

  t.deepEqual(result, correctResult)
})

test('Two variant props with single value', t => {
  const props = {
    variantProp: 'firstValue',
    secondVariantProp: 'thirdValue',
    classes: t.context.classes
  }

  const correctResult = {
    ...props.classes,
    style: 'style-firstValue-1 style-thirdValue-3'
  }

  const result = createPropsToNewClasses(t.context.variantConfigs)(props)

  t.deepEqual(result, correctResult)
})

test('Two variant props with two values', t => {
  const props = {
    variantProp: 'firstValue secondValue',
    secondVariantProp: 'thirdValue forthValue',
    classes: t.context.classes
  }

  const correctResult = {
    ...props.classes,
    style: 'style-firstValue-1 style-secondValue-2 style-thirdValue-3 style-forthValue-4'
  }

  const result = createPropsToNewClasses(t.context.variantConfigs)(props)

  t.deepEqual(result, correctResult)
})

test('Uses test data correctly', t => {
  const props1 = {
    activity: 'go',
    direction: 'left',
    classes: testClasses
  }

  const props2 = {
    activity: 'stop',
    direction: 'right',
    classes: testClasses
  }

  const result1 = createPropsToNewClasses(testVariantConfig)(props1)
  const result2 = createPropsToNewClasses(testVariantConfig)(props2)

  t.deepEqual(result1, {
    ...testClasses,
    button: 'button-go-1 button-left-3',
    buttonText: 'buttonText-go-5',
    buttonIcon: 'buttonIcon-left-7'
  })

  t.deepEqual(result2, {
    ...testClasses,
    button: 'button-stop-2 button-right-4',
    buttonText: 'buttonText-stop-6',
    buttonIcon: 'buttonIcon-right-8'
  })
})
