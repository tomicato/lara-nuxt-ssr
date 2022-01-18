<template>
  <div class="mt-5 container" id="main">
    <div class="row">

      <div class="col-3 text-center">
        <h5>Sidebar</h5><hr/><br/>
        <AdminLeftSideBar/><hr/><br/>
        <b-button to="/shop/products/create" variant="outline-success">Create Product</b-button>
      </div>

      <div class="col-9 text-center">
        <h5>New Product</h5><hr/><br/>

        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Photo</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in items" :key="i" id="str">
            <th scope="row">{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td id="img">
              <img v-if="item.photo" :src="`http://lara-nuxt-ssr/uploads/${item.photo}`" class="card" width="100" />
            </td>
            <td>
              <b-link :to="`/shop/products/edit/${item.id}`"><b-icon icon="pencil" aria-hidden="true" style="color: #2C9BFC;margin:0 10px"></b-icon></b-link>
              <b-link to="#"><b-icon icon="trash-fill" aria-hidden="true" style="color: #fc2c6a;margin:0 10px"></b-icon></b-link>
            </td>
          </tr>

          </tbody>
        </table><br/><br/>

<!--        <b-pagination
          class="t-4 flx-c mb-5 pagination"
          v-model="current"
          :total-rows="total"
          :per-page="per_page"
          aria-controls="my-table"
          pills
          @change="changeHandler"
          variant="outline-primary"
        ></b-pagination><br/><br/>-->
        <b-pagination
          class="t-4 flx-c mb-5"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          pills
          @change="changeHandler"
          variant="outline-primary"
        ></b-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import AdminLeftSideBar from "@/components/AdminLeftSideBar";
import _ from "lodash";

export default {
  name: "index",
  middleware: ["isAdmin"],
  components:{
    AdminLeftSideBar
  },
  head: {
    title: 'Products',
  },
  data(){
    return{
      //items: [],

      /*== pagination ==*/
      total: 2,
      first: null,
      last: null,
      prev: null,
      next: null,
      current: 1,
      per_page: 0,
      data_total: [],

      /*======= lodash pagination=====*/

      items: [],
      itemsAll: [],
      perPage: 4,
      currentPage: +this.$route.query.page || 1,
    }
  },

  mounted() {
    this.itemsAll = _.chunk(this.data_total, this.perPage)
    this.pageCount = _.size(this.itemsAll)
    this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]
  },

  computed: {
    rows() {
      if (this.data_total) {
        return this.data_total.length
      }
    },
  },

  async asyncData({store}){
    //let {data} = await store.dispatch('products/getProducts')
    let data = await store.getters["products/products"]
    ///console.log(data.data);
    return {
      data_total: data.data,
     // total: data.meta.total,
      //first: data.links.first,
     // last: data.links.last,
      //prev: data.links.prev,
     // next: data.links.next,
     // current: data.meta.current_page,
     // per_page: data.meta.per_page,
    }
  },

  methods: {
    /*async changeHandler(page) {
      try {
        await this.$axios.$get(`/api/shop/products?page=${page}`)
          .then(res => {
            this.data_total = res.data
          })
      } catch (e) {
        throw e
      }
    },*/
    async changeHandler(page) {
      //console.log(page);
      // await this.$router.push(`${this.$route.path}?page=${page}`) // Отображение в  адресной строке маршрута
      this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
    },
  },
}
</script>

<style lang="scss" scoped>
  #img{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .table th, .table td{
    vertical-align: middle!important;
  }
  .pagination{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
