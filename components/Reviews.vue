<template>
  <div class="mx-auto" style="width: 75%;">
    <div id="rating_review">
      <form id="form_data">
        <div class="form-group ml-auto" style="width: 130px;">
          <svg version="1.1" id="stars" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px" y="0px"
               viewBox="0 0 818 127.5" style="enable-background:new 0 0 818 127.5;" xml:space="preserve"
               @click="selectStar">
        <style type="text/css">
          .st0 {
            fill: none;
            stroke: #e90808;
            stroke-width: 2.5;
            stroke-miterlimit: 10;
            cursor: pointer;
            fill: #fff;
          }
        </style>
            <polygon class="st0"
                     points="67,0.8 87.5,42.3 133.2,49 100.1,81.2 107.9,126.8 67,105.3 26.1,126.8 33.9,81.2 0.8,49 46.6,42.3 "/>
            <polygon class="st0"
                     points="238,0.8 258.5,42.3 304.2,49 271.1,81.2 278.9,126.8 238,105.3 197.1,126.8 204.9,81.2 171.8,49 217.6,42.3 "/>
            <polygon class="st0"
                     points="409,0.8 429.5,42.3 475.2,49 442.1,81.2 449.9,126.8 409,105.3 368.1,126.8 375.9,81.2 342.8,49 388.6,42.3 "/>
            <polygon class="st0"
                     points="580,0.8 600.5,42.3 646.2,49 613.1,81.2 620.9,126.8 580,105.3 539.1,126.8 546.9,81.2 513.8,49 559.6,42.3 "/>
            <polygon class="st0"
                     points="751,0.8 771.5,42.3 817.2,49 784.1,81.2 791.9,126.8 751,105.3 710.1,126.8 717.9,81.2 684.8,49 730.6,42.3 "/>
        </svg>
        </div>

       <div v-if="$route.path == '/profile/feedback'">
         <div class="form-group" >
           <label for="first_name"> {{ 'Your name' }}</label>
           <input type="text" class="form-control" id="first_name" v-model="first_name">
         </div>
         <div class="form-group">
           <label for="email"> {{ 'Your E-mail' }}</label>
           <input type="email" class="form-control" id="email" v-model="email">
         </div>
       </div>
        <div class="form-group mb-5">
          <label for="content" class="text-left"> {{ 'Review' }}</label>
          <textarea id="content" cols="30" rows="10" class="form-control" v-model="content"></textarea>
        </div>
        <button class="btn btn-outline-primary my-3" id="sendForm" type="button" @click="submitForm">Leave review</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product_id: {
      type: Number,
    },
  },
  data() {
    return {
      send: false,
      first_name: '',
      email: '',
      content: '',
      rating: 0

    }
  },
  mounted() {
    //sendForm.setAttribute('disabled', 'disabled');
  },
  methods: {
    selectStar(e) {
      const stars = document.querySelectorAll('#stars polygon');
      let ind = Array.from(stars).indexOf(e.path[0])

      for (let j = 0; j < stars.length; j++) {
        if(ind != -1){
          stars[j].classList.remove('gold')
          this.rating = 0
        }
      }

      for (let i = 0; i <= ind; i++) {
          stars[i].classList.add('gold')
          this.rating = i + 1
      }



    },
    async submitForm(e) {
      console.log(this.product_id);
    //  sendForm.removeAttribute('disabled')
      const stars = document.querySelectorAll('#stars polygon');
      let data = new FormData();
      data.append('user_id', this.$auth.user.id)
      data.append('product_id', this.product_id)
      data.append('name', this.$auth.user.name)
      data.append('email', this.$auth.user.email)
      data.append('review_content', this.content)
      data.append('rating', this.rating)


      if(this.rating != 0 && this.content != ''){
        await this.$axios.post(`${this.$axios.defaults.baseURL}/api/shop/feedback/product-feedback`, data)
            .then(res => {
              console.log(res);
              this.$router.push('/profile/orders-detail')
             // this.first_name = ''
             // this.email = ''
              this.content = ''
              for (let j = 0; j < stars.length; j++) {
                stars[j].classList.remove('gold')
                this.rating = 0
              }
            })
      }else{
          alert('Rate the order, please OR all fields must be not empty!');
      }


    }
  }
}
</script>

<style lang="scss" scoped>
.gold {
  fill: gold;
}

.st0 {

}
</style>
