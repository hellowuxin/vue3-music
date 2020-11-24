// 防抖
type Func = <T>(args?: T) => void

export function debounce (fn: Func, delay = 0): Func {
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

// 重排
export function reflow (element: HTMLElement): number {
  return element.offsetHeight
}

// 根据date返回日期
export const getChinaDate = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
}
