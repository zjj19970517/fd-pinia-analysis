import { install, isVue2, Vue2 } from 'vue-demi'
import { createPinia, setActivePinia, PiniaVuePlugin, PiniaPlugin } from 'pinia'
import { defineNuxtPlugin } from '#imports'

if (isVue2) {
  install()
  // TODO: workaround that should probably be removed in the future
  const Vue = 'default' in Vue2 ? Vue2.default : Vue2
  Vue.use(PiniaVuePlugin)
}

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  if (isVue2) {
    // simulate new Vue({ pinia })
    // @ts-expect-error
    nuxtApp._legacyContext.app.pinia = pinia
    // context.app.pinia = pinia
  } else {
    nuxtApp.vueApp.use(pinia)
  }

  // make sure to inject pinia after installing the plugin because in Nuxt 3, inject defines a non configurable getter
  // on app.config.globalProperties
  // add $pinia to the context
  // inject('pinia', pinia)
  nuxtApp.provide('pinia', pinia)
  // to allow accessing pinia without the $
  // TODO: remove this in deprecation
  // context.pinia = pinia

  setActivePinia(pinia)

  // add access to `$nuxt`
  // TODO: adapt to Nuxt 3 with a definePlugin
  // @ts-expect-error: _p is internal
  ;(pinia._p as PiniaPlugin[]).push(({ store }) => {
    // make it non enumerable so it avoids any serialization and devtools
    Object.defineProperty(store, '$nuxt', { value: nuxtApp })
  })

  if (process.server) {
    console.log('on server')
    nuxtApp.hook('app:created', () => {
      console.log('set data', pinia.state.value)
      nuxtApp.payload.state.pinia = pinia.state.value
    })
  } else if (nuxtApp.payload.state && nuxtApp.payload.state.pinia) {
    pinia.state.value = nuxtApp.payload.state.pinia
  }
})
