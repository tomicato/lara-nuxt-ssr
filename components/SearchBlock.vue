<template>
  <div id="search_block">
    <h3>{{ name }}</h3>
    <form>
      <input type="text" id="input_search" v-model="search" placeholder="   enter product`s name"/>
      <button class="btn-outline-primary" @click.prevent="searchProducts" id="button_search">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBlock",
  props: {
    name: '',
    search_field: ''
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async searchProducts() {
      //console.log(!this.search);
      if(!this.search) this.$router.go(0);

      let searchData = new FormData();
      searchData.append('search', this.search)

      try {
        await this.$axios.$post('/api/shop/products/search', searchData)
          .then(res => {
            this.$root.$emit('getFilteredData', res);
            this.search = ''
          })
      } catch (e) {
        throw e
      }

    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  font-weight: 400;
  text-transform: capitalize;
  color: crimson;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
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

#search_block {
  display: flex;
  justify-content: space-between;
  align-items: center;

  #input_search {
    border-radius: 19px !important;
    border: 1px solid #ddd;
    padding: 3px;
  }

  #input_search:focus, #input_search:active {
    outline: unset !important;
  }

  #button_search {
    border-radius: 19px !important;
    outline: unset !important;
    border: 1px solid #ddd !important;
    padding: 3px 15px;
    background-color: transparent;
  }

  #button_search:hover {
    color: #7ca1f6;
  }

  #button_search:focus, #button_search:active {
    outline: unset !important;
    box-shadow: unset !important;
  }
}

@media screen and (max-width: 767px) {
  #search_block {
    flex-direction: column;

    form {
      margin: 15px 0;
    }
  }
}
</style>
