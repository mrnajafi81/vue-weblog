<template>
    <h3>Create Post</h3>
    <form @submit.prevent="validateForm" class="col-12 col-md-7 mt-4">
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
                Create Post
            </button>
        </div>
    </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { computed } from '@vue/reactivity';

const form = reactive({
    title: '',
    body: '',
});
const errors = reactive({
    title: '',
    body: '',
});

const btnLoading = ref(false);

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
        storePost(form.title, form.body)
    }
}

async function storePost(title, body) {
    btnLoading.value = true;
    try {
        const res = await axios.post('https://dummyjson.com/posts/add', {
            userId: 5,
            title,
            body,
        });
        btnLoading.value = false;
        if (res.status == 200) {
            form.body = '';
            form.title = '';
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