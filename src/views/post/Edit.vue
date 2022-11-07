<template>
    <div v-if="loading" class="spinner-border text-dark" role="status"></div>

    <div v-else class="m-0 p-0">
        <h3 class="mb-4">Edit Post</h3>
        <postForm :post="post" :btn-loading="btnLoading" @get-form="updatePost($event)" />
    </div>
</template>

<script setup>
import postForm from '../../components/post/Form.vue'

import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = route.params.id;
const post = ref({});
const loading = ref(true);
const btnLoading = ref(false);

async function getPost(id) {
    try {
        const res = await axios.get(`https://dummyjson.com/posts/${id}`);
        loading.value = false;
        post.value = res.data
    } catch (error) {
        console.log('getPost in edit page has error :', error)
    }
}

getPost(postId);

async function updatePost(formData) {
    btnLoading.value = true;
    try {
        const res = await axios.put(`https://dummyjson.com/posts/${postId}`, {
            userId: 5,
            title: formData.title,
            body: formData.body,
        });
        btnLoading.value = false;
        const editedPost = res.data;
        if (res.status == 200) {
            /**TODO: check te diffrence input Data*/
            post.value.title = editedPost.title;
            post.value.body = editedPost.body;
            successAlert()
        }
    } catch (error) {
        console.log(error)
    }
}

function successAlert() {
    Swal.fire({
        icon: 'success',
        text: 'Post edited successfuly',
    });
}

</script>