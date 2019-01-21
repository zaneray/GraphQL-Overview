import {concat, merge} from 'lodash/fp'

export default variantConfigs => props => {
  const {variantToPropsMap} = props
  return variantConfigs
    .map(({propName, defaultVariant}) => {
      const variants = props[propName] || defaultVariant
      return variants
        ? variants
          .split(/\s+/)
          .map(v => variantToPropsMap[v])
        : []
    })
    .reduce(concat)
    .reduce((memo, props) => merge(memo, props), {})
}
