<template>
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
                <div v-show="props.btnLoading" :disabled="btnLoading" class="spinner-border spinner-border-sm text-dark"
                    role="status"></div>
                Edit Post
            </button>
        </div>
    </form>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue';

const props = defineProps({
    post: Object,
    btnLoading: Boolean
})
const post = props.post
const form = reactive({
    title: post.title,
    body: post.body,
});
const errors = reactive({
    title: '',
    body: '',
});

const emit = defineEmits(['getForm'])

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
        emit('getForm', form)
    }
}

</script>