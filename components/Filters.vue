<template>
  <div>
    <form action="" ref="form">
      <div class="filter-component" v-for="(filter, k) in repeatElInArr" :key="k">
        <!-- Title Filter -->
        <div @click="showBlock($event, k)" class="show_filter my-4 ">


          <!--<div class="material-icons down">keyboard_arrow_down</div>-->
          <div class="text-muted">{{ filter.group_title.toUpperCase() }}</div>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" :id="'arrow_down_' + k"
               style="transition: all ease-in-out .5s;" width="24px" fill="#000000">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        <!-- Storage  -->
        <div class="form-group my-3 filtes_block" style="transition: all ease-in-out .5s;"
             :class="{hide: isActive, show: isHide}">
          <label class="text-uppercase flx-btw">{{ filter.filter_value }}&nbsp;<span class="dots"></span>&nbsp;
            <input v-if="filter.type_field == 'radio'" type="radio" :id="filter.filter_title"
                   :name="filter.filter_title"
                   :value="filter.filter_value" @click="getData($event, filter.filter_title, filter.filter_value)">
            <input v-if="filter.type_field == 'checkbox'" type="checkbox" :id="filter.filter_title"
                   :name="filter.filter_title" :value="filter.filter_value"
                   @click="getData($event, filter.filter_title, filter.filter_value)">
            <!-- v-model="checkbox"-->
          </label>
        </div>
      </div>

      <div v-if="repArr">
        <div class="filter-component" v-for="(items, i) in repArr" :key="i">
          <div @click.stop.prevent="showBlockRepeated($event, i, items[0].group_title)" class="show_filter my-4">
            <div class="text-muted"> {{ items[0].group_title.toUpperCase() }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" :id="'arrow_down__' + i"
                 style="transition: all ease-in-out .5s;" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 10l5 5 5-5z"/>
            </svg>
            <!--  <span class="material-icons down">keyboard_arrow_down</span>-->
          </div>

          <div class="filtes_block2" style="transition: all ease-in-out .5s;" :class="{hide: isActive2, show: isHide2}">
            <div v-for="(item, j) in items" :key="j">
              <!-- Storage  -->
              <div class="form-group my-3">
                <label class="text-uppercase flx-btw">{{ item.filter_value }}&nbsp;
                  <span class="dots"></span>&nbsp;
                  <input v-if="item.type_field == 'radio'" type="radio" :id="item.filter_title" :name="item.group_title"
                         :value="item.filter_value" @click="getData($event, item.filter_title, item.filter_value)">
                  <input v-if="item.type_field == 'checkbox'" type="checkbox" :id="item.filter_title"
                         :name="item.group_title" :value="item.filter_value"
                         @click="getData($event, item.filter_title, item.filter_value)">

                </label>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div id="buttons" class="my-5">
        <button class="btn btn-outline-primary" @click.prevent="getFiltersValues(filters)">
          Filter Products
        </button>
        <button class="btn btn-outline-success" @click.prevent="reset">
          Reset Filter
        </button>
      </div>
    </form>
  </div>
</template>

<script>
//import _ from "lodash";

export default {
  name: "Filters",
  data() {
    return {
      isCat: false,
      isSub: false,
      data: [],
      radio: null,

      // Show - Hide filters
      isActive: true,
      isHide: false,
      isActive2: true,
      isHide2: false,

      // Helpers
      title: '',
      titles: [],
      el: [],
      checked: 'checked',

      notRepArr: [],
      repeatElInArr: [],
      repArr: []
    }
  },

  props: {
    filters: [],
    catId: null,
    subId: null,
    common: []
  },

  mounted() {
    this.sortTitle()
    this.filterArrays()
    //console.log(this.filters.filter(item => item.common == '1'));
  },

  methods: {
    filterArrays() {
      let f = this.filters; // массив всех фильтров
      let elmRep = this.el; // массив повторяющихся елементов
      let repEl = []

      let repeatElInArr = f.map(function (item, i) {
        if (elmRep.indexOf(item.group_title) == -1) {
          return item
        } else {
          repEl.push(item)
        }
      });

      let map = repEl.reduce((r, i) => {
        //console.log(r);
        r[i.group_title] = r[i.group_title] || [];
        r[i.group_title].push(i);
        return r;
      }, {});

      let arr = [];
      for (let key in map) {
        arr.push(map[key]);
      }
      this.repArr = arr
      repeatElInArr = repeatElInArr.filter(item => item != undefined);
      this.repeatElInArr = repeatElInArr
      //let repeatElInArr = f.map((item, i) =>  {return elmRep.indexOf(item.group_title) != -1 ? item : null});

    },

    showBlock(e, k) {
      let elems = document.getElementsByClassName('filtes_block')[k];
      let arrow_down = document.getElementById('arrow_down_' + k);

      if (elems.classList.contains('show')) {
        arrow_down.classList.remove('rotate_up');
        elems.classList.remove('show');
        elems.classList.add('hide');
      } else {
        arrow_down.classList.add('rotate_up');
        elems.classList.add('show');
        elems.classList.remove('hide');
      }
    },

    showBlockRepeated(e, j) {
      let elems = document.getElementsByClassName('filtes_block2')[j];
      let arrow_down = document.getElementById("arrow_down__" + j);
      //console.log(arrow_down);
      if (elems.classList.contains('show')) {
        arrow_down.classList.remove('rotate_up');
        elems.classList.remove('show');
        elems.classList.add('hide');
      } else {
        arrow_down.classList.add('rotate_up');
        elems.classList.add('show');
        elems.classList.remove('hide');
      }
    },

    commonFilter() {
      // console.log(this.subId);
      /*  if(this.subId == undefined){
          let name = this.filters.find(item => item.cat_id == this.catId);
          //console.log(this.filters.filter(item => item.category_id == this.catId));
          this.filters =  this.filters.filter(item => item.category_id == this.catId);
        }else{
          //console.log(this.filters.filter(item => item.sub_id == this.subId));
          this.filters = this.filters.filter(item => item.sub_id == this.subId);
        }*/
    },

    getData(e, name, val) {

      if(e.target.type == 'checkbox'){

        e.target.hasAttribute('checked', 'checked')
          ? e.target.removeAttribute('checked', 'checked')
          : e.target.setAttribute('checked', 'checked')

        if (e.target.hasAttribute('checked', 'checked')) {
          if (this.data.indexOf(e.target.id + ':' + e.target.value) != -1) {
            return this.data
          } else {
            this.data.push(e.target.id + ': ' + e.target.value)
          }
        } else {
          this.data = []
          this.$root.$emit('reload');
          if (this.data.indexOf(e.target.id + ':' + e.target.value) != -1) {
            this.data.splice(this.data.indexOf(e.target.id + ':' + e.target.value), 1)

          }
        }
      }

      /*===== Radio ====*/
      let radioArr = document.querySelectorAll('[type="radio"]');
      let arr = Array.from(radioArr)

      if(e.target.type == 'radio'){
        this.data.push(e.target.id + ': ' + e.target.value)
        for (let i = 0; i < arr.length; i++) {
          if(arr[i].checked == true){
            this.data.splice(this.data.lastIndexOf(arr[i].id + ': ' + arr[i].value), 1)
            this.data.push(arr[i].id + ': ' + arr[i].value)
          }else{
            if (this.data.indexOf(arr[i].id + ': ' + arr[i].value) != -1) {
              this.data.splice(this.data.lastIndexOf(arr[i].id + ': ' + arr[i].value), 1)
            }
          }
        }

      }

      console.log(this.data);
    },

    sortTitle() {
      //let titles = [];
      let tls = [];
      for (let t of this.filters) {
        tls.push(t.group_title)
      }
      let el = []
      this.el = el
      //arr.sort(function(a, b) { return a.group_title != b.group_title; });
      let filteredArray = tls.filter(function (item, pos) {
        if (tls.indexOf(item) == pos) {
          return item
        } else {
          el.push(item)
        }
      });
      this.titles = filteredArray;
      //console.log(this.titles + ' || ' + this.el);
    },

    reset() {
      this.data = [];
      let checked_elm = document.querySelectorAll('[checked="checked"]');
      for (let i of checked_elm) {
        i.removeAttribute('checked');
      }
      this.$refs.form.reset()
      this.$root.$emit('reload');
    },

    async getFiltersValues() {
      let cat_id = this.$route.params.category
      let sub_id = this.$route.params.sub ? this.$route.params.sub : ''
      this.data.push('category_id: ' + cat_id, 'sub_category_id: ' + sub_id)

      let arr = []
      for (let k of this.data) {
        arr.push(k.split(':'))
      }

      try {
        await this.$store.dispatch('products/filterProducts', arr)
          .then(res => {
            //console.log(res.data);
            this.$root.$emit('getFilteredData', res);
          })
      } catch (e) {
        throw e
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.rotate_up {
  transform: rotate(180deg);
}

.rotate_down {
  transform: rotate(0deg);
}

.show_filter {
  cursor: pointer;
  /*text-decoration: underline;*/
  font-weight: 400;
  color: #4a5568;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .material-icons {
    padding: 2px 10px !important;
    position: absolute !important;
  }
}

.hide {
  display: none;
  opacity: 0;
  transition: all .6s ease-in-out;
}

.show {
  display: block;
  opacity: 1;
  transition: all .6s ease-in-out;
}

.flx-btw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

/*.flx-bl{
  display: flex;
  justify-content: space-between;
  align-items: center;
}*/

.dots {
  border-bottom: 1px dotted #999797;
  height: 12px;
  width: 50%;
}

label {
  font-size: 12px !important;
  font-weight: 400;
}

.dr {
  display: flex;
  justify-content: space-between;
}
</style>
