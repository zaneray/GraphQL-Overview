import { flow, mapKeys, replace, lowerFirst } from 'lodash/fp'

export const defaultProcessData = mapKeys(flow([replace(/^all/, ''), lowerFirst]))
