<template>
  <div>
    <template>
      <b-container>
        <b-button v-b-toggle.sidebar-no-header variant="outline-primary">Open SideBar</b-button>
      </b-container>
    </template>

    <b-sidebar id="sidebar-no-header" bg-variant="dark" text-variant="light" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
          <nav class="my-5">

              <b-nav vertical  v-if="userRole == 'Admin'" class="">
                <b-nav-item active to="/shop/products">Products</b-nav-item>
                <b-nav-item to="/shop/categories">Categories</b-nav-item>
                <b-nav-item to="/topics/create">Topic</b-nav-item>
                <b-nav-item to="#">Users</b-nav-item>
                <b-nav-item to="#">Total Orders</b-nav-item>
                <b-nav-item to="#">Stock</b-nav-item>
              </b-nav>

              <b-nav vertical v-else text-variant="light">
                <b-nav-item active to="/profile">Profile</b-nav-item>
                <b-nav-item to="#">Orders</b-nav-item>
                <b-nav-item to="/topics/create">Topic create</b-nav-item>
              </b-nav>

          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>

</template>

<script>
export default {
  name: "AdminLeftSideBar",
  computed: {
    userRole() {
      let user = this.$auth.user ? this.$auth.user : null;
      let role = user && user.is_admin == '1' ? 'Admin' : 'Guest';
      return role
    }
  },
}
</script>

<style scoped>
  .nav-link{
    color: white;
    text-transform: uppercase;
  }
</style>
