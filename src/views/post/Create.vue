<template>
    <h3>Create Post</h3>
    <postForm :post="post" :btn-loading="btnLoading" @get-form="storePost($event)" />
</template>

<script setup>
import postForm from "../../components/post/Form.vue"
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'

const btnLoading = ref(false);
const post = ref({});

async function storePost(formData) {
    btnLoading.value = true;
    try {
        const res = await axios.post('https://dummyjson.com/posts/add', {
            userId: 5,
            title: formData.title,
            body: formData.body,
        });
        btnLoading.value = false;
        if (res.status == 200) {
            post.value = {}
            console.log(res.data)
            successAlert()
        }
    } catch (error) {
        console.log(errors)
    }
}

function successAlert() {
    Swal.fire({
        icon: 'success',
        text: 'Post created successfuly',
    });
}

</script>