<template>
    <div class="search-component">
        <SearchBar
        :searchTerm="searchTerm"
        @update:searchTerm="handleSearchTermUpdate"
        placeholder="Search for a scroll..."
        />
    
        <div class="search-layout">
            <div class="facet-sidebar">
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

                <FacetCheckbox
                    title="Repository Nation"
                    :options="facetOptions.repository_nation"
                    field="repository_nation"
                    @update-facet="updateFacets"
                    :showCount="5"
                />

                <FacetBoolean
                    title="Has Images"
                    facet="has_images"
                    @update-boolean="updateBooleanFacet"
                />
            </div>
            <div class="search-results">
                <SearchResult v-for="result in searchResults" :key="result.id" :result="result" />
            </div>
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
  import FacetBoolean from './FacetBoolean.vue';
  import SearchBar from './SearchBar.vue';

  export default {
    components: {
      SearchResult,
      Pagination,
      FacetCheckbox,
      FacetBoolean,
      SearchBar
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
            console.log(`searchTerm: ${this.searchTerm}`);
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
                },
                "repository_nation": {
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
              repository: results.facets.repository.values || {},
              repository_nation: results.facets.repository_nation.values || {},
            };
            console.log(`totalResults: ${this.totalResults}`);
            console.log(results);
        },
        isBooleanFacet(field) {
            const booleanFacets = ['has_images']; // Add more boolean facets as needed
            return booleanFacets.includes(field);
        },
        buildWhereClause() {
            const where = {};
            for (const [field, values] of Object.entries(this.selectedFacets)) {
                if (this.isBooleanFacet(field)) {
                where[field] = values; // Use boolean directly
                } else if (Array.isArray(values) && values.length > 0) {
                where[field] = { in: values }; // Use 'in' to match any of the selected values
                }
            }
            return where;
        },
        handleSearchTermUpdate(searchTerm) {
            this.searchTerm = searchTerm;
            this.performSearch();
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
        },
        updateBooleanFacet(field, value){
            this.selectedFacets[field] = value;
            this.performSearch();
        }
    },
  };
  </script>
  
  <style scoped>
    .search-component {
        width: 100%;
        overflow: hidden;
    }

    .search-layout {
        display: flex;
        margin-top: 1em;
        align-items: flex-start;
        overflow: hidden;
    }

    .facet-sidebar {
        flex: 0 0 225px;
        margin-right: 1em;
        box-sizing: border-box;
    }

    .search-results {
        flex: 1;
        margin-top: 2em;
        box-sizing: border-box;
        overflow: visible;
        word-wrap: break-word;
        max-width: calc(100% - 225px - 1em);
    }
  </style>