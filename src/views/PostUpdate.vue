<script setup>
//importazioni
import LoaderApi from '@/components/LoaderApi.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MainJumbotron from '@/components/MainJumbotron.vue';

// variabili 
const router = useRouter();
const route = useRoute();
const baseUrl = 'http://localhost:8000/posts/';
const post = ref({})
const baseData = ref({
    title: '',
    content: '',
    section: '',
    published: true,
    tags: [],
    categoryId: null
});
const isLoading = ref(false)
const slug = route.params.slug;
const categories = ref([]);
const baseUrlCategories = 'http://localhost:8000/categories';

//errori
const errors = ref([]);
const titleErrors = [];
const contentErrors = [];
const sectionErrors = [];
const categoryErrors = [];
const publishedErrors = [];
// conteggio dei caratteri
let contentCharCount = ref(baseData.value.content.length);
let sectionCharCount = ref(baseData.value.section.length);
let titleCharCount = ref(baseData.value.title.length);
const maxContentChar = 100;
const maxSectionChar = 2000;
const maxTitleChar = 100;
const minChar = 3;

//funzioni
const sendPost = async () => {
    emptyErrors(titleErrors);
    emptyErrors(contentErrors);
    emptyErrors(sectionErrors);
    emptyErrors(categoryErrors);
    emptyErrors(publishedErrors);

    const formData = new FormData();
    formData.append('image', baseData.value.image);
    formData.append('title', baseData.value.title);
    formData.append('content', baseData.value.content);
    formData.append('section', baseData.value.section);
    formData.append('published', baseData.value.published);
    formData.append('categoryId', baseData.value.categoryId);
    if (Array.isArray(baseData.value.tags)) {
        baseData.value.tags.forEach(tag => {
            formData.append('tags[]', tag);
        });
    }
    isLoading.value = true
    try {

        // const res = await axios.put(baseUrl + `${slug}`, baseData.value);
        await axios.put(`${baseUrl}/${post.value.slug}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        const newSlug = baseData.value.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
        router.push({ name: 'detailPost', params: { slug: newSlug } })
        

    } catch (error) {
        errors.value = error.response.data.errors;
        validation();
    } finally {
        isLoading.value = false;
    }
}

const handleImage = (event) => {
    baseData.value.image = event.target.files[0];
};

const emptyErrors = (container) => {
    container.length = 0
}

const validation = () => {
    if (errors.value.length > 0) {
        errors.value.forEach(error => {
            if (error.path === "title") {
                titleErrors.push(error.msg)
            }
            if (error.path === "content") {
                contentErrors.push(error.msg)
            }
            if (error.path === "section") {
                sectionErrors.push(error.msg)
            }
            if (error.path === "categoryId") {
                categoryErrors.push(error.msg)
            }
            if (error.path === "published") {
                publishedErrors.push(error.msg)
            }
        })
        return
    }
}

const fetchPost = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrl + slug);
        post.value = res.data;
        baseData.value = {
            title: post.value.title,
            content: post.value.content,
            section: post.value.section,
            published: post.value.published,
            categoryId: post.value.categoryId,
            // tags: post.value.tags.map(tag => tag.id) 
        };
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false;
    }

}

const fetchCategories = async () => {
    isLoading.value = true
    try {
        const res = await axios.get(baseUrlCategories);
        categories.value = res.data;
        isLoading.value = false;
    } catch (error) {
        console.log(error)
    }
}

const updateCharacters = (field) => {
    if (field === 'content') {
        contentCharCount.value = baseData.value.content.length
    } else if (field === 'title') {
        titleCharCount.value = baseData.value.title.length
    } else {
        sectionCharCount.value = baseData.value.section.length
    }
}


onMounted(()=> {
    fetchPost();
    fetchCategories()
})

//fare la validazione a front-end
</script>

<template>
    <main class="container mx-auto my-5">
        <h1 class="text-center text-4xl mb-5">Modifica il post</h1>
        <LoaderApi v-if="isLoading" />
        <form @submit.prevent="sendPost" v-else class="form-container relative">
            <MainJumbotron />
            <div class="my-5 input-row">
                <!-- titolo  -->
                <div class="input-container">
                    <label for="title">Titolo:</label>
                    <div>
                        <div class="relative">
                            <input @input="updateCharacters('title')" class="pb-4" id="title" type="text"
                                v-model="baseData.title" />
                            <p v-if="titleCharCount > 0" class="absolute right-[3px] bottom-[0px]">
                                <span
                                    :class="[titleCharCount <= minChar || titleCharCount >= maxTitleChar ? 'text-[#f60001]' : '']">{{
                                    titleCharCount
                                    }}</span> / <span
                                    :class="[titleCharCount <= minChar || titleCharCount >= maxTitleChar ? 'text-[#f60001]' : '']">{{
                                    maxTitleChar }}</span>
                            </p>
                        </div>
                        <div class="errors-container">
                            <p v-for="error in titleErrors">{{ error }}</p>
                        </div>
                    </div>
                </div>
                <div class="input-container">
                    <!-- descrizione  -->
                    <label for="content">Descrizione:</label>
                    <div>
                        <div class="relative">
                            <textarea @input="updateCharacters('content')" rows="4" name="content" id="content"
                                v-model="baseData.content" class="pb-4 py-1">
                            </textarea>
                            <p v-if="contentCharCount > 0" class="absolute right-[8px] bottom-[8px]">
                                <span
                                    :class="[contentCharCount <= minChar || contentCharCount >= maxContentChar ? 'text-[#f60001]' : '']">{{
                                    contentCharCount
                                    }}</span> /
                                <span
                                    :class="[contentCharCount <= minChar || contentCharCount >= maxContentChar ? 'text-[#f60001]' : '']">{{
                                    maxContentChar }}</span>
                            </p>
                        </div>
                        <div class="errors-container">
                            <p v-for="error in contentErrors">{{ error }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-5 input-row">
                <div class="input-container">
                    <!-- contenuto  -->
                    <label for="section">Contenuto:</label>
                    <div>
                        <div class="relative">

                            <textarea @input="updateCharacters('section')" class="bigger-textarea pb-4 pt-1" rows="4"
                                name="section" id="section" v-model="baseData.section"></textarea>
                            <p v-if="sectionCharCount > 0" class="absolute right-[8px] bottom-[8px]">
                                <span
                                    :class="[sectionCharCount <= minChar || sectionCharCount >= maxSectionChar ? 'text-[#f60001]' : '']">
                                    {{ sectionCharCount }}</span> /
                                <span
                                    :class="[sectionCharCount <= minChar || sectionCharCount >= maxSectionChar ? 'text-[#f60001]' : '']">{{
                                    maxSectionChar }}</span>
                            </p>
                        </div>
                        <div class="errors-container">
                            <p v-for="error in sectionErrors">{{ error }}</p>
                        </div>
                    </div>
                </div>
                <div>

                    <div class="input-container">
                        <!-- pubblicato  -->
                        <label>Pubblicato:</label>
                        <div>
                            <label for="published-true">Si</label>
                            <input checked type="radio" id="published-true" name="published" value="true"
                                v-model="baseData.published">
                        </div>
                        <div>
                            <label for="published-false">No</label>
                            <input type="radio" id="published-false" name="published" value="false"
                                v-model="baseData.published">
                        </div>
                        <div class="errors-container">
                            <p v-for="error in publishedErrors">{{ error }}</p>
                        </div>
                    </div>
                    <!-- immagine  -->
                    <div class="input-container mt-10">
                        <input type="file" @change="handleImage" accept="image/*">
                    </div>
                </div>
            </div>
            <div class="my-5 input-row">
                <!-- categoria  -->
                <label>Scegli una categoria:</label>
            </div>
            <div class="my-5 input-row" v-if="categories.length > 0">
                <div v-for="category in categories" :key="category.id">
                    <label :for="category.name">{{ category.name }}</label>
                    <input type="radio" :id="category.name" :name="category.id" :value="category.id"
                        v-model="baseData.categoryId">
                </div>
            </div>
            <div class="my-5 input-row">
                <div class="errors-container">
                    <p v-for="error in categoryErrors">{{ error }}</p>
                </div>
            </div>
            <div class="flex items-center justify-center mt-10 my-4">
                <RouterLink class=" custom-span" to="/">
                    Torna indietro
                </RouterLink>
                <button class="custom-span ml-5 ">Modifica<i class="fa-solid fa-floppy-disk ml-2"></i></button>
            </div>
        </form>

    </main>
</template>

<style scoped>
main {
    color: var(--custom-black);
    margin: 2rem auto;

}

.input-row {
    display: flex;
    align-items: start;
    justify-content: space-evenly;
    gap: 30px;
    flex-wrap: wrap;
    padding: 1rem;
}

.input-container {
    display: flex;
    align-items: start;
    gap: 10px;
}

.form-container {
    border: 2px solid var(--custom-purple);
    background-color: transparent;
    width: 80%;
    border-radius: 10px;
    margin: 2rem auto;
}

label {
    margin-right: 5px;
}


input[type='text'], textarea {
    width: 300px;
}



.bigger-textarea {
    width: 500px;
    height: 250px;
}

.errors-container {
    color: var(--custom-red);
}
</style>