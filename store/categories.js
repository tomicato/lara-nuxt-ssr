export const state = () => ({
  categories: []
})

export const mutations = {
  setCategories(state, data) {
    state.categories = data
  }
}

export const actions = {
  async getCategories({commit}) {
    try {
     let {data} = await this.$axios.$get('/api/shop/categories')
      commit('setCategories', data)
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  categories: state => state.categories
}
