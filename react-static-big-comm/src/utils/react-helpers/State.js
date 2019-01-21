import { omit } from 'lodash/fp'
import { action, extendObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Component } from 'react'

class State extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired,
  }

  @observable $state = {}

  constructor ({ initialState }) {
    super()
    extendObservable(this.$state, initialState)
  }

  @action setState = nextState => Object.assign(this.$state, nextState)

  render () {
    const cleanedProps = omit('initialState')(this.props)
    return this.props.children({
      state: this.$state,
      setState: this.setState,
      ...cleanedProps,
    })
  }
}

export default observer(State)
