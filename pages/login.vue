<template>
  <div class="container mt-5 col-md-6">
    <h2>Login</h2><br/>
    <div v-if="message" class="alert alert-danger show" id="message_alert" role="alert">
      {{ message }}
    </div><br>
    <button v-if="flag" class="btn btn-primary show" type="button" id="message_spinner" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button><br>
    <div v-if="message_success" class="alert alert-success show" id="message_success" role="alert">
      {{ message_success }}
    </div><br>

    <a v-if="user_id != 0" href="#" class="btn btn-outline-primary mb-5" id="verify_btn" @click.prevent="sendVerify">{{ 'Подтвердить' }}</a>
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
      },
      message: '',
      message_success: '',
      user_id: 0,
      flag: false
    }
  },
  methods: {
    async submit() {
      try {
        let res = await this.$auth.loginWith("laravelJWT", {data: this.form})

        if(res.data.meta.token == false) {
          this.message = 'Please, verify your Email address or Signup!'
          this.user_id = res.data.user.id
            //console.log(res.data.user.id)
          //await this.$axios.$post(`/api/confirm/${res.data.user.id}/email-confirm`)
        /*.then(data => {
          this.message = 'You are successfully confirm your Email address.'
          })*/
        }


        /* if(result.data.user) {
           this.message = 'Please, verify your Email address!'
        }*/

        /*this.$router.push({
          path: this.$route.query.redirect || '/profile'
        })*/


      } catch (error) {
        error.errors
      }
    },
    async sendVerify(){
      this.flag = true

      let alert = document.getElementById('message_alert');
      alert.style.display ='none';

      let btn = document.getElementById('verify_btn');
      btn.style.display ='none';

      let res = await this.$axios.$post(`/api/confirm/${this.user_id}/email-confirm`)
      if(res){
        this.message_success = 'Check your email box. Link to confirm sent.'
        this.flag = false
      }


      let success = document.getElementById('message_success');
      let spinner = document.getElementById('message_spinner');

      if(success){
        success.style.display= 'block'
        success.classList.add('show')
      }
    }
  }
}
</script>

<style scoped>

</style>
