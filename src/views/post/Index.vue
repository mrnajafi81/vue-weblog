<template>

  <div v-if="loading" class="spinner-border text-dark" role="status"></div>

  <div v-else class="row g-3">
    <div class="col-12 mb-2">
      <router-link class="btn btn-sm btn-dark" :to="{name:'postCreate'}">Create Post</router-link>
    </div>
    <div v-for="post in posts" :key="post.id" class="col-md-6">
      <div class="card card-defult">
        <div class="card-header">
          <router-link :to="{ name: 'postShow', params: { id: post.id } }">{{ post.title }}</router-link>
        </div>
        <div class="card-body">
          <p class="card-text">
            {{ post.body.slice(0, 200) + ' ...' }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const posts = ref([]);
const loading = ref(true);

async function getPosts() {
  try {
    const res = await axios.get('https://dummyjson.com/posts');
    posts.value = res.data.posts;
    loading.value = false;
  } catch (error) {
    console.log(error)
  }
}
getPosts()

</script>