type T = {
  [key: string]: string | undefined | T | (T | string)[]
}

export const serialize = (obj: T, prefix = ''): [string, string][] =>
  Object.entries(obj).reduce(
    (prev, [key, value]) => {
      const joined = [prefix, key].filter((x) => x).join(':')

      const process = (v: string | T | undefined): [string, string][] =>
        !v ? [] : typeof v === 'string' ? [[joined, v]] : serialize(v, joined)

      return [
        ...prev,
        ...(Array.isArray(value)
          ? value.reduce(
              (acc, v) => [...acc, ...process(v)],
              [] as [string, string][]
            )
          : process(value))
      ]
    },
    [] as [string, string][]
  )
