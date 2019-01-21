import PropTypes from 'prop-types'
import { getContext } from 'recompose'
import { PROVIDER_CONTEXT_NAME } from './constants'

export default getContext({
  [PROVIDER_CONTEXT_NAME]: PropTypes.object.isRequired,
})
