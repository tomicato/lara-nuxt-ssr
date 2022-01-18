export const state = () => ({
  cart: [],
  products: [],
  tmp: [],
})

export const mutations = {

  setCart(state, item) {

    let keys = Object.keys(localStorage);
    let ind = [];

    for(let key of keys) {
      ind.push(key)
    }

    let s = ind.find(some => some == 'cartP-' + item.id);
    let f = JSON.parse(localStorage.getItem(s))

    if(!f){
      state.tmp = []
    }else{
      state.tmp.push(item)
    }

    if (f) {
      let obj = {
        id:   f.id,
        qty:  f.qty + 1,
        item: f.item
      }
      localStorage.setItem('cartP-' + f.id, JSON.stringify(obj))
    } else {
      let obj = {
        id: item.id,
        qty:  state.tmp.length + 1,
        item: item
      }
      localStorage.setItem('cartP-' + item.id, JSON.stringify(obj))
    }

  }
}

export const actions = {
  async addToCartItems({commit}, data) {
    try {
      await commit('setCart', data)
    } catch (e) {
      throw e
    }
  },



}

export const getters = {
  cart: state => state.cart
}
