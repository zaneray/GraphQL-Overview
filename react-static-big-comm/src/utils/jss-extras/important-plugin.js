import { endsWith, isNumber, isString } from 'lodash'

const IMPORTANT = '!important'

export default ({
  onProcessStyle: style => {
    Object.keys(style).forEach(key => {
      const value = style[key]
      if ((isString(value) || isNumber(value)) && !endsWith(value, IMPORTANT)) {
        style[key] = `${value} ${IMPORTANT}`
      }
    })
    return style
  },

  // onChangeValue: value => {
  //   if ((isString(value) || isNumber(value)) && !endsWith(value, IMPORTANT)) {
  //     return `${value} ${IMPORTANT}`
  //   }
  // }
})
