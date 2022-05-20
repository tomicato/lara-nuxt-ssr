<template>
  <div class="show">
    <modal-window v-if="open"
                  id="modalComponent"
                  btnTitle="Add To Cart"
                  :modalTitle="single_product.name"
                  @addFromModal="addToCart(single_product)"
                  @closePopupWindow="closeModal">

      <!-- If No Gallery -->
      <div v-if="gallery.length == 0" class="d-flex justify-content-center align-items-center">
        <img :src="`${$axios.defaults.baseURL}/uploads/${single_product.photo}`" class="">
      </div>
      <!--/ If No Gallery -->

      <!-- If Isset Gallery -->
      <div v-if="$screen.sm && gallery.length > 0" class="d-flex justify-content-center align-items-center">

        <div class="flex flex-column justify-content-around align-items-center d-none d-md-flex">
          <div v-for="(image, i) in gallery" :key="i" class=" d-flex justify-content-center align-items-center"
               style="max-width: 100%;">
            <img v-if="i <= 2" :src="`${$axios.defaults.baseURL}/gallery/${image}`" class="" style="cursor: pointer;"
                 @click="changePreview(image)">
          </div>
        </div>

        <img
            :src="preview ? `${$axios.defaults.baseURL}/gallery/${preview}` : `${$axios.defaults.baseURL}/uploads/${single_product.photo}`"
            style="max-width: 45%;" class="img-fluid main_modal_photo" :alt="single_product.name">

        <div class="flex flex-column justify-content-around align-items-center d-none d-md-flex">
          <div v-for="(image, i) in gallery" :key="i" class=" d-flex justify-content-center align-items-center"
               style="max-width: 100%;">
            <img v-if="i >= 3" :src="`${$axios.defaults.baseURL}/gallery/${image}`" class="" style="cursor: pointer;"
                 @click="changePreview(image)">
          </div>
        </div>

      </div>
      <!-- /If Isset Gallery -->

      <!-- Carousel -->
      <div class="mx-auto owl-carousel owl-theme" v-else>
        <div v-for="(image, i) in gallery" :key="i">
          <div class="item w-75 mx-auto"><img :src="`${$axios.defaults.baseURL}/gallery/${image}`" class=""></div>
        </div>
      </div>
      <!-- /Carousel -->

    </modal-window>

    <header-top></header-top>

    <div class="container" id="main">
      <div class="row">
        <!--Left sidebar -->
        <div class="col-sm-12 col-lg-3 columns">
          <h3 class="mb-4" style=" border-bottom:1px solid rgba(0,0,0,0.1); padding: 20px 0">Categories</h3>
          <categories :categories="categories" :flag="flag"></categories>
        </div>

        <!-- Product`s properties -->
        <div class="col-sm-12 col-lg-9 columns products">

          <!-- Breadcrumbs  -->
          <div class="table-responsive">
            <table class="table table-borderless">
              <tbody>
              <tr>
                <td>
                  <div
                      class="d-flex flex-sm-column flex-column flex-row flex-md-row justify-content-end flex-lg-row align-items-center"
                      style="font-size: 1rem; padding-top: 10px; margin-bottom: 0%;">
                    <div id="breadcrumbs" class="flex-grow-0 flex-shrink-0">
                      <nuxt-link to="/shop">{{ 'Catalog' }}</nuxt-link>
                      /
                      <nuxt-link :to="`/shop/categories/${single_product.category_id}`">{{ cat_title }}</nuxt-link>
                      <nuxt-link v-if="sub_title"
                                 :to="`/shop/categories/${single_product.category_id}/${single_product.sub_category_id}`">
                        {{ ' / ' + sub_title }}
                      </nuxt-link>
                      /
                      <nuxt-link to="#">{{ single_product.name }}</nuxt-link>
                    </div>&nbsp;&nbsp;&nbsp;
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- /Breadcrumbs  -->

          <!-- Select view grid-or-list  -->
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
          <!-- /Select view grid-or-list  -->

          <!-- Card content -->
          <div class="card mb-3" style="max-width: 100%">
            <div class="row no-gutters">
              <div class="col-md-4 zoom_img w-75 mx-auto image-block">
                <img :src="`${$axios.defaults.baseURL}/uploads/${single_product.photo}`" class="py-4 card-img"
                     :alt="single_product.name" @click.prevent="openModal">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title grid-title font-weight-normal">{{ single_product.name }}</h5>
                  <hr/>
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
                    <div title="Leave Feedback" style="text-decoration: none">
                      <small class="d-flex justify-content-around align-items-center">
                        <!--  <i class="material-icons" style="color: #DC143CFF">star_rate</i>&nbsp;
                       <span>{{ single_product.rating }}</span>-->
                        <div class="" style="width: 100px">
                          <svg version="1.1" id="stars" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 818 127.5" xml:space="preserve">
                                <style type="text/css">
                                        .st0 {
                                          fill: none;
                                          stroke: #e90808;
                                          stroke-width: 2.5;
                                          stroke-miterlimit: 10;
                                          fill: #fff;
                                        }
                                </style>
                            <polygon  points="67,0.8 87.5,42.3 133.2,49 100.1,81.2 107.9,126.8 67,105.3 26.1,126.8 33.9,81.2 0.8,49 46.6,42.3 " :class="`${1 <= rating ? 'gold' : 'transparent'} st0`"></polygon>
                            <polygon  points="238,0.8 258.5,42.3 304.2,49 271.1,81.2 278.9,126.8 238,105.3 197.1,126.8 204.9,81.2 171.8,49 217.6,42.3 " :class="`${2 <= rating ? 'gold' : 'transparent'} st0`"></polygon>
                            <polygon  points="409,0.8 429.5,42.3 475.2,49 442.1,81.2 449.9,126.8 409,105.3 368.1,126.8 375.9,81.2 342.8,49 388.6,42.3 " :class="`${3 <= rating ? 'gold' : 'transparent'} st0`"></polygon>
                            <polygon  points="580,0.8 600.5,42.3 646.2,49 613.1,81.2 620.9,126.8 580,105.3 539.1,126.8 546.9,81.2 513.8,49 559.6,42.3 " :class="`${4 <= rating ? 'gold' : 'transparent'} st0`"></polygon>
                            <polygon  points="751,0.8 771.5,42.3 817.2,49 784.1,81.2 791.9,126.8 751,105.3 710.1,126.8 717.9,81.2 684.8,49 730.6,42.3 " :class="`${5 <= rating ? 'gold' : 'transparent'} st0`"></polygon>
                            </svg>

                        </div>
                        <div class="ml-5 font-weight-normal">{{ single_product.rating != '' ? count_feeds : '' }}</div>
                      </small>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                      <small>SKU: {{ single_product.cku }}</small>
                    </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Card content -->

          <!-- Start single product info -->
          <div class="row show mx-auto" v-if="data_total == ''">
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
                      <div
                          class="d-flex flex-column justify-content-between align-items-start mb-2 mt-2 py-3 properties font-weight-bolder">
                        {{ Array.from(Object.keys(properties))[i] }}
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-column align-self-start h-100 w-100">
                        <span class="my-2" v-for="(it, k) in Object.keys(Array.from(Object.values(properties))[i])"
                              :key="k">
                          {{ it }}
                        </span>
                        </div>
                        <div class="d-flex flex-column align-items-end w-100">
                        <span class="my-2" v-for="(im, l) in Object.values(Object.values(properties)[i])" :key="l">
                          {{ im.join(', ') }}
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane show" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">

                    <!-- Testimonials -->
                    <div v-for="(review, m) in testimonials" :key="m">
                      <div class="mb-4 py-4" style="border-bottom: 1px solid #d0d0d0;">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex justify-content-between align-items-center" style="max-width: 35%">
                            <div>{{ review.user.name }}</div>
                            <div>
                              <img :src="`${$axios.defaults.baseURL}/uploads/profile/${review.user.avatar ? review.user.avatar : 'avatar.jpg'}`"
                                  class="ml-5 rounded-circle" width="30" alt="">
                            </div>
                          </div>
                          <div class="" style="width: 100px">
                            <svg version="1.1" id="stars" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 818 127.5" xml:space="preserve">
                                <style type="text/css">
                                        .st0 {
                                          fill: none;
                                          stroke: #e90808;
                                          stroke-width: 2.5;
                                          stroke-miterlimit: 10;
                                          fill: #fff;
                                        }
                                </style>
                                <polygon  points="67,0.8 87.5,42.3 133.2,49 100.1,81.2 107.9,126.8 67,105.3 26.1,126.8 33.9,81.2 0.8,49 46.6,42.3 " :class="`${1 <= review.rating ? 'gold' : 'transparent'} st0`"></polygon>
                                <polygon  points="238,0.8 258.5,42.3 304.2,49 271.1,81.2 278.9,126.8 238,105.3 197.1,126.8 204.9,81.2 171.8,49 217.6,42.3 " :class="`${2 <= review.rating ? 'gold' : 'transparent'} st0`"></polygon>
                                <polygon  points="409,0.8 429.5,42.3 475.2,49 442.1,81.2 449.9,126.8 409,105.3 368.1,126.8 375.9,81.2 342.8,49 388.6,42.3 " :class="`${3 <= review.rating ? 'gold' : 'transparent'} st0`"></polygon>
                                <polygon  points="580,0.8 600.5,42.3 646.2,49 613.1,81.2 620.9,126.8 580,105.3 539.1,126.8 546.9,81.2 513.8,49 559.6,42.3 " :class="`${4 <= review.rating ? 'gold' : 'transparent'} st0`"></polygon>
                                <polygon  points="751,0.8 771.5,42.3 817.2,49 784.1,81.2 791.9,126.8 751,105.3 710.1,126.8 717.9,81.2 684.8,49 730.6,42.3 " :class="`${5 <= review.rating ? 'gold' : 'transparent'} st0`"></polygon>
                            </svg>

                          </div>
                        </div>
                        <div class="mt-4">{{ review.review_content }}</div>
                        <div class="mt-4 text-right" v-if="$auth.user != null && review.user.id == $auth.user.id">
                          <a href="#" @click.prevent="updateReview" class="text-decoration-none">
                            <em>Change review</em>
                          </a>
                        </div>
                      </div>

                    </div>

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
            <!-- End Tab`s content -->
          </div>
          <!-- /End single product info -->

          <!-- If search is selected  -->
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
          <!-- If search is selected  -->

          <!-- Search pagination  -->
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
          <!-- /Search pagination  -->
        </div>

        <!-- Carousel -->
        <div class="container w-100 my-4 mx-auto">
          <h3 style="text-align: center; margin: 60px 0;">Similar products</h3>
          <div class="w-75 mx-auto owl-carousel custom_one owl-theme">
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
  components: [
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
      /*link: [
        {
          rel: "stylesheet",
          href:
            "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/assets/owl.carousel.min.css"
        },
        {
          rel: "stylesheet",
          href:
            "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/assets/owl.theme.default.min.css"
        },
        {
          rel: "stylesheet",
          href:
            "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/assets/owl.theme.default.min.css"
        },
      ],

      script: [
        {
          src: "https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/owl.carousel.js",
          type: "text/javascript"
        }
      ],*/

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
      properties: [],

      /*===== Meta =====*/
      keywords: '',
      description: '',
      cat_title: '',
      sub_title: '',

      /*===== Images =====*/
      gallery: [],
      preview: '',

      /*== Testimonials ==*/
      testimonials: [],
      rating: 2,
      count_feeds: 0
    }
  },

  mounted() {
    /*Slider script */
    let $owl2 = $('.owl-carousel.custom_one');
    $owl2.owlCarousel({
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
          items: 2,
        },
        1000: {
          items: 3,
          loop: true,
        }
      }
    });

    //let $owl = $('.owl-carousel');
    /*$owl.owlCarousel({
      loop: true,
      margin: 10,
      autoHeight: false,
      /!*autoplay:false,
      autoplayTimeout:3000,
      autoplayHoverPause:true,*!/
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 5,
          loop: false,
        }
      }
    });*/


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

    /*Feedbacks*/
    this.testimonials = this.single_product.rating
    let sum = this.testimonials.reduce((sum, item) => sum + item.rating, 0)
    this.rating = Math.round(sum / this.testimonials.length);
    this.count_feeds = this.testimonials.length


  },

  async asyncData(ctx) {
    let {data} = await ctx.$axios.get(`/api/shop/single/${ctx.route.params.id}`);
    let cat = await ctx.store.getters["categories/categories"]

    /* Gallery */
    let gallery = data.data.gallery ? data.data.gallery.images.data : ''
    let preview = data.data.gallery ? data.data.gallery.images.data[0] : ''
    /* /Gallery */

    /* Meta content */
    let cat_one = cat.find(item => item.id == data.data.category_id) // for meta

    let sub_one;
    if (data.data.sub_category_id != null) {
      sub_one = cat_one['childs'].find(item => item.id == data.data.sub_category_id) // for meta
    } else {
      sub_one = null
    }
    let keywords;
    let description = data.data.description

    if (sub_one != null) {
      keywords = sub_one.keywords  // keywords
      description = data.data.description // description
    } else {
      keywords = cat_one.key_cat  // keywords
      description = data.data.description // description
    }
    /* End Meta content */

    //console.log(cat_one);
    let cat_title = cat_one.title
    let sub_title = sub_one ? sub_one.title : ''
    //console.log(sub_one);

    let properties = data.data.properties.length > 0 ? data.data.properties[0].properties.data : '';
    //console.log(Array.from(data.data.properties));

    return {
      single_product: data.data,
      name_main_content: 'Product',
      categories: cat,
      counts: data.data.sub_count,
      properties: properties ? properties : [],
      description: description,
      keywords: keywords,
      cat_title: cat_title,
      sub_title: sub_title,
      gallery: gallery ? gallery : '',
      preview: preview

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
        this.single_product_qty = this.single_product_qty + 1
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
      // let cartBadge = document.getElementById('cart');
      let authCartBadge = document.getElementById('authCart');

      if (this.totalCount == 0 && !this.$auth.user) {
        authCartBadge.style.display = 'none';
      } else if (!this.$auth.user && this.totalCount > 0) {
        authCartBadge.style.display = 'inline-block';
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
        authCartBadge.innerText = this.totalCount;
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

      $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
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
              items: 1,
            },
            1000: {
              items: 1,
              loop: true,
            }
          }
        })
      })
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
    changePreview(image) {
      let main_photo = document.querySelector('.main_modal_photo')

      //for (let i = 0; i < main_photo.length; i++) {
      main_photo.classList.add('show')
      setTimeout(() => {
        main_photo.classList.remove('show')
      }, 800)
      //}
      this.preview = this.gallery.find(item => item == image);
    },
    updateReview(){

    }
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
#breadcrumbs {
  a {
    color: rgba(0, 0, 0, 0.6);
    font-style: italic;


    &:hover, &:active {
      text-decoration: unset !important;
    }
  }

}

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
  max-width: 300px !important;

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

@keyframes bgchange {
  100% {
    opacity: 1
  }
  0% {
    opacity: 0
  }
}


.show {
  transition: opacity ease-in-out 1s;
  animation: bgchange 1s;
}
.gold{
  fill: #dfbf44;
}
.transparent{
  fill: #fff;
}
</style>
