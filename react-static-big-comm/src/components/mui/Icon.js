import classNames from 'classnames'
import { withStyles as withStylesHoc } from '@material-ui/core/styles'
import invariant from 'invariant'
import { upperFirst } from 'lodash/fp'
import MuiIcon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from '../../utils/css-in-js'
import { mergeClasses } from '../../utils/material-ui-extras'

const styles = ({ palette }) => ({
  root: {
    backgroundColor: palette.brand.light,
    borderRadius: '50%',
    padding: 2,
  },
  rootSmall: {
    transform: 'scale(0.7)',
  },
  rootLarge: {
    transform: 'scale(1.3)',
  },
  rootDisabled: {
    opacity: 0.5,
  },
  rootDark: {
    color: palette.brand.darkPrimary,
  },
  rootNegative: {
    color: palette.emotions.negative,
  },
  rootLight: {
    color: palette.brand.light,
  },
  rootPositive: {
    color: palette.emotions.positive,
  },
  rootDarkBackground: {
    backgroundColor: palette.brand.darkPrimary,
  },
  rootLightBackground: {
    backgroundColor: palette.brand.light,
  },
  rootNegativeBackground: {
    backgroundColor: palette.emotions.negative,
  },
  rootPositiveBackground: {
    backgroundColor: palette.emotions.positive,
  },
})

const Classes = withStyles(styles)

const Icon = ({
  classes: classesProp,
  className,
  dark,
  darkBackground,
  disabled,
  small,
  large,
  size = small ? 'small' : large ? 'large' : undefined,
  lightBackground,
  color = dark ? 'dark' : 'light',
  backgroundColor = darkBackground ? 'dark' : lightBackground && 'light',
  ligature,
  thirdParty,
  ...props
}) => {
  invariant(
    !lightBackground || !darkBackground,
    'Both lightBackground and darkBackground may not be set',
  )
  invariant(!small || !large, 'Both small and large may not be set')

  return (
    <Classes>
      {classes => (
        <MuiIcon
          {...props}
          children={thirdParty ? null : ligature}
          classes={mergeClasses(
            {
              root: classNames(
                classes.root,
                disabled && classes.rootDisabled,
                size && classes[`root${upperFirst(size)}`],
                classes[`root${upperFirst(color)}`],
                backgroundColor && classes[`root${upperFirst(backgroundColor)}Background`],
              ),
            },
            classesProp,
          )}
          className={classNames(thirdParty && ligature, className)}
        />
      )}
    </Classes>
  )
}

Icon.propTypes = {
  backgroundColor: PropTypes.oneOf(['dark', 'light', 'negative', 'positive']),
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf(['dark', 'light', 'negative', 'positive']),
  dark: PropTypes.bool.isRequired,
  darkBackground: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  large: PropTypes.bool.isRequired,
  ligature: PropTypes.string.isRequired,
  lightBackground: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  thirdParty: PropTypes.bool.isRequired,
}

Icon.defaultProps = {
  dark: false,
  darkBackground: false,
  disabled: false,
  large: false,
  lightBackground: false,
  small: false,
  thirdParty: false,
}

export default withStylesHoc(Icon)
