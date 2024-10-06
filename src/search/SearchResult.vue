<template>
    <div class="search-result">
      <h4>{{ result.document.meta_title }}</h4>
      <p>{{ result.document.description }}</p>
      <code>{{ result.document }}</code>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      result: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .search-result {
    border: 1px solid #ccc;
    padding: 1em;
    margin-bottom: 1em;
  }
  </style>