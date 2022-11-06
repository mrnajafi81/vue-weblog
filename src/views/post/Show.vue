<template>

    <div v-if="loading" class="spinner-border text-dark" role="status"></div>

    <div v-else class="row ">
        <div class="col-md-8">
            <div class="card card-defult">
                <div class="card-header">
                    {{ post.title }}
                </div>
                <div class="card-body">
                    <p class="card-text">
                        {{ post.body }}
                    </p>
                    <p class="card-text">
                        <button @click="deletePost" type="button" class="btn btn-sm btn-danger me-2">
                            <small>Delete</small>
                        </button>
                        <router-link :to="{ name: 'postEdit', params: { id: post.id } }" class="btn btn-sm btn-warning">
                            <small>Edit</small>
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import axios from 'axios'
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true);
const post = ref({});
const postId = route.params.id;

async function getPost(id) {
    try {
        const res = await axios.get(`https://dummyjson.com/posts/${id}`);
        post.value = res.data;
        loading.value = false;
    } catch (error) {
        console.log(error)
    }
}
getPost(postId)

async function deletePost() {
    try {
        const res = await axios.delete(`https://dummyjson.com/posts/${postId}`);
        alertSuccessDelete(postId)
    } catch (error) {
        console.log('error in delete post', error)
    }
}

function alertSuccessDelete(id) {
    Swal.fire({
        icon: 'warning',
        text: `Post (${id}) deleted successfuly`
    });
}

</script>