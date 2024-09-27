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
        <LoaderApi v-if="isLoading"/>
        <form @submit.prevent="sendPost" v-else>
            <div class="my-5">
                <label for="title">Titolo post</label>
                <input id="title" type="text" v-model="baseData.title" required />
            </div>
            <div class="my-5">
                <label for="content">Contenuto post</label>
                <textarea name="content" id="content" v-model="baseData.content" required></textarea>
            </div>
            <button>Invia</button>
        </form>

        <RouterLink class="ml-5" to="/">
            Torna indietro
        </RouterLink>
    </main>
</template>

<style  scoped>
  input, textarea {
    border: 1px solid black;
  }
  label {
    margin-right: 5px;
  }
  button {
    border: 1px solid red;
    background-color: lightcoral;
    padding: 1rem;
  }
</style>