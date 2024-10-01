<script setup>
import axios from 'axios';
import { ref, onMounted, } from 'vue';
import { useRouter } from 'vue-router';

const categories = ref([]);
const isLoading = ref(false)
const baseUrlCategories = 'http://localhost:8000/categories';
const latestPosts = ref([]);
const baseUrlLatestPosts = 'http://localhost:8000/posts/latests';
const router = useRouter();

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
    } catch (error) {
        console.log(error)
    }
}

const extract = (text) => {
    return text.length < 40 ? text : text.substring(0,40) + '...'
}

const goToCategoriesFilter = (category) => {
    router.push({ name: 'categoriesPost', params: {categoryId : category.id}})
}

onMounted(() => {
    fetchCategories()
    fetchLatestPosts()

})
</script>

<template>
    <h3 class="text-2xl">Categorie</h3>
    <!-- <div class="line"></div> -->
    <ul class="flex flex-wrap gap-3 mt-3 category-list">
        <li v-for="category in categories" :key="category.id" @click="goToCategoriesFilter(category)"><span
                class="custom-span">{{ category.name
                }}</span></li>
    </ul>
    <h3 class="text-2xl mt-5">Ultimi post</h3>

    <div v-for="post in latestPosts" class="latest-posts-item" :key="post.slug">
        <RouterLink :to="{ name: 'detailPost', params: { slug: post.slug } }">
            <div class="flex flex-col items-start justify-between h-full">
                <div>
                    <h3>{{ post.title }}</h3>
                    <p>{{ extract(post.content) }}</p>
                </div>
                <span class="custom-span">Leggi di più</span>
            </div>
            <figure>
                <img :src="post.image" :alt="post.title" v-if="post.image">
                <img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                    :alt="post.title" v-else>
            </figure>
        </RouterLink>
    </div>
</template>

<style scoped>
.category-list span {
    background-color: var(--custom-green);
}

.category-list span:hover {
    background-color: var(--custom-green-dark);
}

h3 {
    color: var(--custom-indaco);
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

.custom-span {
    text-shadow: 0 0 0 var(--custom-black);
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

.latest-posts-item:hover img {
    filter: contrast(175%) brightness(20%);
}
</style>