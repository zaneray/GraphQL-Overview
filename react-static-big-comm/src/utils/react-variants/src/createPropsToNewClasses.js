import invariant from 'invariant'
import {mapValues} from 'lodash/fp'
import mergeClassObjects from './mergeClassObjects'

/*
  This function is called after injectSheet has been called. At this point, jss styles have been injected into the
  DOM and a 'classes' prop has been passed down that contains new class names. We want to take the currently active
  variants and use those to modify the classes prop.
 */

export default variantConfigs => props => {
  const {classes} = props

  console.log('props', props)

  const variantClassNames = Object.keys(classes)
  const styleNameToClassNamesMap = {}
  variantConfigs
    .forEach(({allowedVariants, propName, defaultVariant}) => {
      const variants = props[propName] || defaultVariant
      variants && variants
        .split(/\s+/)
        .forEach(activeVariant => {
          invariant(allowedVariants.includes(activeVariant), `Expected ${activeVariant} to be in allowedVariants array: ${allowedVariants}`)
          variantClassNames.forEach(className => {
            const execResult = /^[^.-]+/.exec(className)
            const styleName = execResult && execResult[0]
            if (styleName && className.endsWith(activeVariant)) {
              styleNameToClassNamesMap[styleName] = styleNameToClassNamesMap[styleName] || []
              styleNameToClassNamesMap[styleName].push(classes[className])
            }
          })
        })
    })

  console.log('styleNameToClassNamesMap', styleNameToClassNamesMap)

  const variantClasses = mapValues(arr => arr.join(' '))(styleNameToClassNamesMap)

  console.log('variantClasses', variantClasses)

  return mergeClassObjects(
    classes,
    variantClasses
  )
}
