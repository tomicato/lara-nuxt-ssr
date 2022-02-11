<template>
  <div>
    <header-top></header-top>

    <div class="container" id="main">
      <div class="row">

        <div class="col-sm-12 col-lg-3">
          <h3 class="mb-4">Categories</h3>
          <hr/>
          <br/>
          <div class="columns">
            <categories :categories="categories" :flag="flag" ></categories>
          </div>


        </div>

        <div class="col-sm-12 col-lg-9 columns main_shop">
<!--          <search-block :name="name_main_content"></search-block>-->
<!--          <hr/>
          <br/>-->
          <div class="w-100 mb-4 d-flex justify-content-between align-items-center">
            <div class="">

              <i class="material-icons list-icon " @click.prevent="list">view_headline</i>
              <i class="material-icons grid-icon ml-1" @click.prevent="grid">apps</i>

            </div>
            <div>
              <select>
                <option value="" selected>Order by</option>
                <option value="">Price ASC</option>
                <option value="">Price DESC</option>

              </select>
            </div>
          </div>

          <div id="list">
            <div v-if="flag == false">
              <div class="card mb-3" style="max-width: 100%" v-if="data_total" v-for="(item, i) in data_total" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>
            <div v-if="flag == true">
              <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>
          </div>

          <div id="grid" class="w-100 mx-auto">
            <div class="row text-center" v-if="flag == false">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%"
                   v-for="(item, i) in data_total"
                   :key="i">
                <grid-view :product="item"></grid-view>
              </div>
            </div>
            <div class="row text-center" v-if="flag == true">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <grid-view :product="item"></grid-view>
              </div>
            </div>
          </div>



          <b-pagination
            class="t-4 flx-c mb-5"
            v-if="flag == false"
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
        <br>
      </div>

    </div>

    <footer-bottom></footer-bottom>
  </div>

</template>

<script>
import listView from "@/components/listView";
import gridView from "@/components/gridView";
import HeaderTop from "@/components/HeaderTop";
import FooterBottom from "@/components/FooterBottom";
import SearchBlock from "@/components/SearchBlock";

import _ from "lodash";

export default {
  loading: true,
  components: {
    listView,
    gridView,
    HeaderTop,
    FooterBottom,
    SearchBlock
  },

  data() {
    return {
      name_main_content: 'Catalog of Products',
      title: 'Shop | Catalog',
      visible: false,
      open_modal: false,
      categories: [],
      counts: [],
      flag: false,

      /*== pagination ==*/
      total: 2,
      current: 1,
      per_page: 0,
      data_total: [],
      min: 0,
      max: 0,

      /*======= Pagination Filtered =======*/
      perPage: 3,
      currentPage: +this.$route.query.page || 1,
      pageCount: 1,
      itemsAll: [],
      items: [],
    }
  },

  head() {
    return {
      title: this.title,
    }
  },

  mounted() {
    this.$root.$on('getFilteredData', (arr) => {
      //this.filter_length = arr.data.length
      this.data_total = arr.data
      this.flag = true

      this.itemsAll = _.chunk(this.data_total, this.perPage)
      this.pageCount = _.size(this.itemsAll)
      this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]
    })
  },

  async asyncData(ctx) {
    let {data} = await ctx.$axios.get(`/api/shop/products?page=${ctx.query.page}`)

    let arr = data.data
    let tmp = []
    for (const el of arr) {
      tmp = el.sub_count;
    }

    let cat = await ctx.store.getters["categories/categories"]
    return {
      data_total: data.data,
      total: data.meta.total,
      per_page: data.meta.per_page,
      current: ctx.query.page,
      categories: cat,
      counts: tmp
    }
  },

  computed: {
    rows() {
      //console.log(this.data_total.length);
      return this.data_total != undefined ? this.data_total.length : ''
    },
  },

  watch: {
    '$route'() {
      this.getProducts(this.$route.query.page);
    },
  },

  methods: {
    async getProducts(page) {
      try {
        await this.$axios.$get(`/api/shop/products?page=${page}`)
          .then(res => {
            this.data_total = res.data
            this.total = res.meta.total
            this.per_page = res.meta.per_page
          })
      } catch (e) {
        throw e
      }
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
      this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
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
  },

};

</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  .card-text {
    font-size: 14px;
  }
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
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

  &.main_shop {
    h3 {
      text-align: center !important;
    }
  }
}
</style>


