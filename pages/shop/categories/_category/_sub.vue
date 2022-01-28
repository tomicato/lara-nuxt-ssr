<template>
  <div>
    <header-top></header-top>

    <div class="container" id="main">
      <div class="row">
        <!-- Left Sidebar -->
        <div class="col-sm-12 col-lg-3 columns">
          <h3 class="mb-4">Categories</h3>
          <hr/>
          <br>

          <categories :categories="categories" :flag="flag" :counts="counts"></categories>

          <div>
            <h3>Filters</h3>
            <hr>
            <filters :subId="subId" :catId="catId" :filters="filters" :common="common"></filters>
          </div>

        </div>

        <!-- Main Content -->
        <div class="col-sm-12 col-lg-9 columns products">
          <search-block :name="name_main_content"></search-block>
          <hr/>
          <br/>

          <!--Products List-->
          <div class="w-100 d-flex justify-content-between align-items-center" id="top-tools">
            <div class="d-flex justify-content-between align-items-center">
              <i class="material-icons list-icon mx-2" @click.prevent="list">view_headline</i>
              <i class="material-icons grid-icon" @click.prevent="grid">apps</i>
            </div>

            <div id="filters_top">
             <span v-for="(item, i) in data" :key="i" class="badge badge-pill badge-info">
               {{ item }}
             </span>
            </div>

            <div>
              <select>
                <option value="" selected>Order by</option>
                <option value="">Price ASC</option>
                <option value="">Price DESC</option>
              </select>
            </div>
          </div>

          <!--List View-->
          <div id="list" v-if="data_total !== ''">
            <div v-if="flag == false">
              <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in data_total" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>

            <div v-if="flag == true">
              <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>
          </div>

          <!--Grid View-->
          <div id="grid" class="w-100 mx-auto">
            <div class="row text-center" v-if="flag == false">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%" v-for="(item, i) in data_total" :key="i">
                <grid-view :product="item"></grid-view>
              </div>
            </div>

            <div class="row text-center" v-if="flag == true">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <grid-view :product="item"></grid-view>
              </div>
            </div>

          </div>

          <!-- Pagination without filters -->
          <b-pagination
            v-if="flag == false"
            class="t-4 flx-c mb-5"
            v-model="current"
            :total-rows="total"
            :per-page="per_page"
            aria-controls="my-table"
            pills
            @change="changeRoute"
            variant="outline-primary"
          ></b-pagination>

          <!-- Pagination with filters -->
          <b-pagination
              v-if="flag == true"
              class="t-4 flx-c"
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table2"
              pills
              @change="changeHandler2"
            ></b-pagination>


        </div>

      </div>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import listView from "@/components/listView";
import gridView from "@/components/gridView";
import HeaderTop from "@/components/HeaderTop";
import Filters from "@/components/Filters";
import Categories from "@/components/Categories";
import SearchBlock from "@/components/SearchBlock";
import FooterBottom from "@/components/FooterBottom";
import _ from "lodash";

export default {
  loading: true,
  components: {
    listView,
    gridView,
    HeaderTop,
    Filters,
    Categories,
    SearchBlock,
    FooterBottom
  },
  name: "sub_category",

  /*  async validate({params, route}) {
      if (params.id) {
        return /^\d+$/.test(params.id)
      } else {
        return false
      }
    },*/

  data() {
    return {
      name_main_content: 'Catalog of Products',
      title: '',
      products: [],
      visible: false,
      open_modal: false,
      categories: [],
      total_count: 0,
      counts: [],

      /*== pagination ==*/
      page: 1,
      total: 2,
      current: 1,
      per_page: 0,
      data_total: [],
      str: '',

      /*=========== Filters ============*/
      catId: null,
      subId: null,
      filters: [],
      common: [],
      flag: false,

      /*======= Pagination Filtered =======*/
      perPage: 3,
      currentPage: +this.$route.query.page || 1,
      pageCount: 1,
      itemsAll: [],
      items: [],

      /*===== Top Filters =====*/
      data: []

    }
  },

  computed: {
    rows() {
      //console.log(this.data_total.length);
      return this.data_total != undefined ? this.data_total.length : ''
    },
  },

  head() {
    return {
      title: this.title,
    }
  },

  mounted() {

      if (this.data_total[0].sub_title) {
        let tl = this.data_total[0].sub_title.title
        this.title = tl
      } else {
        let ml = this.data_total[0].cat_title.title
        this.title = ml
      }

    this.$root.$on('getFilteredData', (arr) => {
      //this.filter_length = arr.data.length
      this.data_total = arr.data
      this.flag = true

      this.itemsAll = _.chunk(this.data_total, this.perPage)
      this.pageCount = _.size(this.itemsAll)
      this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]
    })

    this.$root.$on('reload', () => {
      let arr = this.$store.getters["products/filtered"]
      this.data_total = arr.data
      //this.filter_length = 0
      this.getProducts()
      this.flag = false
      this.data.length = 0
    })

    this.$root.$on('setData', (data) => {
    //console.log(data);
      let arr = []
      for (let k of data) {
        arr.push(k.split(':'))
      }
      let tmp = []
      for (let i = 0; i < arr.length; i++) {
        if(arr[i][0] != 'category_id' || arr[i][0] != 'sub_category_id'){
          tmp.push(arr[i][1])
        }
      }

      let tls = tmp
      let el = []

      let filteredArray = tls.filter(function (item, pos) {
        if (tls.indexOf(item) == pos) {
          return item
        } else {
          el.push(item)
        }
      });
      this.data = filteredArray
    })

  },

  async asyncData(ctx) {
    let {data} = await ctx.$axios.get(`/api/shop/products/${ctx.route.params.category}${ctx.route.params.sub ? `/` + ctx.route.params.sub : ''}${ctx.query.page ? `?page=` + ctx.query.page : ''}`)
    let cat = await ctx.store.getters["categories/categories"]
    let filters = await ctx.store.getters["filters/filters"]

    let arr = data.data
    let tmp = []
    for (const el of arr) {
      tmp = el.sub_count;
    }

    let componentFilters = [];
    if(!ctx.route.params.sub){
      componentFilters = filters.filter(item => item.category_id == ctx.route.params.category);
    }else{
      componentFilters = filters.filter(item => item.sub_id == ctx.route.params.sub);
      let cat_common_filters = componentFilters.filter(item => item.common == '1');
    }
    //let commonArr = filters.filter(item => item.common == 1 && item.category_id == ctx.route.params.category)

    let tl = '';
    if (data.data && data.data != '') {
      if (data.data[0].sub_title) {
        tl = data.data[0].sub_title.title
      } else {
        tl = data.data[0].cat_title.title
      }
    } else {
      //ctx.redirect(history.go(0));
      tl = 'Empty Page'
      ctx.redirect('/empty');
      //return false;
    }
    //console.log(ctx.route.params.sub);
    if (data) {
      return {
        title: tl,
        filters: componentFilters,
        //common: commonArr,
        catId: ctx.route.params.category,
        subId: ctx.route.params.sub,
        data_total: data.data,
        total: data.meta.total,
        per_page: data.meta.per_page,
        current: ctx.query.page,
        categories: cat,
        counts: tmp
      }
    } else {
      ctx.redirect('/shop')
    }
  },

  watch: {
    '$route'() {
      this.getProducts(this.$route.query.page);
    },
  },

  methods: {

    async getProducts(page) {
      let res = await this.$axios.$get(`/api/shop/products/${this.$route.params.category}${this.$route.params.sub ? `/` + this.$route.params.sub : ''}${page ? `?page=` + page : ''}`)

      this.data_total = res.data
      this.total = res.meta.total
      this.per_page = res.meta.per_page
      this.current = res.meta.current_page

    },

    changeRoute(page) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: page ? page : '',
        }
      })
    },

    async changeHandler2(page) {

      let pgn = await this.$store.getters["products/sub_products"]

      if (this.flag == false) {
        await this.$axios.$get(`${pgn.meta.path}?page=${page}`)
          .then(res => {
            this.items = res.data

            /*let price = this.data_total.map(item => item.price)
            this.max = Math.max.apply(Math, price)*/
            //console.log(this.max);
          })
      } else {
        this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
      }

    },

    list() {
      let lEl = document.getElementById('list')
      let gEl = document.getElementById('grid')
      let lIcon = document.querySelector('.list-icon')
      let gIcon = document.querySelector('.grid-icon')

      lEl.style.display = 'block';
      gEl.style.display = 'none';

      lIcon.classList.add('active')
      gIcon.classList.remove('active')

    },

    grid() {
      let lEl = document.getElementById('list')
      let gEl = document.getElementById('grid')
      let lIcon = document.querySelector('.list-icon')
      let gIcon = document.querySelector('.grid-icon')

      lEl.style.display = 'none';
      gEl.style.display = 'block';

      lIcon.classList.remove('active')
      gIcon.classList.add('active')
    },

    back() {
      this.$router.push(`/shop/categories/${this.$route.params.category}`)
    },
  },
}
</script>

<style lang="scss" scoped>
#top-tools{
  height: 30px;
  margin-bottom: 50px!important;
}

#filters_top{
  margin: 0 15px;
  .badge-info{
    margin: 10px 10px!important;
    padding: 5px 10px!important;
  }
}
.back_link {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;

  a {
    text-decoration: none;
  }

  i {
    margin-right: .5rem;
    color: #007bff;
  }
}

h3 {
  font-weight: 400;
  text-transform: capitalize;
  color: crimson;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}

.columns {
  h3 {
    text-align: left !important;
  }

  &.products {
    h3 {
      text-align: center !important;
    }
  }
}

#navigation {
  margin: -.5rem 0 2rem 0;

  .navigation {
    margin: 1rem 0;

    a {
      padding: 1rem 0;
      text-transform: uppercase;
      text-decoration: none;
    }
  }

  .childItem {
    padding: 1rem 0 0 0.8rem;

    div {
      padding: .5rem 0;
    }
  }
}


#grid {
  display: none;
}

.show {
  display: block;
}

.hide {
  display: none;
  opacity: 0;
}

select {
  word-wrap: normal;
  padding: 2px 4px;
  border: 1px solid #b3b3c0;
  border-radius: 4px;
  outline: none;
}

.list-icon, .grid-icon {
  border: 1px solid #b3b3c0;
  /*padding: 2px 2px;*/
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  color: #b3b3c0;

  &.active, &:active {
    color: deepskyblue !important;
    /* border: 1px solid #fff;
    background: #b3b3c0;*/
  }
}

.t-4 {
  margin-top: 4rem;
}

.flx-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flx-btw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.dots{
  border-bottom: 1px dotted #999797;
  height: 12px;
  width: 50%;
}

</style>
