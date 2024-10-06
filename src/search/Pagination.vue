<template>
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span v-for="page in visiblePages" :key="page">
        <button
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
      </span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      resultsPerPage: {
        type: Number,
        required: true,
      },
      totalResults: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
      maxPagesShown: {
        type: Number,
        default: 5,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalResults / this.resultsPerPage);
      },
      visiblePages() {
        const pages = [];
        const half = Math.floor(this.maxPagesShown / 2);
        let start = Math.max(1, this.currentPage - half);
        let end = Math.min(this.totalPages, this.currentPage + half);
  
        if (this.currentPage <= half) {
          end = Math.min(this.totalPages, this.maxPagesShown);
        } else if (this.currentPage + half >= this.totalPages) {
          start = Math.max(1, this.totalPages - this.maxPagesShown + 1);
        }
  
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        return pages;
      },
    },
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('update:currentPage', page);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    gap: 5px;
  }
  button {
    padding: 5px 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  button.active {
    background-color: #007bff;
    color: white;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>