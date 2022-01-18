<template>
  <div class="d-flex justify-content-center align-items-center mt-5">
    <h2>Category or Sub Category Empty!</h2>
  </div>
</template>

<script>
export default {
  name: "empty",
  data(){
    return {
      title: 'Empty Page'
    }
  },
  head(){
    return {
      title: this.title
    }
  }
}
</script>

<style scoped>

</style>
