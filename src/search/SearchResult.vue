<template>
    <div class="search-result">
      <h4>{{ result.document.meta_title }}</h4>
      <p>{{ result.document.description }}</p>
      <div class="metadata-pills">
        <MetadataPill
          v-for="(value, key) in result.document"
          :key="key"
          :propertyName="key"
          :propertyValue="value"
        />
      </div>
    </div>
</template>

<script>
import MetadataPill from './MetadataPill.vue';

export default {
  components: {
    MetadataPill,
  },
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
  max-width: 100%;
}

.metadata-pills {
  margin-top: 0.5em;
}


</style>