<template>
    <div id="navigation">
      <div class="navigation" v-for="(category, ind) in categories" :key="category.id"
           @click.prevent="showChilds(category)">

        <a href="#" class="text-muted"
           @click.prevent="category.childs == '' ? goToSubCategory(category, '') : null">
          {{ category.title }}
        </a>

        <div class="childItem hide" :id="`show-${category.id}`">
          <div v-for="(item, i) in category.childs" :key="i">
            <a href="#" @click.prevent="goToSubCategory(category, item)">
              {{ item.title }}
              <span v-for="(cnt, k) in counts" :key="k">
                        {{ Object.keys(cnt)[0] == item.title ?  `(${Object.values(cnt)[0]})` : '' }}
                    </span>
            </a>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  export default {
    name: "Categories",
    props: {
      categories: [],
      counts: [],
      flag: false
    },
    data(){
        return {

        }
    },
    methods: {
      async goToSubCategory(category, sub_category) {
        this.str = ''
        const cat_id = category.id
        const sub_id = sub_category.id

       // await this.$store.dispatch('products/getCatProducts', {cat_id, sub_id})
         /* .then(res => {
            if (res.data == '') return;
            this.total = res.meta.total
            this.current = res.meta.current_page
            this.per_page = res.meta.per_page
            this.data_total = res.data

            let price = this.data_total.map(item => item.price)
            this.max = Math.max.apply(Math, price)
          })*/

        await this.$router.push(`/shop/categories/${cat_id}/${sub_id ? sub_id : ''}`);

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
    }
  }
</script>


<style lang="scss" scoped>
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

.show {
  display: block;
}

.hide {
  display: none;
  opacity: 0;
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
