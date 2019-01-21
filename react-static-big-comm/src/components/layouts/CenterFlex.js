import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { compose } from 'recompose'

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})


const CenterFlex = ({ children, classes }) => (
  <div className={classes.container}>{children}</div>
)

CenterFlex.propTypes = {
  children: PropTypes.node.isRequired,
}

export default compose(
  withTheme(),
  withStyles(styles)
)(CenterFlex)
