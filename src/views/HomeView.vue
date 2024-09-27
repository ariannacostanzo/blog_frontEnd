<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import LoaderApi from '@/components/LoaderApi.vue';

const posts = ref([])
const totalPages = ref(0)
const currentPage = ref(0)
const isLoading = ref(false)

const fetchPosts = async (page = 1, limit = 10) => {

  isLoading.value = true
  try {
    const res = await axios.get(`http://localhost:8000/posts?page=${page}&limit=${limit}`);
    posts.value = res.data.data;
    totalPages.value = res.data.totalPages;
    currentPage.value = res.data.page;
    isLoading.value = false;
    
  } catch (error) {
    console.log(error)
  }

}

const slideArrows = (value) => {
  //freccia sinistra
  if (value === 'left') {
    //Se sono alla prima pagina
    if (currentPage.value === 1) return
    
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
  fetchPosts(2);
})


</script>

<template>
  <main class="container mx-auto mt-5">

      <h1 class="text-4xl font-bold mb-5 text-center">Lista dei post</h1>
      <LoaderApi v-if="isLoading"/>
      <div v-else class="flex items-center justify-center ">
        <div @click="slideArrows('left')">
          <i class="fa-solid fa-arrow-left mr-5 arrows"></i>
        </div>
        <RouterLink :to="{ name: 'detailPost', params: {slug: post.slug}}" v-for="post in posts"
          class="mx-5 my-2 post-card" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </RouterLink>
        <div @click="slideArrows('right')">
          <i class="fa-solid fa-arrow-right ml-5 arrows"></i>
        </div>
      </div>


    <RouterLink to="posts/create">
      <p>Crea il tuo post</p>
    </RouterLink>
  </main>
</template>

<style scoped>
.post-card {
  background-color: orange;
  border: 1px solid black;
  padding: 1rem;
}

.arrows {
  background-color: red;
  padding: 1rem;
  border-radius: 50%;
}
</style>