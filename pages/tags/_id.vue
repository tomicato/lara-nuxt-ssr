<template>
  <div>
    <h4>{{ $route.params.id }}</h4>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: this.title.split('')[0].toUpperCase() + this.title.slice(1)
    }
  },
  data(){

    return {
      tags: [],
      title: ''
    }
  },
  async asyncData(ctx){
    let title = ctx.route.params.id
    let id = ctx.route.query.id
   // console.log(id + ' ' + title);
    /*let products = await ctx.$axios.$post(`/api/shop/tags/${id}`);
    console.log(products);*/
    return {
      tags: [],
      title: title
    }
  }
}
</script>

<style scoped>

</style>
