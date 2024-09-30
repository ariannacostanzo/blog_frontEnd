<script setup>
const props = defineProps({
    post: Object
})
</script>

<template>
    <div class="post-card">
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
    </div>
</template>

<style scoped>
  .post-card {
      padding: 1rem;
      position: relative;
      height: 280px;
      text-shadow: 1px 1px 1px black;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }



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
</style>