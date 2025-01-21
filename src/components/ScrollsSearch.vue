<template>
    <div v-if="!pagefind" class="loading">
        Loading search...
    </div>
    <Search
        v-else
        :pagefind="pagefind"
    >
    </Search>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Search from "./search/Search.vue";

let pagefindPath: string;
if (import.meta.env.PROD) {
  pagefindPath = new URL('/pagefind/pagefind.js', import.meta.url).href;
} else {
  pagefindPath = "../../../pagefind/pagefind.js"; // this needs to be the path relative from the file it is actually imported
}

const pagefind = ref<any>(null);

onMounted(async () => {
  try {
    const pf = await import(/* @vite-ignore */ pagefindPath);
    await pf.init();
    pagefind.value = pf;
  } catch (error) {
    console.error('Failed to initialize pagefind:', error);
  }
});
</script>