import { defineStore } from '../../../dist/pinia.esm-bundler'

export const useCounter = defineStore({
  id: 'counter',
  state: () => ({ n: 0 }),
})
