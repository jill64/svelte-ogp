let prefix = $state('')

export const store = {
  get prefix() {
    return prefix
  },
  set prefix(value) {
    prefix = value
  }
}
