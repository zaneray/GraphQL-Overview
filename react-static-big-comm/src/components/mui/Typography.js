import MuiTypography from '@material-ui/core/Typography'
import { withStyles, withTheme } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { compose } from 'recompose'

const styles = ({ palette, typography, spacing }) => ({
  common: {
    color: palette.brand.primaryText,
  },
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  primary: {
    color: palette.brand.primary,
  },
  bold: {
    fontWeight: 'bold',
  },
  light: {
    color: palette.brand.lightPrimary,
  },
  accent: {
    color: palette.brand.accent,
  },
  display1: {
    fontFamily: typography.primaryFontFamily,
  },
  display2: {
    fontFamily: typography.primaryFontFamily,
  },
  display3: {
    fontFamily: typography.primaryFontFamily,
  },
  display4: {
    fontFamily: typography.primaryFontFamily,
  },
  headline: {
    fontFamily: typography.primaryFontFamily,
    fontWeight: 900,
    fontSize: '2.2rem',
  },
  title: {
    fontFamily: typography.primaryFontFamily,
    fontWeight: 700,
    fontSize: '1.8rem',
  },
  subheading: {
    fontFamily: typography.secondaryFontFamily,
  },
  body1: {
    fontFamily: typography.secondaryFontFamily,
  },
  body2: {
    fontFamily: typography.secondaryFontFamily,
  },
  caption: {
    fontFamily: typography.secondaryFontFamily,
  },
  gutterTop: {
    marginTop: spacing.marginUnit,
  },
})

const kindToMuiTypeMap = {
  display1: 'display1',
  display2: 'display2',
  display3: 'display3',
  display4: 'display4',
  headline: 'headline',
  title: 'title',
  subheading: 'subheading',
  body1: 'body1',
  body2: 'body2',
  caption: 'caption',
}


const Typography = ({
  bold,
  className,
  kind,
  light,
  accent,
  primary,
  hover,
  gutterTop,
  classes,
  ...props
}) => (
  <MuiTypography
    className={classNames(
    {
      [classes.common]: true,
      [classes[kind]]: true,
      [classes.primary]: primary,
      [classes.hover]: hover,
      [classes.accent]: accent,
      [classes.bold]: bold,
      [classes.light]: light,
      [classes.gutterTop]: gutterTop,
    },
    className,
  )}
    variant={kindToMuiTypeMap[kind]}
    {...props}
/>
)

Typography.propTypes = {
  bold: PropTypes.bool,
  hover: PropTypes.bool,
  gutterTop: PropTypes.bool,
  accent: PropTypes.bool,
  primary: PropTypes.bool,
  className: PropTypes.string,
  kind: PropTypes.oneOf([
    'display1',
    'display2',
    'display3',
    'display4',
    'headline',
    'title',
    'subheading',
    'body1',
    'body2',
    'caption',
  ]),
  light: PropTypes.bool,
}

Typography.defaultProps = {
  bold: false,
  accent: false,
  kind: 'body1',
  primary: false,
  light: false,
  hover: false,
  gutterTop: false,
}

export default compose(
  withTheme(),
  withStyles(styles)
)(Typography)

