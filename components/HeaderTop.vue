<template>
  <div id="header-top" class="d-flex justify-content-center w-100 mb-5" style="" >
    <img :src="`http://lara-nuxt-ssr/uploads/win-11.jpg`" alt="">
  </div>
</template>

<script>
export default {
  name: "Header"
}



</script>

<style lang="scss" scoped>
  #header-top{
    height: 400px;

    @media screen and (min-width: 600px) and (max-width: 768px) {
      height: 300px;
    }

    @media screen and (max-width: 599px){
      height: 200px;
    }

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
