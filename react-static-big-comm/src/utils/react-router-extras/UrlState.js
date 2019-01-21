import querystring from 'query-string'
import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

const UrlState = ({ children }) =>
  (
    <Route>
      {
      ({ match, location }) => {
        const urlState = {
          ...match.params,
          ...querystring.parse(location.search),
        }

        return children(urlState)
      }
    }
    </Route>
  )

UrlState.propTypes = {
  children: PropTypes.func.isRequired,
}

export default UrlState
