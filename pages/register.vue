<template>
  <div class="container mt-5 col-md-6">
    <h2>Sign up</h2><br/>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" v-model.trim="form.name" class="form-control" placeholder="Write Your Full Name"/>
        <small class="form-text text-danger" v-if="errors.name"><em>{{ errors.name[0] }}</em></small>
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" v-model.trim="form.email" class="form-control" aria-describedby="emailHelp"
               placeholder="Enter Your Email"/>
        <small class="form-text text-danger" v-if="errors.email"><em>{{ errors.email[0] }}</em></small>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model.trim="form.password" class="form-control" placeholder="Enter password">
        <small class="form-text text-danger" v-if="errors.password"><em>{{ errors.password[0] }}</em></small>
      </div>
      <button type="submit" class="btn btn-outline-primary">Register</button>
    </form>
    <br/>
    <p>Already have an account?
      <nuxt-link to="login">Login</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "register",
  middleware: ['guest'],
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      }
    }
  },

  methods: {
    async submit() {
      try {
        await this.$axios.$post('api/register', this.form)
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.form.email,
            password: this.form.password,
          }
        })
        await this.$router.push({
          path: this.$route.query.redirect || '/profile'
        })
      } catch (error) {
        error.response.data.errors;
      }
    }
  }

}
</script>

<style scoped>

</style>
