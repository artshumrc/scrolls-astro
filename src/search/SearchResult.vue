<template>
    <div class="search-result">
      <h4>{{ result.document.meta_title }}</h4>
      <p>{{ result.document.description }}</p>
      <div class="metadata-pills">
        <MetadataPill
          v-for="(displayTitle, key) in filteredMetadata"
          :key="key"
          :propertyName="displayTitle"
          :propertyValue="result.document[key]"
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
  computed: {
    filteredMetadata() {
      const mapping = {
        type: 'Type',
        repository: 'Repository',
        shelfmark: 'Shelfmark',
        date_start: 'Start Date',
        date_end: 'End Date',
        language_1: 'Primary Language',
        language_2: 'Secondary Language',
        repository_city: 'Repository City',
        repository_nation: 'Repository Nation',
        provenance: 'Provenance',
      };

      return Object.keys(mapping).reduce((acc, key) => {
        if (this.result.document[key]) {
          acc[key] = mapping[key];
        }
        return acc;
      }, {});
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