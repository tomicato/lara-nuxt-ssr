<template>
  <div>
    <modal-window v-if="open"
                  id="modalComponent"
                  btnTitle="Add To Cart"
                  :modalTitle="single_product.name"
                  @addFromModal="addToCart(single_product)"
                  @closePopupWindow="closeModal">
      <img :src="`${$axios.defaults.baseURL}/uploads/${single_product.photo}`"
           class="img-fluid" :alt="single_product.name">
    </modal-window>
    <header-top></header-top>
    <div class="container" id="main">
      <div class="row">
        <div class="col-sm-12 col-lg-3 columns">
          <h3 class="mb-4">Categories</h3>
          <hr/>
          <br>
          <categories :categories="categories" :flag="flag" :counts="counts"></categories>
        </div>

        <div class="col-sm-12 col-lg-9 columns products">
          <search-block :name="name_main_content"></search-block>
          <hr/>
          <br/>
          <div v-if="flag == true" class="w-100 d-flex justify-content-between align-items-center" id="top-tools">
            <div class="d-flex justify-content-between align-items-center">
              <i class="material-icons list-icon mx-2" @click.prevent="list">view_headline</i>
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

          <!-- Start row -->
          <div class="row show mx-auto" v-if="data_total == ''">
            <div id="card" class="row" style="max-width: 100%;">

              <div class="col-4 zoom_img">
                <img :src="`${$axios.defaults.baseURL}/uploads/${single_product.photo}`"
                     class="card-img"
                     :alt="single_product.name"
                     @click.prevent="openModal">
              </div>
              <div class="col-8 card-body">

                <!--              <nuxt-link :to="`/shop/products/${single_product.id}`"><h5 class="card-title">{{
                                  single_product.name
                                }}</h5></nuxt-link>
                              <hr/>-->

                <p class="card-text">{{ single_product.description }}</p>

                <div class="card-text d-flex justify-content-between align-items-center py-3">

                  <div class="font-weight-bold text-danger d-flex flex-column justify-content-center">
                    <span class="text-muted" style="padding-left: 5px;text-decoration: line-through;"
                          v-if="single_product.old_price">
                      {{ divideNumberByPieces(single_product.old_price, ' ') }} ₽</span>
                    <mark v-if="single_product.price">{{ divideNumberByPieces(single_product.price, ' ') }} ₽</mark>
                  </div>
                  <div class="card-text d-flex justify-content-center align-items-center">
                    <small v-if="single_product.on_stock == 1" class="badge badge-primary ">{{ 'In stock' }}</small>
                    <small v-else class="badge badge-info ">{{ 'Absent' }}</small>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center py-5">
                  <nuxt-link to="#" title="Leave Feedback" style="text-decoration: none">
                    <small class="d-flex justify-content-around align-items-center">
                      <i class="material-icons" style="color: #DC143CFF">star_rate</i>&nbsp;
                      <span>{{ single_product.rating }}</span>
                    </small>
                  </nuxt-link>

                  <div class="d-flex justify-content-between align-items-center">
                    <small>SKU: {{ single_product.cku }}</small>
                  </div>
                  <!--                  <div class="">Some option</div>
                                    <div class="">Rating</div>
                                    <div class="">Another option</div>-->
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex justify-content-between align-items-center ml-auto">
                    <button class="btn-outline-info form-control w-25" v-if="single_product_qty <= 0" disabled>-
                    </button>
                    <button class="btn-outline-info form-control w-25" v-else
                            @click.prevent="minus(single_product_qty, single_product.id)">-
                    </button>

                    <input type="number" class="form-control text-center mx-1" id="countAdd" min="0"
                           :value="single_product_qty <= 0 || single_product_qty == undefined ? 0 : single_product_qty"
                           @input.number.trim="inputQty($event.target.value, single_product_qty, single_product.id)"/>

                    <button class="btn-outline-success form-control w-25 mr-2"
                            @click.prevent="plus(single_product.id)">+
                    </button>
                  </div>
                  <!--               <button class="form-control w-25 btn-outline-danger"
                                          @click.prevent="deleteItem(single_product.qty, single_product.id)">Delete
                                  </button>-->
                </div>
                <!--              <div>{{ single_product.name }}</div>
                              <div>{{ single_product.description }}</div>
                              <div>{{ single_product.price }}</div>-->
              </div>
            </div>

            <!-- Tab`s content -->
            <div class="row my-5 mx-auto border_horizontal w-100">
              <div class="col-sm-12 col-md-3 col-lg-3 w-100 my-3" style="z-index: 0">
                <div class="list-group" id="list-tab" role="tablist">
                  <a class="my-1 list-group-item list-group-item-action list-group-item-outline-info"
                     id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Description</a>
                  <a class=" my-1 list-group-item list-group-item-action list-group-item-outline-info"
                     id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Details</a>
                  <a class=" my-1 list-group-item list-group-item-action list-group-item-outline-info"
                     id="list-messages-list" data-toggle="list" href="#list-messages" role="tab"
                     aria-controls="messages">Testimonials</a>
                  <a class=" my-1 list-group-item list-group-item-action list-group-item-outline-info"
                     id="list-settings-list" data-toggle="list" href="#list-settings" role="tab"
                     aria-controls="settings">Discussions</a>
                </div>
              </div>
              <div class="col-sm-12 col-md-9 col-lg-9 my-3">
                <div class="tab-content" id="nav-tabContent">
                  <div class="tab-pane show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                    {{ single_product.description }}
                  </div>
                  <div class="tab-pane show" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    <div v-for="(item, i) in Object.entries(properties)" :key="i">
                      <div class="d-flex flex-column justify-content-between align-items-start mb-2 mt-2 py-3 properties font-weight-bolder">
                        {{ Array.from(Object.keys(properties))[i] }}
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                       <div class="d-flex flex-column align-self-start h-100 w-100">
                        <span class="my-2" v-for="(it, k) in Object.keys(Array.from(Object.values(properties))[i])" :key="k">
                          {{ it }}
                        </span>
                       </div>
                        <div class="d-flex flex-column align-items-end w-100">
                        <span class="my-2" v-for="(im, l) in Object.values(Object.values(properties)[i])" :key="l">
                          {{ im[0] }}
                        </span>
                      </div>
                      </div>

                      <div class="">

                      </div>

                    </div>
                  </div>
                  <div class="tab-pane show" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                    Ut ut do pariatur aliquip aliqua aliquip exercitation do nostrud commodo reprehenderit aute ipsum
                    voluptate.
                    Irure Lorem et laboris nostrud amet cupidatat cupidatat anim do ut velit mollit consequat enim
                    tempor.
                    Consectetur est minim nostrud nostrud consectetur irure labore voluptate irure.
                    Ipsum id Lorem sit sint voluptate est pariatur eu ad cupidatat et deserunt culpa sit eiusmod
                    deserunt.
                    Consectetur et fugiat anim do eiusmod aliquip nulla laborum elit adipisicing pariatur cillum.
                  </div>
                  <div class="tab-pane show" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                    Irure enim occaecat labore sit qui aliquip reprehenderit amet velit.
                    Deserunt ullamco ex elit nostrud ut dolore nisi officia magna sit occaecat laboris sunt dolor.
                    Nisi eu minim cillum occaecat aute est cupidatat aliqua labore aute occaecat ea aliquip sunt amet.
                    Aute mollit dolor ut exercitation irure commodo non amet consectetur quis amet culpa.
                    Quis ullamco nisi amet qui aute irure eu.
                    Magna labore dolor quis ex labore id nostrud deserunt dolor eiusmod eu pariatur culpa mollit in
                    irure.
                  </div>
                </div>
              </div>


            </div>
          </div>
          <!-- /End row -->


          <!-- Search products-->
          <div id="list">
            <div v-if="flag == true">
              <div class="card mb-3 show" style="max-width: 100%" v-for="(item, i) in items" :key="i">
                <list-view :product="item"></list-view>
              </div>
            </div>
          </div>
          <div id="grid">
            <div class="row text-center" v-if="flag == true">
              <div class="col-sm-12 col-md-6 col-lg-6 col-xl-4 p-2" style="max-width: 100%"
                   v-for="(item, i) in items" :key="i">
                <grid-view :product="item"></grid-view>
              </div>
            </div>
          </div>
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
          <!-- /Search products-->
        </div>
        <!-- Carousel -->
        <div class="container my-4 mx-auto">
          <h3 style="text-align: center; margin: 60px 0;">Similar products</h3>
          <div class="w-75 mx-auto custom1 owl-carousel owl-theme">
            <div class="item w-75 mx-auto"><img src="~/assets/images/kor.webp"></div>
            <div class="item w-75 mx-auto"><img src="~/assets/images/mat.webp"></div>
            <div class="item w-75 mx-auto"><img src="~/assets/images/video.webp"></div>
            <div class="item w-75 mx-auto"><img src="~/assets/images/kor.webp"></div>
            <div class="item w-75 mx-auto"><img src="~/assets/images/mat.webp"></div>
            <div class="item w-75 mx-auto"><img src="~/assets/images/cool.jpg"></div>
          </div>
        </div>

        <!-- /Carousel -->

      </div>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import Categories from "@/components/Categories";
import SearchBlock from "@/components/SearchBlock";
import FooterBottom from "@/components/FooterBottom";
import modalWindow from "@/components/modalWindow";
import listView from "@/components/listView";
import gridView from "@/components/gridView";
import _ from "lodash";
import 'animate.css';

export default {
  comments: [
    Categories,
    SearchBlock,
    FooterBottom,
    modalWindow,
    listView,
    gridView,
  ],

  head() {
    return {
      title: this.single_product.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.single_product.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'копьютеры, мониторы, процессоры, системы охлаждения'
        },

      ]
    }
  },

  data() {
    return {
      open: false,
      single_product: {},
      name_main_content: '',
      categories: [],
      filters: [],
      counts: [],
      catId: null,
      subId: null,
      common: [],
      flag: false,

      cart: [],
      keys: [],
      totalCount: 0,
      data_total: [],
      arrTotal: [],
      products: [],
      single_product_qty: 0,

      /*======= Pagination Filtered =======*/
      perPage: 3,
      currentPage: +this.$route.query.page || 1,
      pageCount: 1,
      itemsAll: [],
      items: [],

      /* Properties */
      properties: []
    }
  },

  mounted() {
    /*Slider script */
    let $owl = $('.owl-carousel');
    $owl.owlCarousel({
      loop: true,
      margin: 10,
      autoHeight: false,
      /*autoplay:false,
      autoplayTimeout:3000,
      autoplayHoverPause:true,*/
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 3,
          loop: false,
        }
      }
    });
    /*Slider script */

    this.$root.$on('getFilteredData', (arr) => {
      this.data_total = arr.data

      this.data_total.length > 0 ? this.flag = true : this.flag = false

      this.itemsAll = _.chunk(this.data_total, this.perPage)
      this.pageCount = _.size(this.itemsAll)
      this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]
      //console.log(`${this.$axios.defaults.baseURL}/shop/products/${this.$route.params.id}`);
    })

    let obj = localStorage.getItem('cartP-' + this.$route.params.id);
    obj ? this.single_product_qty = JSON.parse(obj).qty : this.single_product_qty = 0
  },

  async asyncData(ctx) {
    let {data} = await ctx.$axios.get(`/api/shop/single/${ctx.route.params.id}`);
    let cat = await ctx.store.getters["categories/categories"]
    console.log(data);

      let properties = data.data.properties.length > 0 ? data.data.properties[0].properties.data : '';
      //console.log(Array.from(data.data.properties));


    return {
      single_product: data.data,
      name_main_content: data.data.name,
      categories: cat,
      counts: data.data.sub_count,
      properties: properties ? properties : []
    }
  },

  computed: {
    rows() {
      return this.data_total.length > 0 ? this.data_total.length : ''
    },
  },

  methods: {
    async addToCart(cartItem) {
      try {
        await this.$store.dispatch('cart/addToCartItems', cartItem)
        this.totalCount = this.totalCount + 1
        this.total()
        this.countProductInCart()

      } catch (e) {
        console.log(e);
      }
    },

    total() {
      let arr = [];
      this.keys = this.getSession()
      for (let i = 0; i < this.keys.length; i++) {
        arr.push(JSON.parse(localStorage.getItem(this.keys[i])))
      }
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        tmp.push(arr[i].qty)
      }

      let total_count = tmp.reduce((sum, current) => sum + current, 0);
      this.totalCount = total_count
      this.countProductInCart()
      return total_count
    },

    getSession() {
      let keys = Object.keys(localStorage);
      let f_keys = [];

      for (let i = 0; i < keys.length; i++) {
        let sk = keys[i].split('-')
        f_keys.push(sk[1])
      }

      let filtered = f_keys.filter(item => item !== undefined)
      let arr = [];

      for (let i = 0; i < filtered.length; i++) {
        arr.push('cartP-' + filtered[i]);
      }
      return arr;
    },

    countProductInCart() {
      let cartBadge = document.getElementById('cart');
      let authCartBadge = document.getElementById('authCart');

      if (this.totalCount == 0 && !this.$auth.user) {
        cartBadge.style.display = 'none';
      } else if (!this.$auth.user && this.totalCount > 0) {
        cartBadge.style.display = 'inline-block';
      }
      if (this.$auth.user && this.totalCount == 0) {
        authCartBadge.style.display = 'none';
      } else if (this.$auth.user && this.totalCount > 0) {
        authCartBadge.style.display = 'inline-block';
      }

      if (this.$auth.user) {
        authCartBadge.innerText = this.totalCount;
        // authCartBadge.style.display = 'inline-block';
      } else {
        cartBadge.innerText = this.totalCount;
        //cartBadge.style.display = 'inline-block';
      }
    },

    async changeHandler2(page) {
      this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
    },

    divideNumberByPieces(x, delimiter) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
      }
    },

    minus(qty, id) {
      //console.log(qty, id);

      let obj = localStorage.getItem('cartP-' + id)
      let tmp = JSON.parse(obj);

      if (obj) {
        tmp.qty = tmp.qty - 1
        this.single_product_qty = tmp.qty
        localStorage.setItem('cartP-' + id, JSON.stringify(tmp))
      }

      if (tmp && tmp.qty <= 0) {
        localStorage.removeItem('cartP-' + id);
      }
      this.totalCount = this.totalCount <= 0 ? 0 : this.totalCount - 1
      this.countProductInCart()
    },

    inputQty(newVal, qty, id) {
      //console.log(newVal, qty);

      if (qty != undefined && qty > 0) {
        // this.single_product_qty = 1;
        let obj = localStorage.getItem('cartP-' + id)
        let tmp = JSON.parse(obj);
        if (obj) {
          tmp.qty = +newVal < 0 ? 0 : +newVal
          this.single_product_qty = +newVal
          localStorage.setItem('cartP-' + id, JSON.stringify(tmp))
        }
        if (tmp && tmp.qty <= 0) {
          localStorage.removeItem('cartP-' + id);
        }

        this.total()
        this.countProductInCart()
      } else {
        this.plus(id)
      }

    },

    plus(id) {
      this.$store.dispatch('cart/addToCartItems', this.single_product)
      let obj = localStorage.getItem('cartP-' + id);
      obj ? this.single_product_qty = JSON.parse(obj).qty : 0

      this.totalCount = this.totalCount + 1
      this.total()
      this.countProductInCart()
    },

    deleteItem(qty, id) {
      // console.log(this.arrTotal);
      // console.log(id + " " + qty)
      //console.log(this.currentPage)

      let obj = this.arrTotal.filter(item => item.id == id)
      let sum = obj[0].qty * obj[0].item.price

      this.productsCount = this.productsCount - 1
      this.totalSum = this.totalSum - sum
      this.totalCount = this.totalCount - obj[0].qty

      this.items = this.items.filter(item => item.id != id)
      if (this.items == 0) window.location.reload();

      this.itemsAll = _.chunk(this.items, this.perPage)
      this.pageCount = _.size(this.itemsAll)
      this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]

      if (this.items < this.perPage) {
        this.rows--;
      }
      /*console.log(this.items);
      console.log(this.itemsAll);
      console.log(this.pageCount + "  " + this.currentPage);*/
      localStorage.removeItem('cartP-' + id)
      this.countProductInCart()

      if (!this.totalCount) {
        this.products = []
      }


      // console.log(this.items)
    },

    openModal() {
      this.open = true
      let main = document.getElementById('main')
      main.classList.remove('show');
      main.style.transition = 'unset'
      main.style.transitionDuration = 'unset'
      main.style.transitionProperty = 'unset'
      main.style.transitionDelay = 'unset'
    },

    closeModal() {
      let main = document.getElementById('main')
      main.classList.add('show');
      main.style.opacity = 1;
      this.open = false
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
}
</script>

<style lang="scss" scoped>
/*Slider styles*/
/*.owl-carousel .item {
  height: 20rem;
  background: #4DC7A0;
  padding: 1rem;
}*/
/*Slider styles*/

#top-tools {
  height: 30px;
  margin-bottom: 50px !important;
}

#filters_top {
  margin: 0 15px;

  .badge-info {
    margin: 10px 10px !important;
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

.card-body {
  a {
    text-decoration: none;
    color: crimson;
  }
}

#grid {
  display: none;
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

.border_horizontal {
  border-top: 1px solid #eee;
  padding: 4rem 0;
}

.zoom_img img {
  cursor: zoom-in;
}

.list-group-item-outline-info {
  border: 1px solid #eee !important;
  background-color: transparent !important;
  color: #6c757d !important;
}

.properties {
  border-bottom: 1px solid #eee;
}


#countAdd {
  iframe {
    display: block !important;
  }

  width: 30%;
}

.card-body {
  a {
    text-decoration: none;
    color: crimson;
  }

  mark {
    font-size: 22px !important;
  }
}

.badge-info, .badge-primary {
  padding: 6px 18px;
}

.badge-primary {
  background: #5daafc;
  //background: #e74a6b;
}

.card img {
  max-width: 250px;
  padding: 10px;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }
}

.card .image-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.card {
  transition: all ease-in-out .4s;
}

.card:hover {
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.10), 2px 4px 6px rgba(0, 0, 0, 0.10);
}
</style>
