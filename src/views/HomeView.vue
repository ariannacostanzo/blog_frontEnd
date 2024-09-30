<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import LoaderApi from '@/components/LoaderApi.vue';
import MainJumbotron from '@/components/MainJumbotron.vue';

const posts = ref([])
const totalPages = ref(0)
const currentPage = ref(0)
const isLoading = ref(false)

const isLeftDisabled = computed(() => currentPage.value === 1);
const isRightDisabled = computed(() => currentPage.value === totalPages.value);

const fetchPosts = async (page = 1, limit = 6) => {

  isLoading.value = true
  try {
    const res = await axios.get(`http://localhost:8000/posts?page=${page}&limit=${limit}`);
    posts.value = res.data.data;
    totalPages.value = res.data.totalPages;
    currentPage.value = res.data.page;
    setTimeout(()=>{
      isLoading.value = false;
    }, 1000)
    
  } catch (error) {
    console.log(error)
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


</script>

<template>


  <MainJumbotron />
  <main class="container mx-auto mt-5">

    <h1 class="text-4xl font-bold mb-5 text-center">I migliori post</h1>

    <div class="flex justify-between items-center">

      <!-- link alla creazione  -->
      <RouterLink to="posts/create" class="custom-span">
        <span>Crea un nuovo post <i class="fa-regular fa-pen-to-square"></i></span>
      </RouterLink>
      
      <!-- searchbar -->
      <div class="bg-black">
        searchbar
      </div>
    </div>

    <!-- container centrale -->

    <div class="flex items-center">
      <!-- freccia sinistra  -->
      <div @click="slideArrows('left')" v-if="!isLoading">
        <i class="fa-solid fa-arrow-left mr-5 arrows" :class="{ 'disabled': isLeftDisabled }"></i>
      </div>

      <!-- container dei post  -->
      <div class="post-container flex flex-wrap">
        <LoaderApi v-if="isLoading" />
        <RouterLink v-else :to="{ name: 'detailPost', params: {slug: post.slug}}" v-for="post in posts"
          class="post-card" :key="post.id">
          <h3 class="text-3xl">{{ post.title }}</h3>
          <div>
            <p class="text-2xl">{{ post.content }}</p>
            <span class="custom-span">Leggi di più</span>
          </div>
          <figure>
            <img :src="post.image" :alt="post.title" v-if="post.image">
            <img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg" :alt="post.title"
              v-else>
          </figure>
        </RouterLink>
      </div>

      <!-- freccia destra  -->
      <div @click="slideArrows('right')" v-if="!isLoading">
        <i class="fa-solid fa-arrow-right ml-5 arrows" :class="{ 'disabled': isRightDisabled }"></i>
      </div>
    </div>

  </main>
</template>

<style scoped>

.post-card {
  padding: 1rem;
  flex-basis: 50%;
  position: relative;
  height: 280px;
  text-shadow: 1px 1px 1px black;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* h3 {
  color: var(--custom-blue);
} */

.post-card figure {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.post-card figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .8;
  transition: .5s ease;
  
  
}

.post-card:hover figure img {
  filter: contrast(175%) brightness(20%);
}

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
  padding: 1rem;

  
}
.disabled {
  visibility: hidden;
}



</style>