export const splitWith = (
  delimiter: string = '/',
  takes: { [k: number]: string } = {},
) => (path: string) => {
  const splitter = path.split(delimiter)
  const obj = splitter.reduce((acc: any, val: any, index: number) => {
    return { ...acc, [takes[index] || index]: val }
  }, {})
  return obj
}

export const split = (delimiter: string = '/') => (path: string) =>
  path && path.length ? path.split(delimiter) : []