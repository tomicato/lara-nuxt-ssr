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
            <nuxt-link to="#">Settings</nuxt-link>
          </div>
        </div>
        <div class="col-md-9 mb-5">
          <h3 class="mb-5 text-center">{{ 'Order`s detail' }}</h3>
          <hr>
          <div v-for="(item, i) in data" :key="i" class="mb-5">
            <img :src="`${$axios.defaults.baseURL}/uploads/${item.product_photo}`"
                 class="img-fluid" :alt="item.product_name" width="150">
          </div>
        </div>
      </div>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
export default {
  name: "orders-detail",
  data() {
    return {
      data: []
    }
  },
  mounted() {
    let order_details = this.$axios.$post(`https://com-helps.online/api/shop/order-details/${this.$auth.user.id}`)
        .then(res => {
          this.data = res.data
        })

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#left_menu {
  border-right: 1px solid #ccc;

  a {
    margin: 10px 0;
    text-transform: uppercase;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>

