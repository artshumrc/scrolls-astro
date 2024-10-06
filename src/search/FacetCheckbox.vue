<template>
    <div class="facet-checkbox">
      <h3 @click="toggleDropdown">
        {{ title }}
        <span class="dropdown-indicator">{{ isOpen ? '-' : '+' }}</span>
      </h3>
      <div v-if="isOpen" class="facet-options" :style="{ maxHeight: maxHeightStyle }">
        <div v-for="(count, value) in options" :key="value" class="facet-option">
          <input
          type="checkbox"
          :id="value"
          :value="value"
          @change="toggleFacet(value, $event.target.checked)"
          />
          <label :for="value">{{ value }} ({{ count }})</label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      options: {
        type: Object,
        required: true,
      },
      field: {
        type: String,
        required: true,
      },
      showCount: {
        type: Number,
        default: 5,
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      maxHeightStyle() {
        const optionHeight = 30; // Approximate height of each option in pixels
        return `${this.showCount * optionHeight}px`;
      },
    },
    methods: {
      toggleFacet(value, checked) {
        this.$emit('update-facet', this.field, value, checked);
      },
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
    .facet-checkbox {
        margin-bottom: 1em;
        cursor: pointer;
    }
    .facet-options {
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 5px;
    }
    .facet-option {
        display: flex;
        align-items: center;
    }
    .dropdown-indicator {
        margin-left: 5px;
        font-size: 32px;
    }
  </style>