import invariant from 'invariant'
import { identity, isFunction, isPlainObject, isString, noop, omit } from 'lodash/fp'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { getNameFromAst } from './utils/getNameFromAst'
import { RefetchManager } from './utils/RefetchManager'
import { PROVIDER_CONTEXT_NAME } from './constants'
import withApolloTagConfig from './withApolloTagConfig'

export const withMutation = (
  mutationAst,
  { mapPropsToVariables = identity, dependents = {}, ...hocOptions } = {},
) => {
  invariant(
    isPlainObject(mutationAst),
    `Expected mutationAst to be a plain object. Got ${mutationAst}`,
  )
  invariant(
    isFunction(mapPropsToVariables),
    `Expected mapProps to be a function. Got ${mapPropsToVariables}`,
  )
  invariant(
    isPlainObject(dependents),
    `Expected dependencies to be a plain object. Got ${dependents}`,
  )

  const mutationName = getNameFromAst(mutationAst)
  invariant(
    mutationName && isString(mutationName),
    `Expected queryName to be a string. Got ${mutationName}`,
  )

  const enhancer = compose(withApolloTagConfig, graphql(mutationAst, { options: hocOptions }))

  const WithMutationInner = ({ children, mutate, ...props }) => {
    const { onError } = props[PROVIDER_CONTEXT_NAME]

    const newMutate = (variables, mutateOptions = {}) => {
      const combinedVariables = {
        ...mapPropsToVariables(omit([PROVIDER_CONTEXT_NAME])(props)),
        ...variables,
      }

      console.log('queries to refetch', RefetchManager.getDependentQueries({ dependents }))

      return mutate({
        refetchQueries: RefetchManager.getDependentQueries({ dependents }),
        variables: combinedVariables,
        ...mutateOptions,
      })
        .then(({ data }) => data)
        .catch(error => {
          onError(error)
          throw error
        })
    }
    return children(newMutate)
  }

  WithMutationInner.propTypes = {
    children: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
  }

  const WithMutation = enhancer(WithMutationInner)

  WithMutation.propTypes = {
    children: PropTypes.func.isRequired,
  }

  WithMutation.defaultProps = {
    children: noop,
  }

  WithMutation.displayName = `WithMutation(${mutationName}`
  return WithMutation
}

/*
{
  carriers: [INSERT]
}
 */
