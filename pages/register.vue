<template>
  <div class="container mt-5 col-md-6">
    <h2>Sign up</h2><br/>
    <div v-if="message.length > 0" class="alert alert-success" role="alert">
     {{ message }}
    </div>
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
      <button type="submit" class="btn btn-outline-primary show">
        <span v-if="flag" id="message_spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Register
      </button><br>
<!--      <button type="submit" class="btn btn-outline-primary">Register</button>-->
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
      },
      message: '',
      flag: false
    }
  },

  methods: {
    async submit() {
      let spinner = document.getElementById('message_spinner');
      try {
        this.flag = true
        await this.$axios.$post('api/register', this.form)
          .then(res => {
              this.message = 'Please, check your email box. Link to confirm sent to your email address.'
            this.flag = false
          })
      } catch (error) {
        error.errors;
          this.flag = false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.btn.btn-outline-primary:active,
.btn.btn-outline-primary:hover, .btn.btn-outline-primary:focus, {
  color: #fff;
  background-color: #007bff;
  border: unset!important;
  outline: unset!important;
  box-shadow: unset!important;
}
</style>
