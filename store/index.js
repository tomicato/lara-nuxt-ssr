export const state = () => ({
  cartCount: 0
})

export const mutations = {
  setStorageCart(state, data){
    //console.log(data);
    state.cartCount = data
  }
}

export const actions = {
    async nuxtServerInit({dispatch}){
      //await dispatch('topics/getTopics')
      //await dispatch('products/getProducts')
      await dispatch('categories/getCategories')
      await dispatch('filters/getFilters')
    },

    getCountInCart({commit}){
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
    //  return arr;

      let items = [];
      for (let i = 0; i < arr.length; i++) {
        items.push(JSON.parse(localStorage.getItem(arr[i])))
      }

      let tmp = [];
      for (let i = 0; i < items.length; i++) {
        tmp.push(items[i].qty)
      }

      let total_count = tmp.reduce((sum, current) => sum + current, 0);
      commit('setStorageCart', total_count)
    },

}

export const getters = {
/*  authenticated(state) {
    return state.auth.loggedIn
  },

  user(state) {
    return state.auth.user
  },

  admin(state){
    if(state.auth.user){
      return state.auth.user.data.is_admin
    }
  },*/
  cartCount(state) {
    return state.cartCount
  }
}



