<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import LoaderApi from '@/components/LoaderApi.vue';

const route = useRoute();
const post = ref({});
const baseUrl = 'http://localhost:8000/posts/';
const slug = route.params.slug;
const isLoading = ref(false)

const fetchPost = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrl + slug);
        post.value = res.data;
        isLoading.value = false;
    } catch (error) {
        console.log(error)
    }

}

// //ottengo il post
fetchPost();

</script>

<template>
    <main>
        <LoaderApi v-if="isLoading"/>
       <div v-else class="container mx-auto my-5 text-center">
        <h2 class="font-bold text-5xl">{{ post.title }}</h2>
        <p class="mt-5">{{ post.content }}</p>
        <p v-if="post.categoryId">
            {{ post.categoryId }}
        </p>
        <div v-if="post.tags">
            <ul>
                <li v-for="tag in post.tags">{{ tag.name }}</li>
            </ul>
        </div>
       </div>

       <RouterLink class="ml-5" to="/">
        Torna indietro
       </RouterLink>
    </main>
</template>

<style scoped>
</style>