<template>
  <div class="d-flex flex-column justify-content-between">
    <div class="my-5 container" id="main">
      <div class="row my-5">
        <div class="col-md-3">
          <h3>Sidebar</h3>
          <hr/>
          <br/>
          <div class="d-flex flex-column  justify-content-between" id="left_menu">
            <nuxt-link to="/profile">Profile</nuxt-link>
            <nuxt-link to="/profile/orders-detail">Orders</nuxt-link>
            <nuxt-link to="/profile/feedback">Reviews</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="/profile/settings">Settings</nuxt-link>
          </div>
        </div>
        <div class="col-md-9 mb-5">

          <div class="card mb-5" style="width: 100%;">
            <div class="row py-3">
              <div class="col-md-4 mx-auto w-75 text-center">
                <img :src="`${$axios.defaults.baseURL}/uploads/${product.product_photo}`"
                     class="img-fluid" alt="dexp" width="150">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <nuxt-link :to="`/shop/products/${product.product_id}`" target="_blank"><h5 class="card-title">
                    {{ `${product.product_name}` }}</h5></nuxt-link>
                  <div class="d-flex justify-content-end">
                    <h5 class="card-text">{{(new Intl.NumberFormat("ru")).format(product.product_price) + ' ₱'}}</h5>
                  </div>
                  <p class="card-text d-flex justify-content-start">
                    <small class="text-muted">{{ `CKU:  ${product.sku}`}}</small>
                  </p>
                </div>
              </div>

            </div>
          </div>
          <h3 class="my-5 text-center">{{ `Assess ${product.product_name}`  }}</h3>
          <reviews class="mt-5" :product_id="`${product.product_id}`"></reviews>
        </div>
      </div>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import Reviews from "../../../components/Reviews";
import FooterBottom from "../../../components/FooterBottom";

export default {
  middleware: ['auth'],
  components: {
    Reviews,
    FooterBottom
  },
  head(){
    return {
      title: `Review product ${this.$route.params.id}`
    }
  },
  data(){
    return {
      product: ''
    }
  },

  async mounted() {
    await this.$axios.$get(`${this.$axios.defaults.baseURL}/api/shop/product-details/${this.$route.params.id}`)
        .then(res => {
          this.product = res
        })
  },

  methods: {

  }
}

</script>

<style lang="scss" scoped>
#left_menu{
  border-right: 1px solid #ccc;
  a {
    margin: 10px 0;
    text-transform: uppercase;
    &:hover{
      text-decoration: none;
    }
  }
}
</style>
