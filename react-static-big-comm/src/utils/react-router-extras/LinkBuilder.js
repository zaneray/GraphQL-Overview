import PropTypes from 'prop-types'
import React from 'react'
import { Link, Route } from 'react-router-dom'

const LinkBuilder = ({
  children,
  exact,
  isActive: getIsActive,
  location: locationProp,
  strict,
  to,
}) => {
  /*
    The guts of this component are copied from react-router-dom/NavLink
   */

  // This will discard everything after the '?', so that a match only needs
  // to match the left hand side of the url.
  const path = (typeof to === 'object' ? to.pathname : to).split('?')[0]

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

  return (
    <Route path={escapedPath} exact={exact} strict={strict} location={locationProp}>
      {({ history, location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, location) : match)
        const navigate = () => (/^[a-z]+:/.test(to) ? window.open(to) : history.push(to))

        return children({ isActive, navigate })
      }}
    </Route>
  )
}

LinkBuilder.propTypes = {
  children: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  isActive: PropTypes.func,
  location: PropTypes.object,
  strict: PropTypes.bool,
  to: Link.propTypes.to,
}

export default LinkBuilder
