export const state = () => ({
  products: [],
  category_products: [],
  filtered_products: [],
  temp_route: ''
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setCatProducts(state, data) {
    state.category_products = data
  },
  setFilterProducts(state, data) {
    state.filtered_products = data
  },
  clearData(state) {
    state.filtered_products = []
  },
  setTempRoute(state, route){
    state.temp_route = route
  }
}

export const actions = {

  async getProducts({commit}) {
    try {
      let data = await this.$axios.$get('/api/shop/products')
      commit('setProducts', data)
      // console.log(data);
      return data
    } catch (e) {
      throw e
    }
  },

  async getCatProducts({commit}, dataIds) {
    //console.log(data.cat_id + ' ' + data.sub_id);
    let cat_id = dataIds.cat_id
    let sub_id = dataIds.sub_id ? dataIds.sub_id : ''
    commit('setTempRoute', `/api/shop/products/${cat_id}/${sub_id}`)
    try {
      if (sub_id == '') {
        let data = await this.$axios.$get(`/api/shop/products/${cat_id}`)
        commit('setCatProducts', data)
        return data
      } else {
        let data = await this.$axios.$get(`/api/shop/products/${cat_id}/${sub_id}`)
        commit('setCatProducts', data)
        return data
      }
    } catch (e) {
      throw e
    }
  },

  async filterProducts({commit}, data) {
    //console.log(data);
    let formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append(data[i][0], data[i][1])
    }
    try {
      let data = await this.$axios.$post('/api/shop/products/filters', formData)
      commit('setFilterProducts', data)
     // console.log(data);
       /*for (let pair of formData.entries()) {
         console.log(pair[0] + ', ' + pair[1]);
       }*/
      return data
    } catch (e) {
      throw e
    }
  },



  clearFilter({commit}) {
    commit('clearData')
  }
}

export const getters = {
  products: state => state.products,
  sub_products: state => state.category_products,
  filtered: state => state.filtered_products,
  temp_link: state => state.temp_route,
}
