// import Theme from 'vitepress/theme'
import { VPTheme } from '@vue/theme'
import { Layout } from './Layout'
import './custom.css'
import './code-theme.css'
// import { createPinia } from '../../../src'

/** @type {import('vitepress').Theme} */
const config = {
  ...VPTheme,

  // Layout,

  enhanceApp(ctx) {
    VPTheme.enhanceApp?.(ctx)
    // ctx.app.use(createPinia())
  },
}

export default config
