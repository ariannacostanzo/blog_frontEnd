<script setup>
import MainJumbotron from '@/components/MainJumbotron.vue';
import PostContainer from '@/components/PostContainer.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';
const searchTerm = ref('');
const handleSearch = (term) => {
  searchTerm.value = term;
};

/* da fare le immagini  */

</script>

<template>

  <!-- jumbotron  -->
  <MainJumbotron />

  <main class="container mx-auto mt-5">

    <h1 class="text-4xl font-bold mb-5 text-center">Notizie sui videogiochi: le piu' recenti</h1>

    <div class="flex justify-between items-center mb-6">

      <!-- link alla creazione  -->
      <RouterLink to="posts/create" class="custom-span">
        <span>Crea un nuovo post <i class="fa-regular fa-pen-to-square"></i></span>
      </RouterLink>

      <!-- searchbar -->
        <SearchBar @search="handleSearch"/>
    </div>

    <!-- i posts  -->
    <PostContainer :searchTerm="searchTerm"/>

    
  </main>
  
</template>

<style scoped>


</style>