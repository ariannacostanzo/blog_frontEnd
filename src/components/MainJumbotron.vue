<script setup>
</script>

<template>
  <figure>
    <img src="../assets/images/background.jpg" alt="">
  </figure>
</template>

<style scoped>
  figure {
    width: 100%;
    height: 100%;
    position: absolute;
    
    background-color: rgba(0, 0, 0, .2);
    z-index: -1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit:cover;
    object-position: top center;
    position: absolute;
    z-index: -1;
    opacity: .2;
  }
</style>