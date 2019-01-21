import invariant from 'invariant'
import { compact, isArray, isEmpty, isFunction, isPlainObject, isString, omit } from 'lodash/fp'
import injectSheet, { withTheme } from 'react-jss'
import { compose, mapProps } from 'recompose'
import createMapThemeToStyles from './createMapThemeToStyles'
import createMapThemeToProps from './createMapThemeToProps'
import createPropsToNewClasses from './createPropsToNewClasses'
import createPropsToNewProps from './createPropsToNewProps'

export default ({ styles = {}, themePath, variantConfigs }) => {
  if (__DEV__) {
    invariant(
      themePath && isString(themePath),
      `Expected themePath to be a string. Got ${themePath}`
    )
    invariant(
      styles && (isFunction(styles) || isPlainObject(styles)),
      `Expected styles to be an object or function. Got ${styles}`
    )
    invariant(
      variantConfigs && isArray(variantConfigs) && !isEmpty(variantConfigs),
      `Expected variant configs to be a non-empty array. Got ${variantConfigs}`
    )
    invariant(
      variantConfigs.every(
        vc => isArray(vc.allowedVariants) && !isEmpty(vc.allowedVariants) && vc.allowedVariants.every(isString)
      ),
      `Expected allowedVariants to be a non-empty array of strings. Got ${variantConfigs}`
    )
    invariant(
      variantConfigs.every(
        vc => (vc.mapVariantToStyles != null || vc.mapVariantToProps != null) &&
        (vc.mapVariantToStyles == null || isFunction(vc.mapVariantToStyles)) &&
        (vc.mapVariantToProps == null || isFunction(vc.mapVariantToProps))
      ),
      `Expected either or both mapVariantToStyles or mapVariantToProps to be set and be functions. Got ${variantConfigs}`
    )
    invariant(
      variantConfigs.every(
        vc => vc.propName && isString(vc.propName)
      ),
      `Expected propName to be a non-empty string. Got ${variantConfigs}`
    )
    invariant(
      variantConfigs.every(
        vc => vc.defaultVariant == null || isString(vc.defaultVariant)
      ),
      `Expected defaultVariant to be a string. Got ${variantConfigs}`
    )
  }

  const mapThemeToStyles = createMapThemeToStyles(themePath, variantConfigs, styles)

  const mapThemeToProps = createMapThemeToProps(themePath, variantConfigs)

  const propsToNewProps = createPropsToNewProps(variantConfigs)

  const propsToNewClasses = createPropsToNewClasses(variantConfigs)

  const propNames = variantConfigs.map(({ propName }) => propName)

  // const willInjectStyles = variantConfigs.some(({mapVariantToStyles}) => isFunction(mapVariantToStyles))
  //
  const willInjectProps = variantConfigs.some(({ mapVariantToProps }) => isFunction(mapVariantToProps))

  const mapPropsToNewProps = props => ({
    classes: propsToNewClasses(props),
    ...(willInjectProps ? propsToNewProps(props) : {}),
    ...omit(['classes', 'variantToPropsMap', ...propNames])(props),
  })

  return compose(
    ...compact(
      [
        injectSheet(mapThemeToStyles), // todo: fix the damn react warnings
        willInjectProps ? withTheme(mapThemeToProps) : undefined,
        mapProps(mapPropsToNewProps),
      ]
    )
  )
}
