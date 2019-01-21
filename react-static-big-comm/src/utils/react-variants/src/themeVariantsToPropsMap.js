import invariant from 'invariant'
import {isEmpty, isFunction, isPlainObject} from 'lodash/fp'

/*
  This function applies a mapping function (mapVariantToProps) to an object (themeVariants) of
  variantName/themeVariants key/value pairs. The result is a new object of the pattern variant -> prop -> value.

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

  and this mapVariantToProps:

    const mapVariantToProps = variant => ({
      style: {
        backgroundColor: variant.backgroundColor
      },
      textStyle: {
        color: variant.color
      }
    })

  The return value will be:

    {
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
      }
    }
*/

export default (mapVariantToProps, themeVariants) =>
  Object.entries(themeVariants)
    .map(([variantName, themeVariant]) => ({
      [variantName]: mapVariantToProps(themeVariant, variantName)
    }))
    .reduce((memo, variantPropsPair) => ({...memo, ...variantPropsPair}), {})
