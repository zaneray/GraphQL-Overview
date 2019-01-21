import { compact, entries, flattenDeep, flow, get, map, set, uniq } from 'lodash/fp'

let queryDependencies = {}

const addQueryDependency = ({ queryName, tableName, operation }) => {
  const queryNames = get(`${tableName}.${operation}`)(queryDependencies)
  const nextIdx = queryNames ? queryNames.length : 0
  queryDependencies = set(`${tableName}.${operation}[${nextIdx}]`)(queryName)(queryDependencies)
}

const registerQueryDependencies = ({ queryName, dependencies }) => {
  Object.entries(dependencies).forEach(([tableName, operations]) =>
    operations.forEach(o => addQueryDependency({ queryName, tableName, operation: o })),
  )
}

const getDependentQueries = ({ dependents }) =>
  flow([
    entries,
    map(([tableName, operations]) =>
      map(o => get(`${tableName}.${o}`)(queryDependencies))(operations),
    ),
    flattenDeep,
    compact,
    uniq,
  ])(dependents)

export const RefetchManager = Object.freeze({
  registerQueryDependencies,
  getDependentQueries,
})
