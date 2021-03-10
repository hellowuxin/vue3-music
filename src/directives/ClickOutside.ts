import { DirectiveBinding } from '@vue/runtime-core'

interface ClickOutsideBindingArgs {
  handler: (e: Event) => void
  closeConditional: (e: Event) => boolean
  include: () => HTMLElement[]
}

type ClickOutsideDirective = DirectiveBinding<ClickOutsideBindingArgs>

const map = new Map()

const directive = (e: MouseEvent, el: HTMLElement, binding: ClickOutsideDirective): void => {
  const handler = binding.value.handler
  const isActive = binding.value.closeConditional
  if (!e || isActive(e) === false) return
  const elements = binding.value.include()
  elements.push(el)
  const flag = !elements.some(el => el.contains(e.target as Node))
  if (flag) {
    isActive(e) && handler(e)
  }
}

export const ClickOutside = {
  mounted (el: HTMLElement, binding: ClickOutsideDirective): void {
    if (binding.value) {
      const onClick = (e: MouseEvent) => directive(e, el, binding)
      document.body.addEventListener('click', onClick)
      map.set(el, onClick)
    }
  },
  unmounted (el: HTMLElement): void {
    const fn = map.get(el)
    if (fn) {
      document.body.removeEventListener('click', fn)
    }
  }
}

export default ClickOutside
