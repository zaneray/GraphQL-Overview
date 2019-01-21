import classNames from 'classnames'
import { upperFirst } from 'lodash/fp'
import MuiCard from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { mergeClasses } from '../../utils/material-ui-extras'

const styles = ({ palette, spacing, layout }) => ({
  root: {
    backgroundColor: palette.brand.light,
    padding: spacing.paddingUnit,
  },
  rootGutterTop: {
    marginTop: spacing.marginUnit,
  },
  rootGutterBottom: {
    marginBottom: spacing.marginUnit,
  },
  rootFull: {
    maxWidth: layout.fullWidth,
  },
  rootThreeQuarter: {
    width: layout.threeQuarterWidth,
  },
  rootHalf: {
    width: layout.halfWidth,
  },
  rootThird: {
    width: layout.thirdWidth,
  },
  rootQuarter: {
    width: layout.quarterWidth,
  },
  rootNegative: {
    border: `1px solid ${palette.emotions.negative}`,
  },
  rootPositive: {
    border: `1px solid ${palette.emotions.positive}`,
  },
  rootNeutral: {
    border: `1px solid ${palette.emotions.neutral}`,
  },
})


const Card = ({
  classes,
  classes: classesProp,
  emotion,
  children,
  span,
  flat,
  elevation,
  gutterBototm,
  gutterTop,
  ...props
}) => (
  <MuiCard
    {...props}
    elevation={flat ? 0 : elevation}
    classes={mergeClasses(
    {
      root: classNames(
        classes.root,
        classes[`root${upperFirst(span)}`],
        classes[`root${upperFirst(gutterTop)}`],
        classes[`root${upperFirst(gutterBototm)}`],
        classes[`root${upperFirst(emotion)}`],
      ),
    },
    classesProp,
  )}
>
    {children}
  </MuiCard>
)

Card.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
  emotion: PropTypes.oneOf(['negative', 'neutral', 'positive']),
  span: PropTypes.oneOf(['full', 'threeQuarter', 'half', 'third', 'quarter']),
  flat: PropTypes.bool,
  elevation: PropTypes.number,
  gutterBototm: PropTypes.bool,
  gutterTop: PropTypes.bool,
}

Card.defaultProps = {
  emotion: 'neutral',
  span: 'full',
  flat: false,
  gutterBototm: false,
  gutterTop: false,
}
export default compose(
  withTheme(),
  withStyles(styles)
)(Card)
