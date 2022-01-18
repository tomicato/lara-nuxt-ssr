<template>

  <div class="mt-5 container" id="main">
    <div class="row">

      <div class="col-3 text-center">
        <h5>Sidebar</h5><hr/><br/>
        <AdminLeftSideBar/>
      </div>

      <div class="col-9 text-center">
        <h5>Create a new Topic</h5><hr/><br/>
        <form class="text-left">
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
      </div>

    </div>
  </div>

</template>

<script>
import AdminLeftSideBar from "@/components/AdminLeftSideBar";
export default {
  middleware: ['auth'],
  name: "create",
  components: {
    AdminLeftSideBar
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

<style scoped>
#main {
  max-width: 1280px;
}
</style>
