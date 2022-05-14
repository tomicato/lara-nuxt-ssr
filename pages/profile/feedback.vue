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
          <h3 class="mb-5 text-center">{{ 'Your Reviews' }}</h3>
          <reviews></reviews>
        </div>
      </div>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import Reviews from "../../components/Reviews";
import FooterBottom from "../../components/FooterBottom";

export default {
  middleware: ['auth'],
  components: {
    Reviews,
    FooterBottom
  },
  data() {
    return {}
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
