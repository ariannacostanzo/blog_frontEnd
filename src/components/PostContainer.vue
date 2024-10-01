<script setup>
//importazioni
import axios from 'axios';
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import LoaderApi from '@/components/LoaderApi.vue';
import PostCard from './PostCard.vue';
import { useRoute, useRouter } from 'vue-router'

//variabili
const posts = ref([])
const totalPages = ref(0)
const currentPage = ref(0)
const isLoading = ref(false)
const route = useRoute();
const router = useRouter();
let urlToUse = ''
const isLeftDisabled = computed(() => currentPage.value === 1);
const isRightDisabled = computed(() => currentPage.value === totalPages.value);

const props = defineProps({
    searchTerm: String,
    urlForCategory: String
})



const fetchPosts = async (page = 1, limit = 6) => {
    if (props.urlForCategory) {
        urlToUse = `${props.urlForCategory}?limit=${limit}&page=${page}`
    }
    
    if (props.searchTerm) {
        urlToUse = `http://localhost:8000/posts?page=${page}&limit=${limit}&filter=${props.searchTerm}`

    } 
    
    if (!props.urlForCategory && !props.searchTerm) {
        urlToUse = `http://localhost:8000/posts?page=${page}&limit=${limit}`
    }


    isLoading.value = true
    try {
        const res = await axios.get(urlToUse);
        posts.value = res.data.data;
        totalPages.value = res.data.totalPages;
        currentPage.value = res.data.page;
        

    } catch (error) {
        console.log(error)
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 400)
    }

}

const slideArrows = (value) => {
    //freccia sinistra
    if (value === 'left') {
        //Se sono alla prima pagina
        if (currentPage.value === 1) {
            return
        }
        currentPage.value--;
        fetchPosts(currentPage.value)

    } else { //freccia destra
        //se sono all'ultima pagina
        if (totalPages.value === currentPage.value) return

        currentPage.value++;
        fetchPosts(currentPage.value)
    }
}

//ottengo i posts
onMounted(() => {
    fetchPosts();
})
onUnmounted(() => {
    posts.value = []
})

watch(() => props.searchTerm, () => {
    fetchPosts()
});


</script>

<template>
    <div class="flex items-center">
        <!-- freccia sinistra  -->
        <div @click="slideArrows('left')" v-if="!isLoading && posts.length > 0">
            <i class="fa-solid fa-arrow-left mr-5 arrows" :class="{ 'disabled': isLeftDisabled }"></i>
        </div>

        <!-- container dei post  -->
        <div class="post-container" v-if="posts.length">
            <LoaderApi v-if="isLoading" />
            <div v-else class="flex flex-wrap ">
                <RouterLink :to="{ name: 'detailPost', params: { slug: post.slug } }" v-for="post in posts"
                    :key="post.id" class="flex-basis">
                    <!-- post card  -->
                    <PostCard :post="post" />
                </RouterLink>
            </div>
        </div>
        <div v-else class="flex items-center justify-center mx-auto text-[#1b1b1b] text-2xl">Non ci sono post da mostrare</div>

        <!-- freccia destra  -->
        <div @click="slideArrows('right')" v-if="!isLoading && posts.length > 0">
            <i class="fa-solid fa-arrow-right ml-5 arrows" :class="{ 'disabled': isRightDisabled }"></i>
        </div>
    </div>
</template>

<style scoped>

.arrows {
  background-color: var(--custom-blue);
  padding: 1rem;
  border-radius: 50%;
  transition: all .2s ease-in-out;
  cursor: pointer;
}

.arrows:hover {
  background-color: var(--custom-indaco);
}


.post-container {
  max-width: 1300px;
  margin: 2rem auto;
  /* padding: 1rem; */

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  
}


.flex-basis {
    /* width: 650px; */
    flex-basis: 50%;
    flex-grow: 1;
    flex-shrink: 0;
    box-sizing: border-box;
    height: 280px;
}

.flex-basis:only-child {
    flex-basis: 100%;
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
}
.disabled {
  visibility: hidden;
}
</style>