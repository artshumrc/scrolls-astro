<template>
    <span class="metadata-pill">
      {{ propertyName }}: {{ propertyValue }}
    </span>
  </template>
  
  <script>
  export default {
    props: {
      propertyName: {
        type: String,
        required: true,
      },
      propertyValue: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .metadata-pill {
    display: inline-block;
    background-color: #e0e0e0;
    color: #333;
    padding: 0.2em 0.5em;
    margin: 0.2em;
    border-radius: 12px;
    font-size: 0.9em;
  }
  </style>