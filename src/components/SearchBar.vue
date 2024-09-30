<script setup>
import { ref, defineEmits } from 'vue';

const searchedTerm = ref('');
const emit = defineEmits();


const filterPosts = () => {
    emit('search', searchedTerm.value);
}
</script>

<template>
    <div>
        <input type="text" id="searchbar" placeholder="Zelda..." v-model="searchedTerm" @keydown.enter="filterPosts">
        <button class="custom-span ml-4" @click="filterPosts">Cerca</button>
    </div>
</template>

<style scoped>
input {
    padding: 2px 10px;
    color: var(--custom-black);
}
</style>