<template>
  <div>
    <p>Error page</p>
    <h1>{{error.statusCode}} </h1>
  </div>
</template>

<script>
export default {
  layout: 'error-layout',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>