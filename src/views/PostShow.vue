<script setup>
import axios from 'axios';
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoaderApi from '@/components/LoaderApi.vue';
import PostShowSidebar from '@/components/PostShowSidebar.vue';
// http://localhost:8000/posts/category/9
const route = useRoute();
const router = useRouter();
const post = ref({});
const baseUrlPost = 'http://localhost:8000/posts/';

const slug = route.params.slug;
const deleteUrl = `http://localhost:8000/posts/${slug}`;
const isLoading = ref(false)

const fetchPost = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrlPost + slug);
        post.value = res.data;
        setTimeout(() => {
            isLoading.value = false;
        }, 200)
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async () => {
    isLoading.value = true
    try {
        const res = await axios.delete(deleteUrl);
        post.value = res.data;
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false;  
        router.push({path: '/'});
    }
}

const formattedSection = (text) => {
    if (!text) return '';
    const formattedContent = text.replace(/\n\s*\n/g, '<br><br>');
    return formattedContent;
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

            <h1 class="font-bold text-5xl text-center">{{ post.title }}</h1>

            <div class="flex gap-20 mt-10">

                <div class="left-content">

                    <figure>
                        <span v-if="post.categoryId">
                            {{ post.category.name }}
                        </span>
                        <img :src="post.image" :alt="post.title" v-if="post.image">
                        <img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                            :alt="post.title" v-else>
                    </figure>
                    <h2 class="my-5 text-4xl break-words">{{ post.content }}</h2>
                    <p v-html="formattedSection(post.section)"></p>

                    <div v-if="post.tags">
                        <ul>
                            <li v-for="tag in post.tags">{{ tag.name }}</li>
                        </ul>
                    </div>
                </div>
                <div class="right-content">

                    <PostShowSidebar />

                </div>
            </div>
        </div>

        <div class="flex items-center justify-between">

            <RouterLink v-if="!isLoading" class="custom-span" to="/">
                Torna indietro
            </RouterLink>

            <div>

                <RouterLink v-if="!isLoading" class="custom-span" :to="{name: 'updatePost', params: {slug: post.slug}}">
                    Modifica il post <i class="fa-solid fa-pen ml-2"></i>
                </RouterLink>
                <button v-if="!isLoading" @click="deletePost" class="custom-span delete-span ml-5">Elimina post<i class="fa-solid fa-trash-can ml-2"></i></button>
            </div>

        </div>


    </main>
</template>

<style lang="scss" scoped>
figure {
    border-radius: 10px;
    width: 100%;
    height: 500px;
    position: relative;

    span {
        background-color: var(--custom-green);
        position: absolute;
        top: -10px;
        left: -10px;
        padding: 5px 10px;
        border-radius: 15px;
    }
    
}

.delete-span {
    padding: 2px 10px;
    background-color: var(--custom-pink);
}
.delete-span:hover {
    background-color: var(--custom-indaco);
}


h2 {
    font-family: 'BaseText';
    color: var(--custom-indaco);
}

h3 {
    color: var(--custom-indaco);
}

.line {
    width: 30%;
    color: var(--custom-violet);
    height: 2px;
}

.left-content {
    flex-grow: 0;
    flex-basis: 65%;
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