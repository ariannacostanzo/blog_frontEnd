<script setup>
import axios from 'axios';
import { ref } from 'vue';

const posts = ref([])

const fetchPosts = async () => {
  try {
    const res = await axios.get('http://localhost:8000/posts');
    console.log(res.data)
    posts.value = res.data.data;
  } catch (error) {
    console.log(error)
  }

  console.log(posts.value)

}

//ottengo i posts
fetchPosts();

</script>

<template>
  <main class="container mx-auto mt-5">

      <h1 class="text-4xl font-bold mb-5 text-center">Lista dei post</h1>



      <div class="flex items-center justify-center ">
        <i class="fa-solid fa-arrow-left mr-5 arrows"></i>
        <RouterLink :to="{ name: 'detailPost', params: {slug: post.slug}}" v-for="post in posts"
          class="mx-5 my-2 post-card" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </RouterLink>
        <RouterLink to="/posts/post-1">
          Post 1
        </RouterLink>

        <i class="fa-solid fa-arrow-right ml-5 arrows"></i>
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