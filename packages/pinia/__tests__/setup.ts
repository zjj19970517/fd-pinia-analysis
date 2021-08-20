import { Vue2, isVue2, install } from 'vue-demi'
import { PiniaPlugin } from '../src'

beforeAll(() => {
  if (isVue2 && Vue2) {
    install()
    // @ts-expect-error
    Vue2.use(PiniaPlugin)
  }
})
