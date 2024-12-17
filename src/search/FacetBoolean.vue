<template>
  <div class="facet-boolean" @click="toggle">
    <input
      type="checkbox"
      :checked="isChecked"
      @change="toggle"
    />
    <label>{{ title }}</label>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    facet: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    toggle() {
      this.isChecked = !this.isChecked;
      this.$emit('update-boolean', this.facet, this.isChecked);
    },
  },
};
</script>

<style scoped>
.facet-boolean {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.facet-boolean input {
  margin-right: 5px;
}
</style>