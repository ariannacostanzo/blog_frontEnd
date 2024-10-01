<script setup>
import axios from 'axios';
import LoaderApi from '@/components/LoaderApi.vue';
import MainJumbotron from '@/components/MainJumbotron.vue';
import PostContainer from '@/components/PostContainer.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categoryId = route.params.categoryId;
const category = ref({});
const isLoading= ref(false);
const baseUrlCategoryShow = `http://localhost:8000/categories/${categoryId}`;
const baseUrlCategoryPosts = `http://localhost:8000/posts/category/${categoryId}`;

const fetchCategory = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrlCategoryShow);
        category.value = res.data;
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false;

    }
}

onMounted(() => {
    fetchCategory()
})
</script>



<template>
    <MainJumbotron />
    <main class="container mx-auto mt-5">

        <h1 class="text-4xl font-bold mb-5 text-center">I post per la categoria {{ category.name }}</h1>

        <div class="flex justify-between items-center mb-6">


        </div>

        <!-- i posts  -->
        <PostContainer :urlForCategory="baseUrlCategoryPosts" />

        <RouterLink to="/">
            <span class="custom-span">Torna indietro</span>
        </RouterLink>

    </main>
</template>

<style scoped>
  /* style here */
</style>