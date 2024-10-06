<template>
    <div class="search-component">
      <input v-model="searchTerm" @input="performSearch" placeholder="Search..." />

      <FacetCheckbox
        title="Type"
        :options="facetOptions.type"
        field="type"
        @update-facet="updateFacets"
        :showCount="5"
      />

      <FacetCheckbox
        title="Repository"
        :options="facetOptions.repository"
        field="repository"
        @update-facet="updateFacets"
        :showCount="5"
      />

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
  import FacetCheckbox from './FacetCheckbox.vue';

  export default {
    components: {
      SearchResult,
      Pagination,
      FacetCheckbox
    },
    data() {
      return {
        searchTerm: '',
        searchResults: [],
        totalResults: 0,
        db: null,
        currentPage: 1,
        resultsPerPage: 10,
        selectedFacets: {},
        facetOptions: {}
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
              facets: {
                "type": {
                  "limit": 10,
                  "order": "asc"
                },
                "repository": {
                  "limit": 10,
                  "order": "asc"
                }
              }
            };

            if (this.searchTerm.trim() !== '') {
                searchParams.term = this.searchTerm;
                searchParams.properties = "*";
            }

            const whereClause = this.buildWhereClause();
            if (Object.keys(whereClause).length > 0) {
              searchParams.where = whereClause;
            }

            console.log(`searchParams: ${JSON.stringify(searchParams)}`);

            results = await search(this.db, searchParams);

            this.searchResults = results.hits;
            this.totalResults = results.count;
            this.facetOptions = {
              type: results.facets.type.values || {},
              repository: results.facets.repository.values || {}
            };
            console.log(`totalResults: ${this.totalResults}`);
            console.log(results);
        },
        buildWhereClause() {
          const where = {};
          for (const [field, values] of Object.entries(this.selectedFacets)) {
            if (values.length > 0) {
              where[field] = { in: values }; // Use 'in' to match any of the selected values
            }
          }
          return where;
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.performSearch();
        },
        updateFacets(field, value, checked){
          if (!this.selectedFacets[field]) {
            this.selectedFacets[field] = [];
          }
          if (checked) {
            this.selectedFacets[field].push(value);
          } else {
            this.selectedFacets[field] = this.selectedFacets[field].filter(v => v !== value);
          }
          this.performSearch();
        }
    },
  };
  </script>
  
  <style scoped>
  .search-results {
    margin-top: 2em;
  }
  </style>