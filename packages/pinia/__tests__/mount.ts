import { Pinia } from '../src'
import { isVue2, nextTick } from 'vue-demi'
import type { VueWrapper } from '@vue/test-utils'

export function mount<T>(pinia: Pinia, Component: T): VueWrapper<T> {
  if (isVue2) {
    const { mount } = require('@vue/test-utils2')
    const wrapper = mount(Component, {
      pinia,
    })

    wrapper.unmount = () => {
      wrapper.destroy()
      return nextTick()
    }

    return wrapper
  } else {
    const { mount } = require('@vue/test-utils')
    return mount(Component, {
      global: { plugins: [pinia] },
    })
  }
}
