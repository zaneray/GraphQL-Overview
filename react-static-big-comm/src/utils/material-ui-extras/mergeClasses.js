import classNames from 'classnames'
import { assignAllWith } from 'lodash/fp'

const customizer = (objValue, srcValue) => classNames(objValue, srcValue)

export default (...classes) => assignAllWith(customizer)(classes)
