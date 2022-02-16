export const state = () => ({
  topics: []
})

export const mutations = {
  setTopics(state, topics){
    state.topics = topics
  }
}

export const actions = {
  async getTopics({commit}) {

    try {
      let {data} = await this.$axios.$get('/api/topics')
      commit('setTopics', data)
      //return {data}
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  topics: state => state.topics
}
