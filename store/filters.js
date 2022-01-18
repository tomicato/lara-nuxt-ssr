export const state = () => ({
  filters: []
})

export const mutations = {
  setFilters(state, data) {
    state.filters = data
  }
}

export const actions = {
  async getFilters({commit}) {

    try {
      let {data} = await this.$axios.$get(`/api/shop/filters/get-all-filters`)
      commit('setFilters', data)
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  filters: state => state.filters
}
