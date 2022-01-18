<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light"
       style="border-bottom: 1px solid #ddd;box-shadow: 0 2px 18px 0 #e1dede;">
    <nuxt-link to="/" class="navbar-brand">Web Shop</nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">

        <li class="nav-item">
          <nuxt-link to="/shop" class="nav-link">Shop</nuxt-link>
        </li>

        <li class="nav-item active">
          <nuxt-link to="/topics" class="nav-link">Blog</nuxt-link>
        </li>

        <li class="nav-item active">
          <nuxt-link to="/contact" class="nav-link">Contact</nuxt-link>
        </li>

      </ul>


      <!--     <template>
       <ul class="navbar-nav ml-auto">
               <li class="nav-item mr-5">
                 <nuxt-link to="/cart" class="nav-link">
                   <b-badge pill variant="primary" id="authCart">{{  cart != 0 ? cart : ''  }}</b-badge>
                   <b-icon-cart4 style="color: deepskyblue"/>
                 </nuxt-link>
               </li>
         <li class="nav-item">
            <nuxt-link to="/profile" class="nav-link">{{ userRole == 'Admin' ? userRole : user.data.name }}</nuxt-link>
          </li>
         <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link">Logout</a>
          </li>
        </ul>
      </template>-->

      <template>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-5">
            <nuxt-link to="/cart" class="nav-link">
              <b-badge pill variant="primary" id="cart">{{ cart != 0 ? cart : '' }}</b-badge>
              <b-icon-cart4 style="color: deepskyblue"/>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="#" class="nav-link">Login</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="#" class="nav-link">Register</nuxt-link>
          </li>
        </ul>
      </template>

    </div>

  </nav>
</template>

<script>
import Cart from "~/pages/cart/index"

export default {

  name: "NavBar",
  components: {
    Cart
  },
  data() {
    return {
      cart: 0
    }
  },
  created () {
    if (process.client) {
      window.addEventListener('scroll', this.fixedTop);
    }
  },
/*  destroyed () {
    if (process.client) {
      window.removeEventListener('scroll', this.fixedTop);
    }
  },*/

  mounted() {
    try {
      this.$store.dispatch('getCountInCart')
      .then(res => {
        this.cart = this.$store.getters["cartCount"]
      })
    } catch (e) {
      throw e
    }
  },

  computed: {
    /*userRole() {
      let user = this.$auth.user ? this.$auth.user : null;
      let role = user && user.data.is_admin == '1' ? 'Admin' : 'Guest';
      return role
    }*/
  },
  methods: {
    /*async logout() {
      await this.$auth.logout();
      await this.$router.push('/');
    },*/

    fixedTop(){

      let el = document.querySelector('.navbar')
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if(scrollTop > 200){
        el.style.transition = 'ease-in-out 1.5s'
        el.classList.add('fix')
      }else{
        el.style.transition = 'ease-in-out 2s'
        el.classList.remove('fix')
      }

    },

  }
}
</script>



<style lang="scss">
  .navbar{
    opacity: 1;
    box-shadow: 0 2px 18px 0 #e1dede!important;
    border-bottom: 1px solid #ddd!important;
  }
  .fix{
    position: fixed;
    width: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, .5)!important;
    box-shadow: 0 2px 18px 0 #242323!important;
    border-bottom: 1px solid rgba(43, 41, 41, 0.1) !important;
    opacity: 1;
    top:0;
  }
  .navbar.fix a, .navbar.fix .navbar-nav li a{
    color: #fff!important;
  }


</style>
