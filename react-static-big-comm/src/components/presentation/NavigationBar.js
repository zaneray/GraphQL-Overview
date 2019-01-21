import React from 'react'
import NavigationLink from './NavigationLink'
import AppBar from '../mui/AppBar'
import withRoot from '../../withRoot'
import {withStyles} from '../../utils/css-in-jss'
import PropTypes from 'prop-types'

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    border: 'solid 3px purple',
  },
})

const Classes = withStyles(styles)

const NavigationBar = ({classes}) => (
  <Classes>
    {classes => (
      <AppBar className={classes.root}>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/about/">About</NavigationLink>
        <NavigationLink to="/products/">Products</NavigationLink>
        <NavigationLink to="/posts/">Posts</NavigationLink>
      </AppBar>
    )}
  </Classes>
)

NavigationBar.propTypes = {
  classes: PropTypes.func.isRequired,
}

export default withRoot(NavigationBar)
