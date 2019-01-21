import invariant from 'invariant'
import { isBoolean, isFunction, isPlainObject } from 'lodash/fp'
import PropTypes from 'prop-types'
import { wrapDisplayName } from 'recompose'
import injectSheet from './injectSheet'

export default (styles, { hoc = false } = {}) => {
  invariant(isFunction(styles) || isPlainObject(styles), `Expected styles to be a function or plain object. Got ${styles}`)
  invariant(isBoolean(hoc), `Expected hoc to be a boolean. Got ${hoc}`)

  const enhancer = injectSheet(styles)

  if (hoc) {
    return BaseComponent => {
      const WrappedComponent = enhancer(BaseComponent)
      WrappedComponent.displayName = wrapDisplayName(BaseComponent, 'withStyles')
      return WrappedComponent
    }
  }
  const WithStylesInner = ({ children, classes }) => children(classes)

  WithStylesInner.propTypes = {
    children: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  const WithStyles = enhancer(WithStylesInner)
  WithStyles.displayName = 'WithStyles'
  return WithStyles
}
