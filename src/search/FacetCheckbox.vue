<template>
    <div class="facet-checkbox">
      <div @click="toggleDropdown" class="facet-title">
        {{ title }}
        <span class="dropdown-indicator" :class="{ open: isOpen }"></span>
      </div>
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
        cursor: pointer;
        padding-bottom: 15px;
        padding-top: 15px;
        border-bottom: 1px solid #eee;
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
        margin-left: auto;
        width: 16px;
        height: 16px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
        transform: rotate(0deg);
        transition: transform 0.3s ease;
    }
    .dropdown-indicator.open {
        transform: rotate(180deg);
    }
    .facet-title {
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  </style>