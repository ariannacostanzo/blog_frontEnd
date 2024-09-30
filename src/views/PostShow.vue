<script setup>
import axios from 'axios';
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoaderApi from '@/components/LoaderApi.vue';

const route = useRoute();

const router = useRouter();
const post = ref({});
const baseUrlPost = 'http://localhost:8000/posts/';
const categories = ref([]);
const baseUrlCategories = 'http://localhost:8000/categories';
const latestPosts = ref([]);
const baseUrlLatestPosts = 'http://localhost:8000/posts/latests';


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
const fetchCategories = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrlCategories);
        categories.value = res.data;
        isLoading.value = false;
    } catch (error) {
        console.log(error)
    }
}

const fetchLatestPosts = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrlLatestPosts);
        latestPosts.value = res.data.data;
        isLoading.value = false;
        // console.log(res.data)
        console.log(latestPosts.value)
    } catch (error) {
        console.log(error)
    }
}

// //ottengo il post
//ottengo le categories
onMounted(() => {
    fetchPost()
    fetchCategories()
    fetchLatestPosts()
    
})



watch(() => route.params.slug, () => {
    fetchPost();
    router.go(0);
});

// onUnmounted(() => {
//     post.value = {};
    
// });

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
                    <h3 class="text-2xl">Categorie</h3>
                    <!-- <div class="line"></div> -->
                    <ul class="flex flex-wrap gap-3 mt-3 category-list">
                        <li v-for="category in categories" :key="category.id"><span class="custom-span">{{ category.name
                                }}</span></li>
                    </ul>
                    <h3 class="text-2xl mt-5">Ultimi post</h3>

                    <div v-for="post in latestPosts" class="latest-posts-item" :key="post.slug">
                        <RouterLink :to="{ name: 'detailPost', params: { slug: post.slug } }">
                            <h3>{{ post.title }}</h3>
                            <p>{{ post.content }}</p>
                            <figure>
                                <img :src="post.image" :alt="post.title" v-if="post.image">
                                <img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                                    :alt="post.title" v-else>
                            </figure>
                        </RouterLink>
                    </div>

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

.category-list span {
    background-color: var(--custom-pink);
}

.category-list span:hover {
    background-color: var(--custom-indaco);
}

.latest-posts-item h3 {
    color: var(--custom-pink);
    
}

.latest-posts-item {
    position: relative;
    margin: 1rem 0;
    width: 80%;
    width: 100%;
    height: 150px;
    padding: 1rem;
    text-shadow: 1px 1px 3px var(--custom-white);
    border: 1px solid black;
}

.latest-posts-item figure {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    
}

.latest-posts-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .8;
    transition: .5s ease;
    border-radius: 0;
}

.latest-posts-item:hover  img {
    filter: contrast(175%) brightness(20%);
}

</style>