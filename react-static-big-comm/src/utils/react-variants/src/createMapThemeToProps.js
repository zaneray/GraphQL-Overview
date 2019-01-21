import invariant from 'invariant'
import {get, isEmpty, isPlainObject, pick} from 'lodash/fp'
import themeVariantsToPropsMap from './themeVariantsToPropsMap'

export default (themePath, variantConfigs) => theme => {
  const themeVariants = get(themePath)(theme)
  invariant(
    themeVariants && isPlainObject(themeVariants) && !isEmpty(themeVariants),
    `Expected to find theme variants at ${themePath}. Got ${themeVariants}`
  )

  const variantToPropsMap = variantConfigs
    .map(
      ({allowedVariants, mapVariantToProps}) =>
        mapVariantToProps
          ? themeVariantsToPropsMap(mapVariantToProps, pick(allowedVariants)(themeVariants))
          : {}
    )
    .reduce((memo, propsMap) => ({...memo, ...propsMap}), {})

  return {variantToPropsMap}
}
