import { lensProp } from '../object'
import { Formula } from '../types'

/**
 * Build a string by template.
 * Put the replacer in the bracket to map with its key.
 * @example
 * console.log(
 *  template('how {be} {who} {what}?', {
 *    be: 'are',
 *    who: (data: any) => data.name,
 *    what: 'doing',
 *  })({ name: 'Nam' }),
 * )
 * @param s String template
 * @param placeholder Keys of above template to replace
 */
export const template = (
  s: string,
  placeholders: { [k: string]: any | string | Formula },
) => async (payload: any, ...rest: any[]) => {
  let result = s
  for (const place in placeholders) {
    if (place in placeholders) {
      const replacer = placeholders[place]
      result = result.replace(
        `{${place}}`,
        typeof replacer === 'function'
          ? await Promise.resolve(replacer(payload, ...rest))
          : replacer,
      )
    }
  }
  return result
}

export const templateProps = (s: string) => async (
  payload: any,
  ...rest: any[]
) => {
  const replacer = s.replace(
    /\{([A-Za-z0-9._]+)\}/g,
    (_: string, prop: string) =>
      lensProp(prop)(payload, ...rest) || `[${prop}]`,
  )
  return replacer
}

// console.log(
//   template('how {be} {who} {what}?', {
//     be: 'are',
//     who: (data: any) => data.name,
//     what: 'doing',
//   })({ name: 'Nam' }),
// )
