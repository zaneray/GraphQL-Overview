import PropTypes from 'prop-types'
import { Component } from 'react'
import { PROVIDER_CONTEXT_NAME } from './constants'

class ApolloTagProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    mapNetworkStatusToLoading: PropTypes.func,
    onError: PropTypes.func,
    renderError: PropTypes.func,
    renderLoading: PropTypes.func,
  }

  static defaultProps = {
    mapNetworkStatusToLoading: networkStatus => networkStatus < 7,
  }

  static childContextTypes = {
    [PROVIDER_CONTEXT_NAME]: PropTypes.object.isRequired,
  }

  getChildContext () {
    const {
      mapNetworkStatusToLoading, onError, renderError, renderLoading,
    } = this.props

    return {
      [PROVIDER_CONTEXT_NAME]: {
        mapNetworkStatusToLoading,
        onError,
        renderLoading,
        renderError,
      },
    }
  }

  render () {
    return this.props.children
  }
}

export default ApolloTagProvider
