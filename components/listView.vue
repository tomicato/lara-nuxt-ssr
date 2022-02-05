<template>
  <div>
    <modal-window v-if="open"
                  id="modalComponent"
                  btnTitle="Add To Cart"
                  :modalTitle="product.name"
                  @addFromModal="addToCart(product)"
                  @closePopupWindow="closeModal">
      <img :src="`${$axios.defaults.baseURL}/uploads/${product.photo}`"
           class="img-fluid" :alt="product.name">
    </modal-window>
    <div class="row no-gutters">
      <div class="col-md-4 image-block py-4">

        <img :src="`${$axios.defaults.baseURL}/uploads/${product.photo}`"
             class="card-img"
             :alt="product.name"
             @click.prevent="openModal"
        >
        <div class="card-text d-flex justify-content-between align-items-center my-4 mx-4">
          <small v-if="product.on_stock == 1" class="badge badge-primary-scope">{{ 'In stock' }}</small>
          <small v-else class="badge badge-secondary-scope">{{ 'Absent' }}</small>

          <nuxt-link to="#" title="Leave Feedback" v-if="product.rating !== null" style="text-decoration: none">
            <small class="d-flex justify-content-around align-items-center">
              <i class="material-icons"  style="color: crimson">star_rate</i>&nbsp;

              <span>{{ product.rating }}</span>
            </small>
          </nuxt-link>
          <nuxt-link to="#" title="Leave Feedback" v-else style="text-decoration: none">
            <small class="d-flex justify-content-around align-items-center">
              <i class="material-icons" style="color: #ccc">star_border</i>&nbsp;
              <span>{{ product.rating }}</span>
            </small>
          </nuxt-link>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <nuxt-link :to="`/shop/products/${product.id}`"><h5 class="card-title">{{ product.name }}</h5></nuxt-link>
            <small>SKU: {{ product.cku }}</small>
          </div>
          <hr/>
          <p class="card-text">{{ product.description.substr(0, 255) + '...'}}</p>

          <div class="card-text d-flex justify-content-between align-items-end">

            <div class="font-weight-bold text-danger d-flex flex-column justify-content-center">
                    <span class="text-muted" v-if="product.old_price"
                          style="padding-left: 5px;text-decoration: line-through;">{{
                        divideNumberByPieces(product.old_price, ' ')
                      }} ₽</span>
              <mark>{{ divideNumberByPieces(product.price, ' ') }} ₽</mark>

            </div>
            <b-button @click.prevent="addToCart(product)" variant="outline-primary"
                      class="d-flex justify-content-center align-items-end place_to_cart">Place to cart
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalWindow from "@/components/modalWindow";

export default {
  name: "listView",
  components: {
    modalWindow
  },
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      open: false,
      products: [],
      cart: [],
      keys: [],
      totalCount: 0
    }
  },
  mounted() {
    //this.total
    this.total()
  },

  computed: {
    /*total() {
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
      console.log(total_count);
      this.countProductInCart()
      return total_count
    }*/
  },

  methods: {

    openModal() {
      this.open = true
      let main = document.getElementById('main')
      main.classList.remove('show');
      /* main.style.transition = 'unset'
       main.style.transitionDuration = 'unset'
       main.style.transitionProperty = 'unset'
       main.style.transitionDelay = 'unset'*/
    },

    closeModal() {
      let main = document.getElementById('main')
      main.classList.add('show');
      main.style.opacity = 1;
      this.open = false
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

    divideNumberByPieces(x, delimiter) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
    },

    grid(args){
      console.log(args);
    }

  }
}
</script>

<style lang="scss">

.place_to_cart{
    outline: unset!important;
    box-shadow: unset!important;
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

#modalComponent {
  img {
    max-width: 50%;
    height: auto;
    padding: 20px;
    z-index: 12;
  }
}

@media screen and (max-width: 1024px) {
  #modalComponent {
    img {
      max-width: 100%;
      height: auto;
      padding: 20px;
      z-index: 12;
    }
  }
}

#main {
  max-width: 1280px;
}

.badge-secondary-scope{
  padding: 6px 18px;
  /*background: #b3b3c0;*/
  color: #b3b3c0;
  border: 1px solid #b3b3c0;
}

.badge-primary-scope{
  padding: 6px 18px;
  /*background: #007bff;
  color:#fff;*/
  color: #007bff;
  border: 1px solid #007bff;
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
    max-width: 170px;
    padding: 10px;
    margin: 0 auto;
  }

  .card .image-block {
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      cursor: zoom-in;
    }
  }

}

.card {
  transition: all ease-in-out .4s;
}

.card:hover {
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.10), 2px 4px 6px rgba(0, 0, 0, 0.10);
}

.badge-primary {
 // background: #5daafc;
  //background: #e74a6b;
}


</style>
