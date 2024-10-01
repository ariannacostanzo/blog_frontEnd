<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const isLoading = ref(true);
const loadingProgress = ref(0);
let intervalId = null;

const startLoading = () => {
  intervalId = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += 1; 
    } else {
      clearInterval(intervalId); 
    }
  }, 1); 
};

onMounted(() => {
  startLoading(); 
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="loader-container">

    <div class="my-14">
      <h2>Loading</h2>
      <div class="loader">
        <div class="loading" :style="{ width: `${loadingProgress}%` }"></div>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .loader-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    margin-top: 10rem;
  }

  h2 {
    font-size: 28px;
    color: var(--custom-white);
    text-shadow: 1px 1px 2px black;
    text-align: center;
  }

  .loader {
    border: 3px solid var(--custom-green);
    height: 35px;
    padding: 5px;
    width: 350px;
  }

  .loading {
    background-color: var(--custom-green);
    /* width: 100%; */
    height: 100%;
  }
  
  img {
    width: 500px;
    height: 200px;
  }
</style>

<!-- fare un vero loader  -->