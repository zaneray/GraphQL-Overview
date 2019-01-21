import React from 'react'
import PropTypes from 'prop-types'
import { mediaQueries } from '../../utils/jss-extras'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { compose } from 'recompose'

const styles = () => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridColumnGap: '20px',
    gridRowGap: '20px',
    ...mediaQueries({
      smAndUp: {
        gridTemplateColumns: '1fr 1fr',
      },
      mdAndUp: {
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    }),
  },
})


const ThreeColumnGrid = ({ children, classes }) => (
  <div className={classes.container}>{children}</div>
)

ThreeColumnGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default compose(
  withTheme(),
  withStyles(styles)
)(ThreeColumnGrid)
