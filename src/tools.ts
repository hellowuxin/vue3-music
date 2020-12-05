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

// 歌曲时间
export const getTrackTime = (time: number): string => {
  return `${Math.floor(time / 60000).toString().padStart(2, '0')}:${Math.floor(time / 1000 % 60).toString().padStart(2, '0')}`
}

// 波纹
export const createRipple = (event: MouseEvent, button?: HTMLElement): void => {
  if (!button) {
    button = event.currentTarget as HTMLElement
  }
  const circle = document.createElement('span')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2
  const offset = button.getBoundingClientRect()

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - (offset.left + radius)}px`
  circle.style.top = `${event.clientY - (offset.top + radius)}px`
  circle.classList.add('ripple')
  button.appendChild(circle)

  setTimeout(() => {
    circle.remove()
  }, 600)
}
