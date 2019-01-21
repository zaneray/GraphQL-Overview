import { green, red, deepPurple, brown, grey, blueGrey } from '@material-ui/core/colors'

const brand = {
  primary: '#03A9F4',
  lightPrimary: '#B3E5FC',
  darkPrimary: '#0288D1',
  light: '#FFFFFF',
  accent: '#00BCD4',
  primaryText: '#212121',
  secondaryText: '#757575',
  divider: '#BDBDBD',
}

const altPalette = {
  deepPurple: deepPurple[500],
}

const neutral = {
  brown: brown[500],
  grey: grey[500],
  blueGrey: blueGrey[500],
}

const emotions = {
  negative: red[500],
  neutral: brand.accent,
  positive: green[500],
}

export default {
  brand,
  altPalette,
  neutral,
  emotions,
}
