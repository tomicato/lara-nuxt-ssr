<template>
  <div>
    <header-top></header-top>

    <div class="container" id="main">
      <div class="row">
        <!-- Left Sidebar -->
        <div class="col-sm-12 col-lg-3 columns mb-4">
          <!-- Categories -->
          <h3 class="pb-3 mb-5">Categories</h3>
          <categories :categories="categories" :flag="flag"  style="border-top: 1px solid rgba(0,0,0,0.1)"></categories>
          <!-- /Categories -->

          <!-- Filters -->
          <h3>Filters</h3>
          <hr>
          <filters :subId="subId" :catId="catId" :filters="filters" :common="common"></filters>
          <!-- /Filters -->
        </div>

        <!-- Main Content -->

        <div class="col-sm-12 col-lg-9 columns products" id="grid_tag" style="">
          <!--Top breacrumbs & additional tool -->
          <div class="d-flex justify-content-between align-items-start" style="height: 90px;" id="bread_add_block">

            <div class="d-flex justify-content-start align-items-center">
              <i class="material-icons list-icon" @click.prevent="list">view_headline</i>
              <i class="material-icons grid-icon ml-2" @click.prevent="grid">apps</i>
            </div>

            <div class="mx-2 table-responsive" id="scroll_custom" style="margin-top: -15px;padding-bottom: 15px;">
              <table class="w-100 table" id="top-tools">
                <tbody>
                <tr class="d-flex justify-content-between align-items-center">

                  <td id="filters_top" class="d-flex">
                    <span v-for="(item, i) in data" :key="i" class="badge badge-pill badge-info">
                       {{ item }}
                    </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-end align-items-center flex-shrink-0 flex-grow-0">
              <div
                class="d-flex flex-sm-column flex-column flex-row flex-md-row justify-content-end flex-lg-row align-items-center"
                style="font-size: 1rem; margin-bottom: -0.7%;">
                <!-- Breadcrumbs -->
                <div id="breadcrumbs">
                  <nuxt-link to="/shop">{{ 'Catalog' }}</nuxt-link>
                  /
                  <nuxt-link :to="`/shop/categories/${$route.params.category}`">{{ cat_title }}</nuxt-link>
                  <nuxt-link v-if="$route.params.sub"
                             :to="`/shop/categories/${$route.params.category}/${$route.params.sub}`">
                    {{ ' / ' + title.split('_').join(' ') }}
                  </nuxt-link>
                </div>
                <!-- /Breadcrumbs -->
              </div>
            </div>

          </div>
          <!-- /Top breacrumbs & additional tool -->

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
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-4" style="max-width: 100%"
                   v-for="(item, i) in data_total" :key="i">
                <grid-view :product="item"></grid-view>
              </div>
            </div>

            <div class="row text-center" v-if="flag == true">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-4" style="max-width: 100%"
                   v-for="(item, i) in items"
                   :key="i">
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
    FooterBottom,
  },

  name: "sub_category",

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords
        },

      ]
    }
  },

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
      data: [],

      /*========= Meta ========*/
      keywords: '',
      description: '',
      cat_title: '',
      sub_title: '',

    }
  },
  async asyncData(ctx) {
    let {data} = await ctx.$axios.get(`/api/shop/products/${ctx.route.params.category}${ctx.route.params.sub ? `/` + ctx.route.params.sub : ''}${ctx.query.page ? `?page=` + ctx.query.page : ''}`)
    let cat = await ctx.store.getters["categories/categories"]
    let filters = await ctx.store.getters["filters/filters"]

    /* Meta content */
    let cat_one = cat.find(item => item.id == ctx.route.params.category) // for meta

    let sub_one;
    if (cat_one.childs.length > 0) {
      sub_one = cat_one['childs'].find(item => item.id == ctx.route.params.sub) // for meta
    } else {
      sub_one = null
    }
    let keywords;
    let description;

    if (sub_one != null) {
      keywords = sub_one.keywords  // keywords
      description = sub_one.description // description
    } else {
      keywords = cat_one.key_cat  // keywords
      description = cat_one.desc_cat // description
    }
    /* End Meta content */

    let arr = data.data
    let tmp = []
    for (const el of arr) {
      tmp = el.sub_count;
    }

    let componentFilters = [];
    if (!ctx.route.params.sub) {
      componentFilters = filters.filter(item => item.category_id == ctx.route.params.category);
    } else {
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
        counts: tmp,
        keywords: keywords ? keywords : '',
        description: description ? description : '',
        cat_title: cat_one.title,
        sub_title: sub_one ? sub_one.title : '',
      }
    } else {
      ctx.redirect('/shop')
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

      /*Animate*/
      let grid_tag = document.getElementById('grid_tag')
      //console.log(grid_tag);
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1500)

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
        if (arr[i][0] != 'category_id' || arr[i][0] != 'sub_category_id') {
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

      // console.log(this.data);
    })


  },


  computed: {
    rows() {
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
      let res = await this.$axios.$get(`/api/shop/products/${this.$route.params.category}${this.$route.params.sub ? `/` + this.$route.params.sub : ''}${page ? `?page=` + page : ''}`)

      this.data_total = res.data
      this.total = res.meta.total
      this.per_page = res.meta.per_page
      this.current = res.meta.current_page

      /*Animate*/
      let grid_tag = document.getElementById('grid_tag')
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1500)

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
      if (this.flag == true) {
        this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
      }

      /*Animate*/
      let grid_tag = document.getElementById('grid_tag')
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1500)
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

#breadcrumbs {
  a {
    color: rgba(0, 0, 0, 0.6);
    font-style: italic;

    &:hover, &:active {
      text-decoration: unset !important;
    }
  }

}

.table th, .table td {
  border: unset !important;
}

#top-tools {
  /*height: 30px;
  margin-bottom: 50px !important;*/
}

#filters_top {
  margin: 0 5px;

  .badge-info {
    margin: 5px 10px !important;
    padding: 5px 10px !important;
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

.fade-enter, .fade-leave-to /* .fade-leave-active ???? ???????????? 2.1.8 */
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

/*.show {
  display: block;
}*/

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

.dots {
  border-bottom: 1px dotted #999797;
  height: 12px;
  width: 50%;
}

.badge_tag {
  cursor: pointer;
  background: rgba(255, 255, 255, 0);
  border: 1px solid #99caff;
  border-radius: 5px;
  color: #007bff;
  transition: all 1s ease-in-out;

  &:hover {
    background: #99caff;
    color: #fff;
    transition: all 500ms ease-in-out;
  }

}

.badge_tag_active {
  /*background: linear-gradient(to top, #007bff, #99caff);*/
  background: #4399f1;
  border: 1px solid #99caff;
  border-radius: 5px;
  color: #fff;
  opacity: 1;
  transition: all 1s ease-in-out;
}

#badge_tag_const {
  cursor: pointer;
  background: transparent;
  border: 1px solid #28a745;
  border-radius: 5px;
  color: #28a745;

  &:hover {
    background: #28a745;
    color: #fff;
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

.test {
  color: crimson;
  font-weight: normal;
  font-size: 2rem;
}

@media screen and (max-width: 420px) {
  .test {
    font-size: 1.5rem;
  }
}

#scroll_custom::-webkit-scrollbar {
  width: 1px;
}

#scroll_custom::-webkit-scrollbar-track {
  background-color: #8a93fe21;
}

#scroll_custom::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(63, 65, 66, 0.3);
  border-radius: 50px;
}

#bread_add_block {
  @include _768{
    display: flex;
    flex-direction: column;
    height: 190px!important;
    padding: 10px 0;
  }
}

</style>
