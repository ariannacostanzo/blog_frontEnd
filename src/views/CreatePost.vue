<script setup>
import axios from 'axios';
import { ref } from 'vue';
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

//funzioni
const sendPost = async () => {
    try {
        const res = await axios.post(baseUrl, baseData.value);
        post.value = res.data;
        console.log(post.value)
        router.push({name: 'detailPost', params: {slug: post.value.slug}})

        
    } catch (error) {
        console.log(error)
    }
}



</script>

<template>
    <main class="container mx-auto my-5 flex items-center justify-center">
        <form @submit.prevent="sendPost">
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