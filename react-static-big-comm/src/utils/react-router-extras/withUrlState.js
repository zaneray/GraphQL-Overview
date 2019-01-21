import invariant from 'invariant'
import { isFunction } from 'lodash/fp'
import React from 'react'
import UrlState from './UrlState'

export default mapUrlToProps => {
  invariant(!mapUrlToProps || isFunction(mapUrlToProps), `Expected mapUrlToProps to be a function. Got ${mapUrlToProps}`)

  return BaseComponent => {
    const WithUrlState = props => (
      <UrlState>
        {
          urlState => {
            const newProps = mapUrlToProps ? mapUrlToProps(urlState) : { urlState }

            return <BaseComponent {...props} {...newProps} />
          }
        }
      </UrlState>
    )

    return WithUrlState
  }
}
