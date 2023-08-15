<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld />

      <nav class="flex gap-x-2">
        <RouterLink to="/team">Team</RouterLink>
        <RouterLink to="/task">Task</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
