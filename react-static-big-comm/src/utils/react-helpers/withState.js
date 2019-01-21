import { observer } from 'mobx-react'
import React from 'react'
import State from './State'

export default initialState => BaseComponent => {
  const EnhancedComponent = observer(BaseComponent)

  return props =>
    (
      <State initialState={initialState}>
        {
        ({ state, setState }) => <EnhancedComponent {...props} state={state} setState={setState} />
      }
      </State>
    )
}
