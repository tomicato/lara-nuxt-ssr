<template>
  <div class="container pt-5" id="main">
    <div class="row">
      <div class="col-md-12 col-lg-8 col-xl-9  columns">
        <h3 class="card-title font-weight-normal">Выбранные товары</h3>
        <hr/>
        <br/>

        <!-- Test  -->
        <!--          <ul class="list-group">
            <li class="list-group-item"
                v-for="(item, i) in numbers"
                @click="onDouble(i)"
            >
              {{ i }} | {{ item }}
            </li>
          </ul>-->
        <!-- /Test  -->

        <div class="card mb-5" id="card" style="max-width: 100%" v-if="items" v-for="(product, ind) in items"
             :key="ind">
          <div class="row">
            <div class="col-md-4 image-block">
              <img :src="`${$axios.defaults.baseURL}/uploads/${product.item.photo}`" class="card-img" alt="">
            </div>

            <div class="col-md-8">
              <div class="card-body">
                <nuxt-link :to="`/shop/products/${product.item.id}`"><h5 class="card-title font-weight-normal">
                  {{ product.item.name }}</h5>
                </nuxt-link>
                <hr/>
                <!--                <p class="card-text">{{ product.item.description }}</p>-->
                <div class="card-text d-flex justify-content-between align-items-center py-3">
                  <div class="font-weight-bold text-danger d-flex flex-column justify-content-center">
                    <span class="text-muted" style="padding-left: 5px;text-decoration: line-through;"
                          v-if="product.item.old_price">
                      {{ divideNumberByPieces(product.item.old_price, ' ') }} ₽</span>
                    <mark v-if="product.item.price">{{ divideNumberByPieces(product.item.price, ' ') }} ₽</mark>
                  </div>
                  <div class="card-text d-flex justify-content-center align-items-center">
                    <small v-if="product.item.on_stock == 1" class="badge badge-primary ">{{ 'In stock' }}</small>
                    <small v-else class="badge badge-info ">{{ 'Absent' }}</small>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex justify-content-between align-items-center">
                    <button class="btn-outline-info form-control w-25" v-if="product.qty <= 1" disabled>-</button>
                    <button class="btn-outline-info form-control w-25" v-else
                            @click.prevent="minus(product.qty, product.id)">-
                    </button>

                    <input type="number" class="form-control text-center mx-1" id="countAdd"
                           :value="product.qty <= 0 ? 1 : product.qty"
                           @input.number.trim="inputQty($event.target.value, product.qty, product.id)"/>

                    <button class="btn-outline-success form-control w-25 mr-2"
                            @click.prevent="plus(product.qty, product.id)">+
                    </button>
                  </div>
                  <button class="form-control w-25 btn-outline-danger"
                          @click.prevent="deleteItem(product.qty, product.id)">Delete
                  </button>
                </div>
                <div class="d-flex justify-content-between align-items-center py-5">
                  <div class="">Some option</div>
                  <div class="">Rating</div>
                  <div class="">Another option</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template>
          <div v-if="visible == true" class="show">
            <ValidationObserver v-slot="{ valid }">
              <form class="w-50 m-auto mt-5" @submit.prevent="doAction()">
                <label for="shipping_name" class="form-group w-100">Full name *
                  <ValidationProvider rules="alpha_spaces" v-slot="{ errors }">
                    <input type="text" name="" id="shipping_name" v-model="shipping_name" class="mt-2 form-control">
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </label>
                <label for="shipping_email" class="form-group w-100">Email *
                  <ValidationProvider rules="email" v-slot="{ errors }">
                    <input type="email" name="" id="shipping_email" v-model="shipping_email" class="mt-2 form-control">
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </label>
                <label for="shipping_address" class="form-group w-100">Address *
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input type="text" name="" id="shipping_address" v-model="shipping_address"
                           class="mt-2 form-control">
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </label>
                <label for="shipping_phone" class="form-group w-100">Phone *
                  <!--                <ValidationProvider rules="required|numeric|max:11" v-slot="{ errors }">-->
                  <ValidationProvider :rules="{ required: true, regex: /^\+\d{11}$/ }" v-slot="{ errors }">
                    <input type="text" name="" id="shipping_phone" v-model="shipping_phone" placeholder="+79138634398"
                           class="mt-2 form-control">
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </label>
                <button type="submit" id="ordering" class="btn btn-outline-secondary show" v-if="valid">
                  Продолжить оформление
                </button>
              </form>
            </ValidationObserver>
          </div>
        </template>

      </div>

      <!--Checkout-->
      <div class="col-md-12 col-lg-4 col-xl-3  columns">
        <h3 class="card-title  font-weight-normal">Оформление</h3>
        <hr/>
        <br/>
        <div class="card mb-3" style="max-width: 100%">
          <div class="col-md-12">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center py-3">
                <h5>Count products: </h5>
                <h5>
                  <mark>{{ productsCount }}</mark>
                </h5>
              </div>
              <hr/>
              <div class="d-flex justify-content-between align-items-center py-3">
                <h5>Total count: </h5>
                <h5>
                  <mark>{{ totalCount }}</mark>
                </h5>
              </div>
              <hr/>
              <div class="d-flex justify-content-between align-items-center py-3">
                <h5>Total sum: </h5>
                <h5>
                  <mark> {{ divideNumberByPieces(totalSum, ' ') }} ₽</mark>
                </h5>
              </div>
              <hr/>
            </div>
            <b-button variant="outline-primary"
                      @click.prevent="checkoutOrder"
                      class="d-flex justify-content-center align-items-center w-100 mt-3 mb-4">Checkout
            </b-button>
            <div class="w-100 m-auto mb-5">
              <div id="smart-button-container" class="show">
                <div style="" id="paypal-button-container"></div>
              </div>
            </div>
            <b-button variant="outline-danger" @click.prevent="clearCart"
                      class="d-flex justify-content-center align-items-center w-100 mb-4 clear">Clear Cart
            </b-button>

          </div>
        </div>
      </div>
    </div>
    <!-- End Row -->
    <hr/>

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

</template>


<script>
import _ from "lodash";
import {ValidationProvider} from "vee-validate";
import {ValidationObserver} from "vee-validate";

export default {

  components: {
    ValidationProvider,
    ValidationObserver
  },

  head() {
    return {
      title: 'Shop | Cart',
      script: [
        {
          src: 'https://www.paypal.com/sdk/js?client-id=AboxwD8MRUfyIzfDHIkxgB2sN2PrC4D47bhyhSjE2mTqSX1QyrcMITQHtVkfx8i0_hUfyG_IDE8_LjKo',
          body: true,
        },

      ],
    }
  },

  data() {
    return {
      //numbers: [1.5, 2.5],
      visible: false,
      val: 1,
      items: [],
      products: [],
      cart: [],
      keys: [],
      countProduct: 4,

      currentPage: 1,
      perPage: 3,
      pageCount: 1,
      itemsAll: [],

      totalSum: 0,
      productsCount: 0,
      totalCount: 0,

      arrTotal: [],
      cartToServer: [],
      baseurl: '',

      /* Shipping data*/
      shipping_name: this.$auth.loggedIn == true ? this.$auth.user.name : '',
      shipping_email: this.$auth.loggedIn == true ? this.$auth.user.email : '',
      shipping_address: '',
      shipping_phone: '',
      shipping_phone2: ''
    }
  },

  mounted() {
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + "//" + getUrl.host;
    this.baseurl = baseUrl

    let item_arr = []
    let arr = [];
    let tmp = [];
    let tmpCartServer = [];

    this.keys = this.getSession()
    for (let i = 0; i < this.keys.length; i++) {
      arr.push(JSON.parse(localStorage.getItem(this.keys[i])))
    }

    // Кол-во продуктов в корзине, в Local Storage (нужнен параметр для дальнейших расчетов)
    this.arrTotal = arr;

    for (let i = 0; i < arr.length; i++) {
      tmp.push(arr[i].qty)

      let obj = {
        id: arr[i].id,
        qty: arr[i].qty,
        price: arr[i].item.price,
        sum: arr[i].item.price * arr[i].qty
      }

      item_arr.push(obj)

      let obj2 = {
        name: arr[i].item.name,
        sku: arr[i].item.cku,
        quantity: arr[i].qty,
        price: arr[i].item.price,
      }
      tmpCartServer.push(obj2)
    }
    this.cartToServer = tmpCartServer


    let sum_arr = [];
    for (let i = 0; i < item_arr.length; i++) {
      sum_arr.push(item_arr[i].sum)
    }

    this.totalSum = sum_arr.reduce((sum, current) => sum + current, 0);
    this.totalCount = tmp.reduce((sum, current) => sum + current, 0);
    this.products = arr;
    this.productsCount = arr.length
    this.countProductInCart()

    this.itemsAll = _.chunk(this.products, this.perPage)
    this.pageCount = _.size(this.itemsAll)
    this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]

  },

  computed: {
    rows() {
      return this.products.length > 0 ? this.products.length : 0
    },
  },

  methods: {
    doAction(){
      let elm = document.getElementById('paypal-button-container')
      let ordering = document.getElementById('ordering')
      ordering.style.display = 'none'
      let cl_btn = document.querySelector('.clear')
      cl_btn.classList.add('clear_cart')

      if (elm.firstChild == null) {
        this.loadPaypalButton()
        elm.style.height = '80px'
        elm.style.margin = '8px auto'
      } else {
        elm.style.height = 'unset!important'
        elm.style.margin = 'unset!important'
      }


    },
    onDouble(i) {
      //console.log(i);
      //this.numbers[i] *= 2 // vue 3.*
      //this.$set(this.numbers, i, this.numbers[i] * 2) // vue 2.*
    },
    checkoutOrder() {
      this.visible = true
      //  && paypal
    },

    recalculateCart() {
      let arr = [];
      this.keys = this.getSession()
      for (let i = 0; i < this.keys.length; i++) {
        arr.push(JSON.parse(localStorage.getItem(this.keys[i])))
      }

      let tmpCartServer = [];
      for (let i = 0; i < arr.length; i++) {
        let obj2 = {
          name: arr[i].item.name,
          sku: arr[i].item.cku,
          quantity: arr[i].qty,
          price: arr[i].item.price,
        }
        tmpCartServer.push(obj2)
      }
      this.cartToServer = tmpCartServer
      return this.cartToServer
    },

    loadPaypalButton() {
      let vm = this;
      //console.log(this.shipping_name);
      return paypal.Buttons({
        createOrder: async function () {
          return await fetch('https://com-helps.online/api/paypal/create-paypal-transaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              cartToServer: vm.recalculateCart(),
              sum: vm.totalSum,
            })
          }).then(function (res) {
            //console.log(res);
            return res.json();
          }).then(function (data) {
            // console.log(data.result.id);
            return data.result.id; // Use the key sent by your server's response, ex. 'id' or 'token'
          });
        },
        onApprove: async function (data) {
          //console.log(vm.$auth.user.id);
          return await fetch('https://com-helps.online/api/paypal/capture-paypal-transaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              orderID: data.orderID,
              shipping_name: vm.shipping_name,
              shipping_email: vm.shipping_email,
              shipping_address: vm.shipping_address,
              shipping_phone: vm.shipping_phone,
              user_id: vm.$auth.loggedIn == true ? vm.$auth.user.id : '',
              quantity: vm.productsCount,
            })
          }).then((res) => {
            vm.clearCart()
            return res;
          })
        },
      }).render('#paypal-button-container');
    },

    async changeHandler(page) {
      // await this.$router.push(`${this.$route.path}?page=${page}`) // Отображение в  адресной строке маршрута
      this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
    },

    divideNumberByPieces(x, delimiter) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
      }
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
      //let cartBadge = document.getElementById('cart');
      let authCartBadge = document.getElementById('authCart');

      if (this.totalCount == 0 && !this.$auth.user) {
        authCartBadge.style.display = 'none';
      } else if (!this.$auth.user && this.totalCount > 0) {
        authCartBadge.style.display = 'inline-block';
        authCartBadge.innerText = this.totalCount;
      }
      if (this.$auth.user && this.totalCount == 0) {
        authCartBadge.style.display = 'none';
      } else if (this.$auth.user && this.totalCount > 0) {
        authCartBadge.style.display = 'inline-block';
        authCartBadge.innerText = this.totalCount;
      }
    },

    minus(qty, id) {
      let obj = this.arrTotal.filter(item => item.id == id)
      obj[0].qty = obj[0].qty - 1;

      if (obj[0].qty < 1) {
        obj[0].qty = 1;
        return this;
      } else {
        localStorage.setItem('cartP-' + id, JSON.stringify(obj[0]))
        this.totalCount--
        this.totalSum = this.totalSum - obj[0].item.price
        this.countProductInCart()
      }
      return this.arrTotal
    },

    inputQty(newVal, qty, id) {
      /*console.log(val);
      console.log(qty + ' '+ id);*/

      if (newVal < 1) {
        newVal = qty
      }
      let obj = this.arrTotal.filter(item => item.id == id)
      this.totalCount = this.totalCount - obj[0].qty
      this.totalSum = this.totalSum - (obj[0].item.price * qty)
      this.totalSum = (+newVal * obj[0].item.price) + this.totalSum
      obj[0].qty = +newVal;
      this.totalCount = +newVal + this.totalCount

      localStorage.setItem('cartP-' + id, JSON.stringify(obj[0]))
      this.countProductInCart()
    },

    plus(qty, id) {
      let obj = this.arrTotal.filter(item => item.id == id)
      obj[0].qty = obj[0].qty + 1;
      localStorage.setItem('cartP-' + id, JSON.stringify(obj[0]))
      this.totalCount++
      this.totalSum = this.totalSum + obj[0].item.price
      this.countProductInCart()
      return this.arrTotal
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

    async clearCart() {
      await localStorage.clear();
      this.items = []
      this.totalCount = 0
      this.productsCount = 0
      this.totalSum = 0
      this.countProductInCart()
      this.products = []
      this.shipping_name = ''
      this.shipping_email = ''
      this.shipping_address = ''
      this.shipping_phone = ''
      await this.$router.push('/shop')
    },

  },

};
</script>

<style lang="scss" scoped>
#countAdd {
  iframe {
    display: block !important;
  }

  width: 30%;
}

.t-4 {
  margin-top: 4rem;
}

.flx-c {
  display: flex;
  justify-content: center;
  align-items: center;
}

#main {
  max-width: 1420px;
}

.badge-info, .badge-primary {
  padding: 6px 18px;
}

.card-body {
  a {
    text-decoration: none;
    color: crimson;
  }

  mark {
    font-size: 22px;
  }
}

.columns {
  h3 {
    text-align: center;
  }

  ul {
    list-style-type: none;

    li {
      padding: 10px 0;
      text-transform: uppercase;
    }

    li a:hover {
      text-decoration: none;
    }
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

}

.card {
  transition: all ease-in-out .4s;
}

.card:hover {
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.10), 2px 4px 6px rgba(0, 0, 0, 0.10);
}

.badge-primary {
  background: #5daafc;
  //background: #e74a6b;
}

.clear_cart {
  margin: 90px 0 20px 0;
}
</style>
