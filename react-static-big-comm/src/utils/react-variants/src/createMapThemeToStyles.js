import invariant from 'invariant'
import {get, isEmpty, isPlainObject, pick} from 'lodash/fp'
import themeVariantsToStyles from './themeVariantsToStyles'

/*
  Curried function. First invocation creates a mapThemetoStyles function that can be passed to injectSheet.
  Second invocation then converts the theme into a styles object.
 */

export default (themePath, variantConfigs, styles) => theme => {
  const themeVariants = get(themePath)(theme)
  invariant(
    themeVariants && isPlainObject(themeVariants) && !isEmpty(themeVariants),
    `Expected to find theme variants at ${themePath}. Got ${themeVariants}`
  )
  styles = isPlainObject(styles) ? styles : styles(theme)

  return {
    ...styles,
    ...variantConfigs
      .map(
        ({allowedVariants, mapVariantToStyles}) =>
          mapVariantToStyles
            ? themeVariantsToStyles(mapVariantToStyles, pick(allowedVariants)(themeVariants))
            : {}
      )
      .reduce((memo, styles) => ({...memo, ...styles}), {}) // todo: rename styles!
  }
}
