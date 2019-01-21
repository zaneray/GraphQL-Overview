import {Icon} from '../mui'
import {defaultProps} from 'recompose'

const makeIconComponent = (ligature, thirdParty) => {
  const enhancer = defaultProps({
    ligature,
    thirdParty,
  })

  return enhancer(Icon)
}

export const Spinner = makeIconComponent('fa fa-spinner fa-pulse fa-fw', true)
