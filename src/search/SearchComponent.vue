<template>
    <div class="search-component">
      <input v-model="searchTerm" @input="performSearch" placeholder="Search..." />

      <div class="search-results">
        <SearchResult v-for="result in searchResults" :key="result.id" :result="result" />
      </div>

      <Pagination
        :resultsPerPage="resultsPerPage"
        :totalResults="totalResults"
        v-model:currentPage="currentPage"
        :maxPagesShown="5"
        @update:currentPage="handlePageChange"
      />
    </div>
  </template>
  
  <script>
  import { getOramaDB, search } from "@orama/plugin-astro/client";
  import { getInMemoryTestDatabase } from '../../scripts/get-test-db';
  import SearchResult from './SearchResult.vue';
  import Pagination from './Pagination.vue';

  export default {
    components: {
      SearchResult,
      Pagination,
    },
    data() {
      return {
        searchTerm: '',
        searchResults: [],
        totalResults: 0,
        db: null,
        currentPage: 1,
        resultsPerPage: 10
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
            const searchParams = {
              limit: this.resultsPerPage,
              offset: (this.currentPage - 1) * this.resultsPerPage,
            };

            if (this.searchTerm.trim() !== '') {
                searchParams.term = this.searchTerm;
                searchParams.properties = "*";
            }

            console.log(`searchParams: ${JSON.stringify(searchParams)}`);

            results = await search(this.db, searchParams);

            this.searchResults = results.hits;
            this.totalResults = results.count;
            console.log(`totalResults: ${this.totalResults}`);
            console.log(results);
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.performSearch();
        },
    },
  };
  </script>
  
  <style scoped>
  .search-results {
    margin-top: 2em;
  }
  </style>