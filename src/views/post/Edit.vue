<template>
    <div v-if="loading" class="spinner-border text-dark" role="status"></div>

    <div v-else class="m-0 p-0">
        <h3 class="mb-4">Edit Post</h3>
        <form @submit.prevent="validateForm" class="col-12 col-md-7">
            <div class="mb-3">
                <label class="form-label">Title :</label>
                <input v-model.lazy.trim="form.title" type="text" class="form-control"
                    :class="{ 'is-invalid': errors.title }">
                <small v-show="errors.title" class="text-danger">{{ errors.title }}</small>
            </div>
            <div class="mb-3">
                <label class="form-label">Body :</label>
                <textarea v-model.lazy.trim="form.body" class="form-control" :class="{ 'is-invalid': errors.body }"
                    rows="4"></textarea>
                <small v-show="errors.body" class="text-danger">{{ errors.body }}</small>
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-light">
                    <div v-show="btnLoading" :disabled="btnLoading" class="spinner-border spinner-border-sm text-dark"
                        role="status"></div>
                    Edit Post
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router';

const form = reactive({
    title: '',
    body: '',
});
const errors = reactive({
    title: '',
    body: '',
});
const loading = ref(true);
const btnLoading = ref(false);

async function getPost(id) {
    try {
        const res = await axios.get(`https://dummyjson.com/posts/${id}`);
        const post = res.data;
        form.title = post.title;
        form.body = post.body;
        loading.value = false;
    } catch (error) {
        console.log('getPost in edit page has error :', error)
    }
}
const route = useRoute();
const postId = route.params.id;
getPost(postId);


function validateForm() {
    if (form.title == '') {
        errors.title = 'Post title is required';
    } else {
        errors.title = '';
    }

    if (form.body == '') {
        errors.body = 'Post body is required';
    } else {
        errors.body = '';
    }

    if (form.body == '' || form.title == '') {
        return;
    } else {
        updatePost(postId, form.title, form.body)
    }
}

async function updatePost(id, title, body) {
    btnLoading.value = true;
    try {
        const res = await axios.put(`https://dummyjson.com/posts/${id}`, {
            userId: 5,
            title,
            body,
        });
        btnLoading.value = false;
        const editedPost = res.data;
        if (res.status == 200) {
            form.title = editedPost.title;
            form.body = editedPost.body;
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