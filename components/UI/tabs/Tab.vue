<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true
    },
    selected: {
      default: false
    },
    object: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted(){
    this.isActive = this.selected
  }
}
</script>