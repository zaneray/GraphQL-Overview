import { flatten, flow, get, map } from 'lodash/fp'

export const getSelectionNamesFromAst = flow([
  get('definitions'),
  map(get('selectionSet.selections')),
  flatten,
  map(get('name.value')),
])
