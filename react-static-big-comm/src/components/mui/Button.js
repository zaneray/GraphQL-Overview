import classNames from 'classnames'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { floor, upperFirst } from 'lodash/fp'
import MuiButton from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import React from 'react'
import { mergeClasses } from '../../utils/material-ui-extras'

const styles = ({ palette, spacing }) => ({
  root: {
    borderRadius: floor(spacing.borderRadius / 2),
    paddingTop: 0,
    paddingBottom: 0,
  },
  rootNegativeFlat: {
    color: palette.emotions.negative,
    backgroundColor: palette.emotions.negative,
    '&:hover': {
      backgroundColor: palette.emotions.negative,
    },
  },
  rootNeutralFlat: {
    color: palette.brand.light,
    backgroundColor: palette.emotions.neutral,
    '&:hover': {
      backgroundColor: palette.emotions.neutral,
    },
  },
  rootPositiveFlat: {
    color: palette.emotions.positive,
    backgroundColor: palette.emotions.positive,
    '&:hover': {
      backgroundColor: palette.emotions.positive,
    },
  },
  rootNegativeRaised: {
    color: palette.emotions.negative,
    backgroundColor: palette.emotions.negative,
    '&:hover': {
      backgroundColor: palette.emotions.negative,
    },
  },
  rootNeutralRaised: {
    color: palette.emotions.neutral,
    backgroundColor: palette.emotions.neutral,
    '&:hover': {
      backgroundColor: palette.emotions.neutral,
    },
  },
  rootPositiveRaised: {
    color: palette.emotions.positive,
    backgroundColor: palette.emotions.positive,
    '&:hover': {
      backgroundColor: palette.emotions.positive,
    },
  },
  rootDisabledFlat: {
    color: palette.neutral.grey,
    backgroundColor: palette.neutral.grey,
  },
  rootDisabledRaised: {
    color: palette.neutral.grey,
    backgroundColor: palette.neutral.grey,
  },
})

const Classes = withStyles(styles)

const Button = ({
  children,
  classes,
  classes: classesProp,
  disabled,
  emotion,
  isInProgress,
  raised,
  renderInProgress,
  ...props
}) => (
  <MuiButton
    {...props}
    children={
      <span>
      {children}
      {isInProgress ? renderInProgress() : null}
    </span>
  }
    classes={mergeClasses(
    {
      root: classNames(
        classes.root,
        classes[`root${upperFirst(emotion)}${raised ? 'Raised' : 'Flat'}`],
        disabled && classes[`rootDisabled${raised ? 'Raised' : 'Flat'}`],
      ),
    },
    classesProp,
  )}
    disabled={disabled}
    raised={raised}
/>

)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  emotion: PropTypes.oneOf(['negative', 'neutral', 'positive']).isRequired,
  isInProgress: PropTypes.bool.isRequired,
  raised: PropTypes.bool.isRequired,
  renderInProgress: PropTypes.func,
}

Button.defaultProps = {
  disabled: false,
  emotion: 'neutral',
  isInProgress: false,
  raised: false,
  renderInProgress: () => null,
}

export default compose(
  withTheme(),
  withStyles(styles)
)(Button)

