
/* eslint react/no-children-prop: "off" */
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import State from './State'

const Opened = ({ children, defaultOpened, ...props }) =>
  (<State
    initialState={{ isOpened: defaultOpened }}
    children={
      ({ state, setState, ...rest }) => {
        const setOpened = opened => setState({ isOpened: opened })

        const toggleOpened = () => setState({ isOpened: !state.isOpened })

        return children({
isOpened: state.isOpened, setOpened, toggleOpened, ...rest,
})
      }
    }
    {...props}
  />)

Opened.propTypes = {
  children: PropTypes.func.isRequired,
  defaultOpened: PropTypes.bool,
}

Opened.defaultProps = {
  defaultOpened: false,
}

export default observer(Opened)
