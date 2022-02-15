<template>
  <div class="container mt-5 col-md-6">
    <h2>Login</h2><br/>
    <form>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" v-model.trim="form.email" class="form-control" aria-describedby="emailHelp"
               placeholder="Enter Your Email"/>
        <small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model.trim="form.password" class="form-control" placeholder="Enter password">
        <small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
      </div>
      <button type="submit" @click.prevent="submit" class="btn btn-outline-primary">Login</button>
    </form>
    <br/>
    <p>Do not have account?
      <nuxt-link to="register">Register</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "login",
  middleware: ["guest"],
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith("laravelJWT", {data: this.form})
        await this.$router.push('/profile')


        //console.log(this.$route);

      } catch (error) {
        error.errors
      }
    },

  }
}
</script>

<style scoped>

</style>
