<template>
  <div>
    <header-top></header-top>
    <div class="container">
      {{ 'Hello Home Page!' }}
    </div>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";

export default {
  name: 'index',
  head: {
    title: 'Nuxt Shop',
    meta: []
  },
  components: {
    HeaderTop
  },
  fetch(ctx) {
    ctx.redirect('/shop')
  }
  /* beforeCreate() {
     this.$nuxt.$router.replace({ path: '/shop'});
   }*/
}
</script>

