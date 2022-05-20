<template>
  <div class="d-flex flex-column justify-content-between vh-100">
    <div class="mt-5 container" id="main">
      <div class="row my-5">
        <div class="col-md-3 mb-5">
          <h3>Sidebar</h3><hr/><br/>
          <div class="d-flex flex-column justify-content-between" id="left_menu">
            <nuxt-link to="/profile">Profile</nuxt-link>
            <nuxt-link to="/profile/orders-detail">Orders</nuxt-link>
            <nuxt-link to="/profile/feedback">Feedback</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="/profile/settings">Settings</nuxt-link>
          </div>

        </div>
        <div class="col-md-9 mb-5">
          <h3 class="mb-5 text-center">{{ $auth.user.name }} Personal Area</h3><hr/><br/>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque consectetur deleniti dignissimos
            dolore eligendi error ipsa iure magnam natus officiis perferendis provident quia recusandae, repudiandae sed
            similique tempore, voluptate.
          </div>
        </div>
      </div>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>



<!--  <div class="container mt-5 col-md-6">

      <h2>_user`s Dashboard</h2><hr/><br/>
      <h3>Create a new Topic</h3><br/>

      <form>
        <div class="form-group">
          <label>Topic title</label>
          <input type="text" v-model="form.title" class="form-control" placeholder="Input topic title"/>
          <small class="form-text text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
        </div>
        <div class="form-group">
          <label>Topic content</label>
          <textarea rows="5" v-model="form.body" class="form-control"></textarea>
          <small class="form-text text-danger" v-if="errors.body">{{ errors.body[0] }}</small>
        </div>
        <button type="submit" @click.prevent="create" class="btn btn-outline-primary">Create Topic</button>
      </form>
      <br/>

    </div>-->
<!--<template>
  <div class="mt-5 container" id="main">
    <div class="row">
      <div class="col-3 text-center">
        <h5>Sidebar</h5><hr/><br/>
        <AdminLeftSideBar/>
      </div>
      <div class="col-9 text-center">
        <h5>_user`s Dashboard</h5><hr/><br/>
      </div>
    </div>
  </div>
</template>-->


<script>
import FooterBottom from "../../components/FooterBottom";
export default {
  middleware: ['auth'],
  components:{
    FooterBottom
  },

  data() {
    return {
      form: {
        title: '',
        body: ''
      }
    }
  },

  methods: {
    async create() {
      try {
        await this.$axios.$post('/api/topics', this.form)
        await this.$router.push('/');
      } catch (error) {
        error.response.data.errors;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#main {
  max-width: 1280px;
}
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
