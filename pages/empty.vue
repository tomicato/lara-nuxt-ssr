<template>
  <div>
    <div class="d-flex flex-column justify-content-center align-items-center mt-5">
      <h2>Category or Sub Category Empty!</h2>
      <div class="mt-4">
        <nuxt-link to="/shop">Back to Shop</nuxt-link>
      </div>
    </div>

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
