<template>
  <div>
    <header-top></header-top>

    <div class="container" id="main">
      <div class="row">

        <div class="col-sm-12 col-lg-3">
          <h3>Categories</h3>
          <hr/>
          <br/>
          <div class="columns">
            <div id="navigation">
              <div class="navigation" v-for="(category, ind) in categories" :key="category.id" @click.prevent="showChilds(category)">

                <a href="#" class="text-muted" @click.prevent="category.childs == '' ? goToSubCategory(category, '') : null">
                  {{ category.title }}
                </a>

                <div class="childItem hide" :id="`show-${category.id}`">
                  <div v-for="(item, i) in category.childs" :key="i">
                    <a href="#" @click.prevent="goToSubCategory(category, item)">
                      {{ item.title }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div class="col-sm-12 col-lg-9 columns">
          <h3>Catalog of Products</h3>
          <hr/>
          <br/>
          <div class="w-100 mb-4 d-flex justify-content-between align-items-center">
            <div class="">

              <i class="material-icons list-icon " @click.prevent="list">view_headline</i>
              <i class="material-icons grid-icon" @click.prevent="grid">apps</i>

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
            <div class="card mb-3" style="max-width: 100%" v-if="data_total" v-for="(item, i) in data_total" :key="i">

              <shop-item :product="item"></shop-item>
            </div>
          </div>

          <div id="grid" class="w-100 mx-auto">
            <div class="row text-center">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%"
                   v-for="(item, i) in data_total"
                   :key="i">
                <grid-item :product="item"></grid-item>
              </div>
            </div>
          </div>

     <b-pagination
            class="t-4 flx-c mb-5"
            v-model="current"
            :total-rows="total"
            :per-page="per_page"
            aria-controls="my-table"
            pills
            @change="changeRoute"
            variant="outline-primary"
          ></b-pagination>

        </div>
        <br>
      </div>

    </div>

    <footer-bottom></footer-bottom>
  </div>

</template>

<script>
import shopItem from "@/components/shopItem";
import gridItem from "@/components/gridItem";
import HeaderTop from "@/components/HeaderTop";
import FooterBottom from "@/components/FooterBottom";

import _ from "lodash";

export default {
  loading: true,
  components: {
    shopItem,
    gridItem,
    HeaderTop,
    FooterBottom
  },

  data() {
    return {
      title: 'Shop | Catalog',
      visible: false,
      open_modal: false,
      categories: [],

      /*== pagination ==*/
      total: 2,
      current: 1,
      per_page: 0,
      data_total: [],
      min: 0,
      max: 0
    }
  },

  head() {
    return {
      title: this.title,
    }
  },

  async asyncData(ctx) {
    let {data} = await ctx.$axios.get(`/api/shop/products?page=${ctx.query.page}`)
    let cat = await ctx.store.getters["categories/categories"]
    return {
       data_total: data.data,
       total: data.meta.total,
       per_page: data.meta.per_page,
       current: ctx.query.page,
       categories: cat
    }
  },

  computed: {},

  watch: {
    '$route'() {
      this.getProducts(this.$route.query.page);
    },
  },

  methods: {

    async goToSubCategory(category, sub_category) {

      const cat_id = category.id
      const sub_id = sub_category.id

      await this.$store.dispatch('products/getCatProducts', {cat_id, sub_id})
          .then(res => {
            if (res.data == '') return;
            this.$router.push(`/shop/categories/${cat_id}${sub_id ? `/` + sub_id : ''}`);
          })
       await this.$router.push(`/shop/categories/${cat_id}/${sub_id ? sub_id : ''}`);
    },

    async getProducts(page) {
      try {
        await this.$axios.$get(`/api/shop/products?page=${page}`)
          .then(res => {
            this.data_total = res.data
            this.total = res.meta.total
            this.per_page =  res.meta.per_page
          })
      } catch (e) {
        throw e
      }
    },

    changeRoute(page){
      this.$router.push({
        query: {
          ...this.$route.query,
          page: page ? page : '',
        }
      })
    },

    showChilds(item) {
      if (item.childs == '') return;
      let elm = document.getElementById('show-' + item.id);
      let ch = document.querySelectorAll('.childItem')
      let elem = Array.from(ch)

      for (let i = 0; i < elem.length; i++) {
        elem[i].classList.add('hide')
      }
      //elm.classList.toggle('hide')


      //console.log(elm.classList.contains('hide'));
      if (elm.classList.contains('hide')) {
        elm.classList.add('show');
        elm.classList.remove('hide')
      } else {
        elm.classList.remove('show')
        elm.classList.add('hide')
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
  },

};

</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
@media screen and (min-width: 300px) and (max-width: 500px) {
  .card-text{
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

#navigation{
  margin: -.5rem 0 2rem 0;
  .navigation{
    margin: 1rem 0;
    a{
      padding: 1rem 0;
      text-transform: uppercase;
      text-decoration: none;
    }
  }
  .childItem {
    padding: 1rem 0 0 0.8rem;
    div{
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

</style>


