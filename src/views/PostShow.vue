<script setup>
import axios from 'axios';
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoaderApi from '@/components/LoaderApi.vue';
import PostShowSidebar from '@/components/PostShowSidebar.vue';

const route = useRoute();
const router = useRouter();
const post = ref({});
const baseUrlPost = 'http://localhost:8000/posts/';

const slug = route.params.slug;
const isLoading = ref(false)

const fetchPost = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrlPost + slug);
        post.value = res.data;
        isLoading.value = false;
    } catch (error) {
        console.log(error)
    }
}


// //ottengo il post
//ottengo le categories
onMounted(() => {
    fetchPost()
    
})



watch(() => route.params.slug, () => {
    fetchPost();
    router.go(0);
});


</script>

<template>
    <main class="custom-container">
        <LoaderApi v-if="isLoading" />
        <div v-else class="container mx-auto my-5">

            <h2 class="font-bold text-5xl text-center">{{ post.title }}</h2>

            <div class="flex gap-10 mt-10">

                <div class="left-content">

                    <figure>
                        <img :src="post.image" :alt="post.title" v-if="post.image">
                        <img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                            :alt="post.title" v-else>
                    </figure>
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
                <div class="right-content">
                    
                    <PostShowSidebar/>

                </div>
            </div>
        </div>

        <div class="flex items-center justify-between">

            <RouterLink class="custom-span" to="/">
                Torna indietro
            </RouterLink>

            <RouterLink class="custom-span" :to="{name: 'updatePost', params: {slug: post.slug}}">
                Modifica il post <i class="fa-solid fa-pen ml-2"></i>
            </RouterLink>
        </div>


    </main>
</template>

<style scoped>
figure {
    border-radius: 10px;
    width: 90%;
    height: 500px;
    
}

h3 {
    color: var(--custom-indaco);
}

.line {
    width: 30%;
    color: var(--custom-violet);
    height: 2px;
}

.right-content {
    flex-basis: 30%;
}


.custom-container {
    max-width: 1200px;
    margin: 2rem auto;
    color: var(--custom-black);
}

figure img {
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    height: 100%;
}

</style>