import { createVNode, render, VNode } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const messageQueue: Array<{ vnode: VNode, container: HTMLElement }> = []

function close (container: HTMLElement) {
  const index = messageQueue.findIndex(({ container: c }) => {
    return container === c
  })
  if (index !== -1) {
    console.log(messageQueue)
    messageQueue.splice(index, 1)

    render(null, container)
    document.body.removeChild(container)
  }
}

export default function createMessage (message: string, type: MessageType, duration?: number): void {
  let verticalOffset = 20
  messageQueue.forEach(({ vnode }) => {
    verticalOffset += (vnode.el?.offsetHeight || 0) + 16
  })
  verticalOffset += 16

  const container = document.createElement('div')
  const vnode = createVNode(Message, {
    message,
    type,
    duration,
    verticalOffset,
    onClose: () => { close(container) }
  })
  messageQueue.push({ vnode, container })
  render(vnode, container)
  document.body.appendChild(container)
}
