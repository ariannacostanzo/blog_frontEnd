<script setup>
//importazioni
import LoaderApi from '@/components/LoaderApi.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();
const baseUrl = 'http://localhost:8000/posts/';
const post = ref({})
const baseData = ref({
    title: '',
    content: '',
    published: true,
    tags: []
});
const isLoading = ref(false)
const slug = route.params.slug;

//funzioni
const sendPost = async () => {
    isLoading.value = true
    try {

        const res = await axios.put(baseUrl + `${slug}`, baseData.value);
        console.log(res)
        router.push({ name: 'home'})
        isLoading.value = false;

    } catch (error) {
        console.log(error)
    }
}

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

onMounted(()=> {
    fetchPost();
    baseData.title = post.value.title;
    baseData.content = post.value.content;
})

</script>

<template>
    <main class="container mx-auto my-5 flex items-center justify-center">
        <LoaderApi v-if="isLoading" />
        <form @submit.prevent="sendPost" v-else>
            <div class="my-5 input-container">
                <label for="title">Titolo post</label>
                <input id="title" type="text" v-model="baseData.title" required />
            </div>
            <div class="my-5 input-container">
                <label for="content">Contenuto post</label>
                <textarea name="content" id="content" v-model="baseData.content" required></textarea>
            </div>
            <div class="flex items-center justify-center mt-10">
                <RouterLink class=" custom-span" to="/">
                    Torna indietro
                </RouterLink>
                <button class="custom-span ml-5 ">Modifica<i class="fa-solid fa-floppy-disk ml-2"></i></button>
            </div>
        </form>

    </main>
</template>

<style scoped>
main {
    color: var(--custom-black);
    border: 2px solid var(--custom-purple);
    background-color: white;
    width: 500px;
    padding: 2rem 1rem;
    border-radius: 10px;
}

/* input,
textarea {
    border: 2px solid var(--custom-blue);
    border-radius: 10px;
    padding-left: 10px;

}

input:focus-visible,
textarea:focus-visible {
    border-color: var(--custom-indaco);
    outline: 0;
} */

label {
    margin-right: 5px;
}

.input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
}
</style>