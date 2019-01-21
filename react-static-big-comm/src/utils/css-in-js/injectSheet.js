import injectSheet from 'react-jss'
import theming from './theming'

const defaultOptions = { theming }

export default (stylesOrSheet, options = {}) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }

  return injectSheet(stylesOrSheet, mergedOptions)
}
