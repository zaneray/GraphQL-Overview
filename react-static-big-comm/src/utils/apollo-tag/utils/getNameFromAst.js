import { get } from 'lodash/fp'

export const getNameFromAst = get('definitions[0].name.value')
