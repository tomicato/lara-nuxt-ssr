<template>
  <div>
    <header-top></header-top>
    <div class="container show" id="main">
      <div v-if="flag == false">
        <div v-for="(item, i) in data" :key="i">
          <h3 class="font-weight-lighter">{{ item.name }}</h3>
          <div class="card-columns my-4">

            <div class="card" v-for="(product, k) in item.products" :key="k">
              <div class="card-body" @click.prevent="goToProduct(product)">
                <img :src="`${$axios.defaults.baseURL}/uploads/${product.photo}`" class="card-img-top w-50"
                     :alt="product.name">
                <h5 class="font-weight-normal my-4 text-center">{{ product.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Left Sidebar -->
        <div class="col-sm-12 col-lg-3 columns mb-4" v-if="flag == true">
          <!-- Categories -->
          <h3 class="mb-4">Categories</h3>
          <hr/>
          <br>
          <categories :categories="categories" :flag="flag"></categories>
          <!-- /Categories -->
        </div>

        <!-- Main Content -->
        <div class="col-sm-12 col-lg-9 columns products" id="grid_tag">

          <div  v-if="flag == true" class="w-100 mb-4 d-flex justify-content-between align-items-center">
            <div class="">
              <i class="material-icons list-icon " @click.prevent="list">view_headline</i>
              <i class="material-icons grid-icon ml-1" @click.prevent="grid">apps</i>
            </div>
            <h1 id="test" class="test"><span></span></h1>
            <div>
              <select>
                <option value="" selected>Order by</option>
                <option value="">Price ASC</option>
                <option value="">Price DESC</option>
              </select>
            </div>
          </div>

          <!-- List View -->
          <div id="list">
            <div v-if="flag == true">
              <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>
          </div>

          <!-- Grid View -->
          <div id="grid" class="w-100 mx-auto">
            <div class="row text-center" v-if="flag == true">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <grid-view :product="item"></grid-view>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Pagination -->
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
    <FooterBottom/>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import FooterBottom from "@/components/FooterBottom";
import Filters from "@/components/Filters";
import Categories from "@/components/Categories";
import _ from "lodash";

export default {
  name: 'index',
  layout: 'main_layout',
  head: {
    title: 'Electronics Shop',
    meta: [],
    data: []
  },
  data() {
    return {
      data_total: [],
      flag: false,
      categories: [],

      /*=========== Filters ============*/
      catId: null,
      subId: null,
      filters: [],
      common: [],

      /*======= Pagination Filtered =======*/
      perPage: 3,
      currentPage: +this.$route.query.page || 1,
      pageCount: 1,
      itemsAll: [],
      items: [],

    }
  },
  components: {
    HeaderTop,
    FooterBottom,
    Filters,
    Categories
  },

  computed: {
    rows() {
      return this.data_total != undefined ? this.data_total.length : ''
    },
  },
  mounted() {
    this.$root.$on('getFilteredData', (arr) => {
      //this.filter_length = arr.data.length
      this.data_total = arr.data
      this.flag = true

      //console.log(this.data_total);

      this.itemsAll = _.chunk(this.data_total, this.perPage)
      this.pageCount = _.size(this.itemsAll)
      this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]
    })

    let elms = document.querySelectorAll('.card');
    //console.log(elms[0]);
    this.$gsap.from('.card-body', {
      duration: 2,
      scale: 0,
      rotateY: 270,
      x: -100,
      y: 100,
      opacity: 0,
      stagger: {
        each: .5,
        //grid: 'auto',
        from: 'start',
        axis: 'x'
      }

    })
  },


  async asyncData(ctx) {
    let {data} = await ctx.$axios.get('/api/shop/additional')
    let cat = await ctx.store.getters["categories/categories"]

    //console.log(data.data[0].products[0].name);
    return {
      data: data.data,
      categories: cat,
    }
  },
  methods: {
    goToProduct(product) {
      this.$router.push(`/shop/products/${product.id}`)
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
  }

  /* beforeCreate() {
      this.$nuxt.$router.replace({ path: '/'});
    }*/


}
</script>

<style lang="scss" scoped>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}

.card-columns {
  @media (max-width: 767.98px) {
    column-count: 1;
  }
  /* @media (max-width: 991.98px) {
     column-count: 3;
   }*/
  @media (min-width: 1199.98px) {
    column-count: 3;
  }
}

.card-body {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.75);

  h5 {
    font-size: 1rem;
  }
}

@keyframes bgchange {
  100% {
    opacity: 1
  }
  0% {
    opacity: 0
  }
}


.show {
  transition: opacity ease-in-out 2s;
  animation: bgchange 2s;
}

.card {
  box-shadow: 4px 6px 6px rgba(0, 0, 0, .1);

  &:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, .125);
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
#grid {
  display: none;
}


</style>

