<template>
  <div class="mt-5 container" id="main">
    <div class="row">

      <div class="col-3 text-center">
        <h5>Sidebar</h5><hr/><br/>
        <AdminLeftSideBar/>
      </div>

      <div class="col-9 text-center">
        <h5>New Category</h5><hr/><br/>
        <b-table striped hover :items="items" class=""></b-table>

      </div>

    </div>
  </div>

</template>

<script>
import AdminLeftSideBar from "@/components/AdminLeftSideBar";
export default {
  head: {
    title: 'Categories',
  },
  middleware: ["isAdmin"],
  components:{
    AdminLeftSideBar
  },
  data(){
    return{
      items: [
        {
          id: null,
          title: '',
          created_at: null,
          actions: null

        }
      ]
    }
  },

  methods: {

  },
}
</script>

<style scoped>

</style>
