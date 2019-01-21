import React from 'react'
import MuiAppBar from '@material-ui/core/AppBar'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { mergeClasses } from '../../utils/material-ui-extras'


const styles = ({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.brand.lightPrimary,
    padding: spacing.paddingUnit * 2,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
})


const AppBar = ({
  classes, classes: classesProp, children, ...props
}) => (
  <MuiAppBar {...props} classes={mergeClasses({ root: classes.root }, classesProp)}>
    {children}
  </MuiAppBar>
)

AppBar.propTypes = {
  children: PropTypes.array.isRequired,
  classes: PropTypes.object,
}

export default compose(
  withTheme(),
  withStyles(styles)
)(AppBar)
