<template>
  <div>Nuxt module playground!</div>
  <pre>{{ counter.double }} = {{ counter.n }} x 2</pre>
  <button @click="counter.n++">Add</button>
</template>

<script setup>
import { useCounter } from './stores/counter'

const counter = useCounter()
if (process.server) {
  counter.n++
}
</script>
