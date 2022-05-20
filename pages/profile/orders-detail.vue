<template>
  <div class="d-flex flex-column justify-content-between">
    <div class="my-5 container" id="main">
      <div class="row mb-5">
        <div class="col-md-3 mb-5">
          <h3 class="mb-5">Sidebar</h3>
          <div class="d-flex flex-column  justify-content-between" id="left_menu">
            <nuxt-link to="/profile">Profile</nuxt-link>
            <nuxt-link to="/profile/orders-detail">Orders</nuxt-link>
            <nuxt-link to="/profile/feedback">Feedback</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="#">Some Link</nuxt-link>
            <nuxt-link to="/profile/settings">Settings</nuxt-link>
          </div>
        </div>
        <div class="col-md-9 mb-5" id="grid_tag">
          <h3 class="mb-5 text-center">{{ 'Order`s detail' }}</h3>
          <div v-for="(el, m) in items" :key="m">

            <div class="d-flex justify-content-between align-items-start mb-5 mx-4">
              <div class="text-primary font-italic font-weight-normal"> {{
                  'Order from: ' + (new Date(el[0].datetime_purchase)).getDate() + ' ' + months[(new Date(el[0].datetime_purchase)).getMonth()] + ' ' + (new Date(el[0].datetime_purchase)).getFullYear()
                }}
              </div>
             <div class="d-flex justify-content-between align-items-center">
               <div style="color: #2ba02d" class="mr-5">{{ el[0].status }}</div>
               <em>
                 <a href="#" @click.prevent="deleteOrderItem(el[0].orders_id)" class="text-decoration-none">
                   {{ 'Delete' }}
                 </a>
               </em>
             </div>
            </div>


            <div v-for="(item, i) in items[m]" :key="i" class="order_wrap mb-5">
              <div class="card mb-3" style="width: 100%;">
                <div class="row">
                  <div class="col-md-4 mx-auto w-75 text-center">
                    <img :src="`${$axios.defaults.baseURL}/uploads/${item.product_photo}`"
                         class="img-fluid" :alt="item.product_name" width="150">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <nuxt-link :to="`/shop/products/${item.product_id}`" ><h5 class="card-title">
                        {{ item.product_name }}</h5></nuxt-link>
                      <div class="d-flex justify-content-between">
                        <h5 class="card-text"><small class="text-muted">{{
                            item.product_qty + ' pc.' + ' x ' + (new Intl.NumberFormat("ru")).format(item.product_price) + ' ₱'
                          }}</small></h5>
                        <div class="d-flex flex-column justify-content-between">
                          <h5 class="card-text">{{
                              (new Intl.NumberFormat("ru")).format(item.product_price * item.product_qty) + ' ₱'
                            }}</h5>
                        </div>
                      </div>
                      <p class="card-text  d-flex justify-content-start">
                        <small class="text-muted">{{ 'CKU: ' + item.sku }}</small>
                      </p>
                      <div class="d-flex justify-content-between">

                        <nuxt-link :to="`/profile/feedback/${item.product_id}`" id="link_feedback"
                                   v-if="!valid(item.product_id)">
                          <p class="card-blue d-flex align-items-center">
                            {{ 'leave a review' }}
                            <span class="material-icons ml-5">interpreter_mode</span>
                          </p>
                        </nuxt-link>
                        <em v-if="valid(item.product_id)">{{ 'Your review has already been left.' }}</em>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <b-pagination
            class="t-4 flx-c mb-5 ml-auto"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            pills
            @change="changeHandler"
            variant="outline-primary"
        ></b-pagination>
      </div>

    </div>

    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  middleware: ['auth'],
 // name: "orders-detail",
  head() {
    return {
      title: 'Office | ' + this.$auth.user.name
    }
  },
  data() {
    return {
      is_isset: false,

      /*Paginate lodash*/
      currentPage: 1,
      perPage: 3,
      pageCount: 1,
      itemsAll: [],
      items: [],

      data: [],
      group: [],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      feedbacks: []
    }
  },

  mounted() {
    let order_details = this.$axios.$post(`${this.$axios.defaults.baseURL}/api/shop/order-details/${this.$auth.user.id}`)
        .then(res => {
          this.data = res.data
          let group = this.data.reduce((prev, next) => {
            prev[next.datetime_purchase] = prev[next.datetime_purchase] || []
            prev[next.datetime_purchase].push(next)
            return prev
          }, {})

          let arr = []
          for (let k in group) {
            arr.push(group[k])
          }
          this.group = arr
          // console.log(this.group);
          this.itemsAll = _.chunk(this.group, this.perPage)
          this.pageCount = _.size(this.itemsAll)
          this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]
          /*let d = new Date(arr[0][0].datetime_purchase);
          console.log(d.getDate() + ' ' + this.months[d.getMonth()] + ' ' + d.getFullYear());*/
        })

    /*Feedback*/
    this.getFeedbacks();
    //console.log(this.feedbacks);
  },

  computed: {
    rows() {
      return this.group.length > 0 ? this.group.length : 0
    },

  },
  methods: {
    async getFeedbacks(){
     let prom = await this.$axios.$get(`${this.$axios.defaults.baseURL}/api/shop/feedback/get-feedbacks/${this.$auth.user.id}`)
          .then(response => {
            return response.data
          })
       this.feedbacks = prom;
    },
    valid(id){
     // this.is_isset = true
      for (let i = 0; i < this.feedbacks.length; i++) {
        if(this.feedbacks[i].product_id == id){
          //console.log(id);
          return true
        }
      }

      /*let f = this.feedbacks.forEach(inst => inst.product_id != id)
      console.log(f);*/
    },
    async changeHandler(page) {
      //await this.$router.push(`${this.$route.path}?page=${page}`) // Отображение в  адресной строке маршрута
      this.items = await this.itemsAll[page - 1] || this.itemsAll[0]

      /*Animate*/
      let grid_tag = document.getElementById('grid_tag')
      grid_tag.classList.add('grid_tag_animate')

      setTimeout(() => {
        grid_tag.classList.remove('grid_tag_animate')
      }, 1000)
    },
    async deleteOrderItem(orders_id) {
      await this.$axios.$post(`${this.$axios.defaults.baseURL}/api/shop/orders/${orders_id}`, {_method: "DELETE"})
        .then(res => {
          //console.log(res);
          //this.$router.push('/profile/orders-detail')
          window.location.reload(true)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#link_feedback {
  color: #2a8df8;
}

.order_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.count_price {
  align-items: flex-end;
}

#left_menu {
  border-right: 1px solid #ccc;

  a {
    margin: 10px 0;
    text-transform: uppercase;

    &:hover {
      text-decoration: none;
    }
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

</style>

