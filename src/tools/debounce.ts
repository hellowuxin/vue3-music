type Func = <T>(args?: T) => void

export default function debounce (fn: Func, delay = 0): Func {
  let timer: null | number = null

  return <T>(...args: T[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}
