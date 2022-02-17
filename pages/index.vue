<template>
  <div class="show">
    <header-top></header-top>
    <div class="container">
      <div v-for="(item, i) in data" :key="i">
        <h3 class="font-weight-lighter">{{ item.name }}</h3>
        <div class="card-columns my-4">

          <div class="card" v-for="(product, k) in item.products" :key="k">
              <div class="card-body show2" @click.prevent="goToProduct(product)">
                <img :src="`${$axios.defaults.baseURL}/uploads/${product.photo}`" class="card-img-top w-50"
                     :alt="product.name">
                <h5 class="font-weight-normal my-4 text-center">{{ product.name }}</h5>
              </div>
          </div>

        </div>
      </div>
    </div>
    <FooterBottom/>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import FooterBottom from "@/components/FooterBottom";

export default {
  name: 'index',
  layout: 'main_layout',
  head: {
    title: 'Electronics Shop',
    meta: [],
    data: []
  },
  components: {
    HeaderTop,
    FooterBottom
  },
  async asyncData(ctx) {
    let {data} = await ctx.$axios.get('/api/shop/additional')
    //console.log(data.data[0].products[0].name);
    return {
      data: data.data
    }
  },
  methods: {
    goToProduct(product){
      this.$router.push(`/shop/products/${product.id}`)
    }
  }

  /* beforeCreate() {
      this.$nuxt.$router.replace({ path: '/'});
    }*/


}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}

.card-columns {
  @media (max-width: 767.98px) {
    column-count: 1;
  }
  /* @media (max-width: 991.98px) {
     column-count: 3;
   }*/
  @media (min-width: 1199.98px) {
    column-count: 3;
  }
}

.card-body {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.card a{
  text-decoration: none;
  color: rgba(0,0,0,0.75);
  h5{
    font-size: 1rem;
  }
}

@keyframes bgchange {
  100% {
    opacity: 1
  }
  0% {
    opacity: 0
  }
}


.show2 {
  transition: opacity ease-in-out 2s;
  animation: bgchange 2s;
}

</style>

