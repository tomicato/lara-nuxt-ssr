<template>
  <div class="d-flex flex-column justify-content-between">
    <div class="my-5 container" id="main">
      <div class="row my-5">
        <div class="col-md-3 mb-5">
          <h3 class="mb-5">Sidebar</h3>
          <div class="d-flex flex-column  justify-content-between" id="left_menu">
            <nuxt-link to="/profile">Profile</nuxt-link>
            <nuxt-link to="/profile/orders-detail">Orders</nuxt-link>
            <nuxt-link to="/profile/feedback">Feedback</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="/profile/settings">Settings</nuxt-link>
          </div>
        </div>
        <div class="col-md-9 mb-5" id="grid_tag">
          <h3 class="mb-5 text-center">{{ 'Settings' }}</h3>
          <div class="card mb-3 w-100">
            <div class="row">
              <div class="col-md-4 text-center">
                <img :src="avatar_img" class="rounded-circle" width="200" height="200" alt="avatar">
              </div>
              <div class="col-md-8 my-4">
                <div class="card-body">
                  <h5 class="card-title">{{ $auth.user.name }}</h5>
                  <h5 class="card-title">{{ $auth.user.email }}</h5>
                  <h5 class="card-title"></h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>
                  <p class="card-text pt-5">
                    <button class="btn btn-outline-secondary" @click="showForm">Change user data</button>
                  </p>
                </div>
              </div>
            </div>
            <div id="user_form_data">
              <form enctype="multipart/form-data" v-if="flag == true" class="w-75 mx-auto" ref="userData">
                <div class="form-group">
                  <label for="avatar"> {{ 'Upload new avatar' }}</label>
                  <input type="file" class="form-control" id="avatar" @change="getAvatar">
                </div>
                <div class="form-group">
                  <label for="name"> {{ 'Your name' }}</label>
                  <input type="text" class="form-control" value="" id="name" v-model="name">
                </div>
                <div class="form-group">
                  <label for="email"> {{ 'Your E-mail' }}</label>
                  <input type="email" class="form-control" id="email" v-model="email">
                </div>
                <div class="form-group">
                  <label for="new_email"> {{ 'New E-mail' }}</label>
                  <input type="email" class="form-control" id="new_email" v-model="new_email">
                </div>
                <div class="form-group">
                  <label for="old_password"> {{ 'Old Password' }}</label>
                  <input type="password" class="form-control" id="old_password" v-model="old_password">
                </div>
                <div class="form-group">
                  <label for="password"> {{ 'Password' }}</label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <div class="form-group">
                  <label for="password_confirmation"> {{ 'Confirm password' }}</label>
                  <input type="password" class="form-control" id="password_confirmation" v-model="password_confirmation">
                </div>
                <div v-for="(error, g) in errors_data" :key="g" class="my-5">
                  <span class="text-danger font-italic">{{ error[0] }}</span>
                </div>
                <button class="btn btn-outline-primary my-5" id="sendForm" type="button" @click="changeProfileData">
                  Change profile data
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
export default {
  //name: "settings",
  middleware: ['auth'],
  data() {
    return {
      avatar_img: '',
      flag: false,
      avatar: '',
      name: this.$auth.user.name ? this.$auth.user.name : '',
      email: this.$auth.user.email ? this.$auth.user.email : '',
      new_email: '',
      old_password: '',
      password: '',
      password_confirmation: '',
      errors_data: []
    }
  },
  mounted() {
    this.avatar_img = this.$auth.user.avatar !== null ?
        `${this.$axios.defaults.baseURL}/uploads/profile/${this.$auth.user.avatar}` :
        `${this.$axios.defaults.baseURL}/uploads/profile/avatar.jpg`
  },
  methods: {
    getAvatar(e) {
      let img = e.target.files[0];
      this.avatar = img
    },
    showForm() {
      this.flag = true

      /*Animate*/
      let grid_tag = document.getElementById('user_form_data')
      grid_tag.classList.add('grid_tag_animate')
      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1000)
    },
    async changeProfileData() {
      console.log(this.avatar);
      let formData = new FormData();
      formData.append('avatar', this.avatar)
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('new_email', this.new_email)
      formData.append('old_password', this.old_password)
      formData.append('password', this.password)
      formData.append('password_confirmation', this.password_confirmation)

      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

       await this.$axios.$post(`${this.$axios.defaults.baseURL}/api/change-user-data`, formData, config)
            .then((res)  => {
             // console.log(res);
              this.$auth.logout();
              //this.$router.push('/login');
            })
            .catch((e) => {
              this.errors_data = e.response.data.errors
            })

    }

  }
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

.grid_tag_animate {
  animation-duration: 2s;
  animation-name: FadeInOut;
}

@keyframes FadeInOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
