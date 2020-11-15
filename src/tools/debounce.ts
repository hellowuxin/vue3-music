export default function debounce<T> (fn: Function, delay = 0) {
  let timer: null | number = null
  return <U>(...args: U[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(args)
      timer = null
    }, delay)
  }
}
