import classNames from 'classnames'
import {assignWith} from 'lodash/fp'

const customizer = (objValue, srcValue) => classNames(objValue, srcValue)

export default (...classes) =>
  classes
    .reduce(assignWith(customizer), {})
