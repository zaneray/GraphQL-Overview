import React from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { mediaQueries } from '../../utils/jss-extras'

const styles = () => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1 fr 1fr',
    gridColumnGap: '20px',
    gridRowGap: '20px',
    ...mediaQueries({
      smAndUp: {
        gridTemplateColumns: '1fr 1fr',
      },
      mdAndUp: {
        gridTemplateColumns: '1fr 1fr',
      },
    }),
  },
})


const TwoColumnGrid = ({ children, classes }) => (
  <div className={classes.container}>{children}</div>
)

TwoColumnGrid.propTypes = {
  children: PropTypes.node.isRequired,
}

export default compose(
  withTheme(),
  withStyles(styles)
)(TwoColumnGrid)
