const XXS_TO_XS_BREAKPOINT = 480
const XS_TO_SM_BREAKPOINT = 768
const SM_TO_MD_BREAKPOINT = 992
const MD_TO_LG_BREAKPOINT = 1200

const XXS = { max: XXS_TO_XS_BREAKPOINT - 1 }
const XS = { min: XXS_TO_XS_BREAKPOINT, max: XS_TO_SM_BREAKPOINT - 1 }
const SM = { min: XS_TO_SM_BREAKPOINT, max: SM_TO_MD_BREAKPOINT - 1 }
const MD = { min: SM_TO_MD_BREAKPOINT, max: MD_TO_LG_BREAKPOINT - 1 }
const LG = { min: MD_TO_LG_BREAKPOINT }

function query ({ min, max, orientation }) {
  const result = []
  if (min) {
    result.push(`(min-width: ${min}px)`)
  }

  if (max) {
    result.push(`(max-width: ${max}px)`)
  }

  if (orientation) {
    result.push(`(orientation: ${orientation})`)
  }

  return result.join(' and ')
}

const mediaQueryArr = {
  xxs: query({ max: XXS.max }),
  xs: query({ min: XS.min, max: XS.max }),
  sm: query({ min: SM.min, max: SM.max }),
  md: query({ min: MD.min, max: MD.max }),
  lg: query({ min: LG.min }),

  xsAndUp: query({ min: XS.min }),
  smAndUp: query({ min: SM.min }),
  mdAndUp: query({ min: MD.min }),

  landscape: query({ orientation: 'landscape' }),
  portrait: query({ orientation: 'portrait' }),

  portraitPhone: query({ max: XXS.max, orientation: 'portrait' }),
  landscapePhone: query({ max: XS.max, orientation: 'landscape' }),
}

const mediaQueries = rules => {
  const queries = Object.keys(rules)
  const result = {}
  queries.forEach(q => {
    if (q === 'base' || q === 'xxsAndUp') {
      Object.assign(result, rules[q])
    } else {
      const mediaQuery = mediaQueryArr[q]

      if (!mediaQuery) {
        throw new Error('No media query found!', q)
      }

      result[`@media ${mediaQuery}`] = rules[q]
    }
  })

  return result
}

export default mediaQueries
