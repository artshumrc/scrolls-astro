<template>
    <div class="search-component">
      <input v-model="searchTerm" @input="performSearch" placeholder="Search..." />

      <div class="search-results">
        <SearchResult v-for="result in searchResults" :key="result.id" :result="result" />
      </div>
    </div>
  </template>
  
  <script>
  import { getOramaDB, search } from "@orama/plugin-astro/client";
  import { getInMemoryTestDatabase } from '../../scripts/get-test-db';
  import SearchResult from './SearchResult.vue';

  export default {
    components: {
      SearchResult,
    },
    data() {
      return {
        searchTerm: '',
        searchResults: [],
        totalResults: 0,
        db: null,
      };
    },
    async created() {
        if (import.meta.env.MODE === 'development') {
            this.db = await getInMemoryTestDatabase();
        } else {
            this.db = await getOramaDB('scrolls');
        }
        await this.performSearch();
    },
    methods: {
        async performSearch() {
            let results;
            const searchParams = {};

            if (this.searchTerm.trim() !== '') {
                searchParams.term = this.searchTerm;
                searchParams.properties = "*";
            }

            results = await search(this.db, searchParams);

            this.searchResults = results.hits;
            this.totalResults = results.count;
            console.log(`totalResults: ${this.totalResults}`);
            console.log(results);
        },
    },
  };
  </script>
  
  <style scoped>
  .search-component {}

  .search-results {
    margin-top: 2em;
  }
  </style>