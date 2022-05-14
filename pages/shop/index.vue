<template>
  <div>
    <header-top></header-top>

    <div class="container show" id="main">
      <div class="row">

        <div class="col-sm-12 col-lg-3 mb-4">
          <h3 class="" style="margin-bottom: 2rem;">Categories </h3>
          <div class="columns mt-4 pt-3" style="border-top: 1px solid #00000020;">
            <categories :categories="categories" :flag="flag" ></categories>

            <!-- Tags -->
            <div class="col-sidebar my-5">
              <h3>Tags</h3><hr>
              <div class="d-flex flex-wrap justify-content-around align-items-center py-3" style="border-bottom: 1px solid rgba(0,0,0,0.1)">
                <span v-for="(tag, i) in tags" :key="i"
                    class="my-2 py-1 px-2 mx-2 text-center flex-grow-1 flex-shrink-0 badge_tag"
                    @click="getProductByTag(tag.id, tag.title, $event)">
                  {{ tag.title.toLowerCase() }}
                </span>
                <span class="my-3 py-1 px-2 flex-grow-1 flex-shrink-1 text-center"
                      id="badge_tag_const"
                      @click="resetTags">
                    {{ 'Reset Tags' }}
                </span>
              </div>
            </div>
            <!-- /Tags -->

            <!-- Additional -->
            <div class="col-sidebar my-5">
              <h3>Additional</h3><hr>
              <div class="d-flex flex-wrap justify-content-around align-items-center py-3" style="border-bottom: 1px solid rgba(0,0,0,0.1)">
                <span v-for="(item, i) in additional" :key="i"
                      class="my-2 py-1 px-2 mx-2 flex-grow-1 flex-shrink-0 badge_adds text-center"
                      @click="getAdditionalProducts(item.id, item.name, item.description, $event)">
                    {{ item.name }}
                </span>
                <span class="my-3 py-1 px-2 flex-grow-1 flex-shrink-1 text-center"
                        id="adds_reset"
                        @click="resetAdds">
                      {{ 'Reset selected' }}
                </span>
              </div>
            </div>
            <!-- /Additional -->
          </div>

        </div>

        <div class="col-sm-12 col-lg-9 columns main_shop" id="grid_tag" style="margin-top: -1.5em;">
          <!-- Top Items -->
          <div class="w-100 d-flex justify-content-between align-items-center" style="height: 90px;">

            <div class="">
              <i class="material-icons list-icon " @click.prevent="list">view_headline</i>
              <i class="material-icons grid-icon ml-1" @click.prevent="grid">apps</i>
          </div>

            <h1 id="test" class="test"><span></span></h1>
            <div>
              <select class="form-control px-1 py-1" style="height: unset;">
                <option value="" selected>Order by</option>
                <option value="">Price ASC</option>
                <option value="">Price DESC</option>
              </select>
            </div>
          </div>

          <!-- List View -->
          <div id="list">
            <div v-if="flag == false && tag_visible == false && adds == false" >
              <div class="card mb-3" style="max-width: 100%" v-if="data_total" v-for="(item, i) in data_total" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>
            <div v-if="flag == true">
              <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>

            <div v-if="tag_visible == true">
              <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in products_on_tag" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>

            <div v-if="adds == true">
              <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in additional_products" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>
          </div>

          <!-- Grid View -->
          <div id="grid" class="w-100 mx-auto">
            <div class="row text-center" v-if="flag == false && tag_visible == false && adds == false">
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
            <div  class="row text-center"  v-if="tag_visible == true">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-4" style="max-width: 100%"
                   v-for="(item2, z) in products_on_tag" :key="z">
                <grid-view :product="item2"></grid-view>
              </div>
            </div>
            <div class="row text-center" style="" v-if="adds == true">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 pb-4" v-for="(item, z) in additional_products" :key="z">
                <grid-view :product="item"></grid-view>
              </div>
            </div>
          </div>



          <b-pagination
            class="t-4 flx-c mb-5"
            v-if="flag == false && tag_visible == false && adds == false"
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
            v-if="flag == true && tag_visible == false"
            class="t-4 flx-c"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table2"
            pills
            @change="changeHandler2"
          ></b-pagination>

          <!-- Tags Pagination -->
          <b-pagination
            v-if="tag_visible == true && adds == false"
            class="t-4 flx-c"
            v-model="currentPageTags"
            :total-rows="rowsTags"
            :per-page="perPageTags"
            aria-controls="my-table3"
            pills
            @change="changeHandlerTags"
          ></b-pagination>

          <!-- Additional Pagination -->
          <b-pagination
            v-if="adds == true"
            class="t-4 flx-c"
            v-model="currentPageAdds"
            :total-rows="rowsAdds"
            :per-page="perPageAdds"
            aria-controls="my-table3"
            pills
            @change="changeHandlerAdds"
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

      /*======== Tags ========*/
      tag_visible: false,
      tags: [],
      products_on_tag: [],
      tag_id: null,

      /*===== Paginate with Tags ====*/
      currentPageTags: +this.$route.query.page || 1,
      perPageTags: 2,
      pageCountTags: 1,
      meta_total: 0,
      gsap: this.gsap,

      /*======== Additional =======*/
      adds: false,
      additional: [],
      additional_products: [],
      adds_id: null,

      /*======== Additional Pagination =======*/
      currentPageAdds: +this.$route.query.page || 1,
      perPageAdds: 3,
      pageCountAdds: 1,
      adds_total: 0,

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
    let tags = await ctx.$axios.$get(`/api/shop/tags`);
    let additional = await ctx.$axios.$get(`/api/shop/additional`);

    //console.log(additional);

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
      counts: tmp,
      tags: tags,
      additional: additional.data,
     // additional_products: add_prod

    }
  },

  computed: {
    rows() {
      return this.data_total != undefined ? this.data_total.length : ''
    },
    rowsTags() {
      return this.products_on_tag != undefined ? this.meta_total : ''
    },
    rowsAdds(){
      return this.additional_products != undefined ? this.adds_total : ''
    }
  },

  watch: {
    '$route'() {
      this.getProducts(this.$route.query.page);
    },
  },

  methods: {

    async getAdditionalProducts(id, name, description, e){
      //this.additional_products = this.additional.filter(item => item.id == id)
      let adds_products = await this.$axios.$post(`/api/shop/additional/${id}`)
      this.additional_products = adds_products.data
      let adds = document.querySelectorAll('.badge_adds')

      for (let i = 0; i < adds.length; i++) {
        if(adds[i].classList.contains('badge_tag_active') ){
          adds[i].classList.remove('badge_tag_active')
        }
      }
      /*Animate*/
      let grid_tag = document.getElementById('grid_tag')
      //console.log(grid_tag);
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1500)

      /*GSAP*/
      const TextPlugin = this.$TextPlugin
      this.$gsap.registerPlugin(TextPlugin);
      this.$gsap.to("#test", {
        duration: 2,
        text: {
          value: name + ' ' + description,
        },
        ease: "power2"
      });
      /*/GSAP*/

      e.target.classList.add('badge_tag_active')

      this.adds_id = id
      this.adds_total = adds_products.meta.total
      this.adds = true

    },

    resetAdds(){
      this.adds = false
      let adds = document.querySelectorAll('.badge_adds')
      for (let i = 0; i < adds.length; i++) {
        if(adds[i].classList.contains('badge_tag_active') ){
          adds[i].classList.remove('badge_tag_active')
        }
      }
      test.innerHTML = ''
    },

    async getProductByTag(id, title, e) {
      let products = await this.$axios.$post(`/api/shop/tags/${id}`);
      let tags = document.querySelectorAll('.badge_tag')

      for (let i = 0; i < tags.length; i++) {
        if(tags[i].classList.contains('badge_tag_active') ){
          tags[i].classList.remove('badge_tag_active')
        }
      }

      /*Animate*/
      let grid_tag = document.getElementById('grid_tag')
      //console.log(grid_tag);
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1500)

      /*GSAP*/
      // Access GSAP by using

      const TextPlugin = this.$TextPlugin
      this.$gsap.registerPlugin(TextPlugin);
      this.$gsap.to("#test", {
        duration: 2,
        text: {
          value: title + ' products',
        },
        ease: "power2"
      });
      /*/GSAP*/

      e.target.classList.add('badge_tag_active')
      this.products_on_tag = products.data
      this.meta_total = products.meta.total
      this.tag_id = id
      this.tag_visible = true
    },

    resetTags() {
      this.tag_visible = false
      let tags = document.querySelectorAll('.badge_tag')
      for (let i = 0; i < tags.length; i++) {
        if(tags[i].classList.contains('badge_tag_active') ){
          tags[i].classList.remove('badge_tag_active')
        }
      }
      test.innerHTML = ''
    },

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

    async changeHandlerTags(page){
      let products = await this.$axios.$post(`/api/shop/tags/${this.tag_id}${page ? `?page=` + page : ''}`);
      let grid_tag = document.getElementById('grid_tag')
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1500)

      this.products_on_tag = products.data
      this.perPageTags = products.meta.per_page
      this.currentPageTags = products.meta.current_page
    },

    async changeHandlerAdds(page){
      let products = await this.$axios.$post(`/api/shop/additional/${this.adds_id}${page ? `?page=` + page : ''}`);
      //console.log(products);
      let grid_tag = document.getElementById('grid_tag')
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1500)

      this.additional_products = products.data
      this.perPageAdds = products.meta.per_page
      this.currentPageAdds = products.meta.current_page
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

.col-sidebar{
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
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
 /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;*/
  h3 {
    text-align: left !important;
  }

  &.main_shop {
    h3 {
      text-align: center !important;
    }
  }
  .badge_tag, .badge_adds {
    cursor: pointer;
    background: rgba(255,255,255, 0);
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

  .badge_tag_active{
    /*background: linear-gradient(to top, #007bff, #99caff);*/
    background: #4399f1;
    border: 1px solid #99caff;
    border-radius: 5px;
    color: #fff;
    opacity: 1;
    transition: all 1s ease-in-out;
  }
  #badge_tag_const, #adds_reset {
    width: 50%;
    text-align: center;
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
}

.grid_tag_animate, .show{
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
/*@media screen and (max-width: 420px){
  .test{
    font-size: 1.5rem;
  }
}*/

@include _480{
  #test{
    font-size: 1rem;
  }
}
</style>


