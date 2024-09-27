<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref({});
const baseUrl = 'http://localhost:8000/posts/';
const slug = route.params.slug;

const fetchPost = async () => {
    try {
        const res = await axios.get(baseUrl + slug);
        post.value = res.data;
    } catch (error) {
        console.log(error)
    }

}

// //ottengo il post
fetchPost();

</script>

<template>
    <main>
       <div class="container mx-auto my-5 text-center">
        <h2 class="font-bold text-5xl">{{ post.title }}</h2>
        <p class="mt-5">{{ post.content }}</p>
       </div>

       <RouterLink class="ml-5" to="/">
        Torna indietro
       </RouterLink>
    </main>
</template>

<style scoped>
</style>