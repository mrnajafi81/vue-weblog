<template>
  <Header />
  <section class="container p-0 my-4">
    <router-view></router-view>
  </section>
</template>

<script setup>
import Header from "./views/layouts/Header.vue"
</script>