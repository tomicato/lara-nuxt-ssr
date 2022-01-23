<template>
  <div class="container" id="main">
    <div class="row">
      <div class="col-sm-12 col-lg-3 columns">
        <h3>Categories</h3>
        <hr/>
        <br/>
        <ul>
          <li v-for="(category, ind) in categories" :key="category.id" @click.prevent="showChilds(category)">

            <nuxt-link :to="category.childs == '' ? `/shop/products` : ''" class="text-muted">
              {{category.title }}
            </nuxt-link>

            <ul class="childItem hide" :id="`show-${category.id}`">
              <li v-for="(item, i) in category.childs" :key="i">
                {{ item.title }}
              </li>
            </ul>
          </li>
        </ul>
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
         <div class="card mb-3" style="max-width: 100%" v-for="(item, i) in items" :key="i">
           <list-view :product="item"></list-view>
         </div>
       </div>

        <div id="grid" class="w-100 mx-auto">
          <div class="row text-center">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <grid-view :product="item"></grid-view>
              </div>
          </div>
        </div>

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
      <br>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import listView from "@/components/listView";
import gridView from "@/components/gridView";

export default {
  head: {
    title: 'Shop',
  },
  components: {
    listView,
    gridView
  },
  data() {
    return {
      visible: false,
      open_modal: false,
      perPage: 5,
      currentPage: +this.$route.query.page || 1,
      pageCount: 1,
      itemsAll: [],
      items: [],
      products: [],
      categories: []
    }
  },
  created() {
    this.itemsAll = _.chunk(this.products, this.perPage)
    this.pageCount = _.size(this.itemsAll)
    this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]

  },
  computed: {
    rows() {
      return this.products.length
    },
  },
  async asyncData({store}) {
    let cat = await store.getters["categories/categories"]
    let data = await store.getters["products/products"]
    return {
      products: data,
      categories: cat
    }
  },

  methods: {

    async changeHandler(page) {
      // await this.$router.push(`${this.$route.path}?page=${page}`) // Отображение в  адресной строке маршрута
      this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
    },

    showChilds(item) {
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

    list(){
      let lEl = document.getElementById('list')
      let gEl = document.getElementById('grid')
      let lIcon = document.querySelector('.list-icon')
      let gIcon = document.querySelector('.grid-icon')


      lEl.style.display = 'block';
      gEl.style.display = 'none';

      lIcon.classList.add('active')
      gIcon.classList.remove('active')

    },
    grid(){
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


}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}

#grid{
  display: none;
}

.show {
  display: block;
}

.hide {
  display: none;
  opacity: 0;
}

.childItem {
  padding-left: 0.8rem;
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
    color: deepskyblue!important;
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


