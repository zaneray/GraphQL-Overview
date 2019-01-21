/* eslint no-prototype-builtins: "off" */
import { Component } from 'react'
import { getDisplayName, setDisplayName, shouldUpdate, wrapDisplayName } from 'recompose'
import shallowEqual from './shallowEqualOmitReactElements'

export default BaseComponent => {
  if (Component.isPrototypeOf(BaseComponent)) {
    class EnhancedComponent extends BaseComponent {
      shouldComponentUpdate (nextProps, nextState) {
        if (!super.shouldComponentUpdate || super.shouldComponentUpdate(nextProps, nextState)) {
          if (this.state !== nextState || !shallowEqual(this.props, nextProps)) {
            console.log(`II: ${getDisplayName(BaseComponent)}.shouldComponentUpdate: true`)
            return true
          }
        }
        console.log(`II: ${getDisplayName(BaseComponent)}.shouldComponentUpdate: false`)
        return false
      }
    }
    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'pure'))(EnhancedComponent)
    }

    return EnhancedComponent
  }
  const enhancer = shouldUpdate(
    (props, nextProps) => {
      const retVal = !shallowEqual(props, nextProps)
      console.log(`HOC: ${getDisplayName(BaseComponent)}.shouldComponentUpdate: `, retVal)
      return retVal
    }
  )

  const EnhancedComponent = enhancer(BaseComponent)

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pure'))(EnhancedComponent)
  }

  return EnhancedComponent
}
