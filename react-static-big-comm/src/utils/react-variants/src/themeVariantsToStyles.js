import invariant from 'invariant'
import {concat, isEmpty, isFunction, isPlainObject} from 'lodash/fp'

/*
  This function applies a mapping function (mapVariantToStyles) to an object (themeVariants) of
  variantName/themeVariants key/value pairs. The result is a new object of the pattern styleName/styles.

  For example, given these themeVariants:

    {
      go: {
        color: 'green',
        backgroundColor: 'white'
      },
      stop: {
        color: 'red',
        backgroundColor: 'black'
      }
    }

  and this mapVariantToStylesFunction:

    const mapVariantToStyles = variant => ({
      button: {
        backgroundColor: variant.backgroundColor
      },
      buttonText: {
        color: variant.color
      }
    })

  The return value will be:

    {
      'button-go': {
        backgroundColor: 'white'
      },
      'buttonText-go': {
        color: 'green'
      },
      'button-stop': {
        backgroundColor: 'black'
      },
      'buttonText-stop': {
        color: 'red'
      }
    }
 */

export default (mapVariantToStyles, themeVariants) =>
  Object.entries(themeVariants)
    .map(([variantName, themeVariant]) =>
      Object.entries(mapVariantToStyles(themeVariant, variantName))
        .map(([styleName, style]) => ({
          [`${styleName}-${variantName}`]: style // suffix each style name with the variant name
        }))
    )
    .reduce(concat)
    .reduce((memo, variantStylesPair) => ({...memo, ...variantStylesPair}), {}) // combine all the objects into one
