<template>
  <div class="container">
    {{ 'Create Category Product' }}
  </div>
</template>

<script>
export default {
  middleware: ["isAdmin"]
}
</script>

<style scoped>

</style>
