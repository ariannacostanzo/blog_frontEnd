<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

//refresho così se mi trovo su post mi fa il reaload dei posts
const postAndRefresh = () => {
  if (route.path === '/') router.go(0); 
  else router.push({path: '/'})
  
}
</script>

<template>
  <header>
    <ul class="flex items-center justify-center gap-10">
      <li><a href="#" @click="postAndRefresh">Home</a></li>
      <li><a href="#" @click="postAndRefresh">Post</a></li>
      <li><a href="#">About us</a></li>
      <li><a href="#">Contattaci</a></li>
    </ul>
  </header>
</template>

<style scoped>
  header {
      background-color: var(--custom-violet);
      padding: 15px;
      font-family: 'Cyber', sans-serif;
      
  }
  
  li, .link {
    transition: all .2s ease-in;
    font-size: 18px;
  }
  
  li:hover {
    color: var(--custom-pink);
  }
</style>