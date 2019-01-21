import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

const NavigationLink = ({children, to}) => <Link to={to}>{children}</Link>

NavigationLink.propTypes = {
  children: PropTypes.elem,
  to: PropTypes.string.isRequired,
}

export default NavigationLink
