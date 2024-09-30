<script setup>
//importazioni
import LoaderApi from '@/components/LoaderApi.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

//variabili
const router = useRouter();
const baseUrl = 'http://localhost:8000/posts';
const baseData = ref({
    title: '',
    content: '',
    published: true,
    tags: []
});
const post = ref({})
const isLoading = ref(false)


//funzioni
const sendPost = async () => {
    isLoading.value = true
    try {
        const res = await axios.post(baseUrl, baseData.value);
        post.value = res.data;
        console.log(post.value)
        router.push({name: 'detailPost', params: {slug: post.value.slug}})
        isLoading.value = false;
        
    } catch (error) {
        console.log(error)
    }
}


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
                <button class="custom-span ml-5">Crea</button>
            </div>
        </form>


    </main>
</template>

<style  scoped>
main {
    color: var(--custom-black);
    border: 2px solid var(--custom-purple);
    background-color: white;
    width: 500px;
    padding: 1rem;
    border-radius: 10px;
}

/* input, textarea {
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