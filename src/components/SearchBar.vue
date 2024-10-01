<script setup>
import { ref, defineEmits } from 'vue';

const searchedTerm = ref('');
const emit = defineEmits();


const filterPosts = () => {
    emit('search', searchedTerm.value);
}
</script>

<template>
    <div class="relative">
        <input type="text" id="searchbar" placeholder="Zelda..." v-model="searchedTerm" @keydown.enter="filterPosts">
        <span v-if="searchedTerm" @click="searchedTerm = ''"><i class="fa-solid fa-xmark"></i></span>
        <button class="custom-span ml-4" @click="filterPosts">Cerca</button>
    </div>
</template>

<style scoped>
input {
    padding: 2px 10px;
    color: var(--custom-black);
}

span {
    position: absolute;
    right: 82px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--custom-pink);
    cursor: pointer;
}
</style>