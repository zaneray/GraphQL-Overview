import invariant from 'invariant'
import {
  flow,
  identity,
  isEmpty,
  isFunction,
  isPlainObject,
  isString,
  noop,
  omit,
  pick,
} from 'lodash/fp'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { branch, compose } from 'recompose'
import { getNameFromAst } from './utils/getNameFromAst'
import { defaultProcessData } from './utils/defaultProcessData'
import { getSelectionNamesFromAst } from './utils/getSelectionNamesFromAst'
import { RefetchManager } from './utils/RefetchManager'
import { PROVIDER_CONTEXT_NAME } from './constants'
import withApolloTagConfig from './withApolloTagConfig'

export const withQuery = (
  queryAst,
  {
    dependencies = {},
    mapPropsToVariables = identity,
    processData = defaultProcessData,
    ...hocOptions
  } = {},
) => {
  invariant(isPlainObject(queryAst), `Expected queryAst to be a plain object. Got ${queryAst}`)
  invariant(
    isPlainObject(dependencies),
    `Expected dependencies to be a plain object. Got ${dependencies}`,
  )
  invariant(
    isFunction(mapPropsToVariables),
    `Expected mapProps to be a function. Got ${mapPropsToVariables}`,
  )

  const queryName = getNameFromAst(queryAst)
  invariant(queryName && isString(queryName), `Expected queryName to be a string. Got ${queryName}`)
  RefetchManager.registerQueryDependencies({ queryName, dependencies })

  const selectionNames = getSelectionNamesFromAst(queryAst)
  invariant(
    !isEmpty(selectionNames),
    `Expected to find selection names in queryAst. Found ${selectionNames}`,
  )

  const options = props => ({
    variables: mapPropsToVariables(props),
    ...hocOptions,
  })

  // Do not include the hoc if skip is true
  const enhancer = compose(
    withApolloTagConfig,
    branch(({ skip }) => !skip, graphql(queryAst, { options })),
  )

  const WithQueryInner = ({
    children, data = {}, hideLoading, skip, ...props
  }) => {
    if (skip) {
      return children({}, {})
    }

    const {
      mapNetworkStatusToLoading, onError, renderError, renderLoading,
    } = props[
      PROVIDER_CONTEXT_NAME
    ]

    const { error, networkStatus = 0 } = data

    if (error) {
      if (onError) {
        onError(error)
      }

      if (renderError) {
        return renderError(error)
      }
    }

    const loading = mapNetworkStatusToLoading(networkStatus)

    // todo: why does hideLoading prevent a rerender after refetch is called?

    if (!hideLoading && loading && renderLoading) {
      return renderLoading()
    }

    const queryData = data ? flow([pick(selectionNames), processData])(data) : undefined

    const apolloApi = {
      ...omit(selectionNames)(data),
      loading,
    }

    return children(queryData, apolloApi)
  }

  WithQueryInner.propTypes = {
    children: PropTypes.func.isRequired,
    data: PropTypes.object,
  }

  const WithQuery = enhancer(WithQueryInner)

  WithQuery.propTypes = {
    children: PropTypes.func.isRequired,
    hideLoading: PropTypes.bool.isRequired,
    skip: PropTypes.bool.isRequired,
  }

  WithQuery.defaultProps = {
    children: noop,
    hideLoading: false,
    skip: false,
  }

  WithQuery.displayName = `WithQuery(${queryName})`
  return WithQuery
}
