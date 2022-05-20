export const state = () => ({
    rating: 0,
    feeds: [],
    count_feeds: 0
})

export const mutations = {
    setFeeds(state, data) {
        state.feeds = data
    },
    setRating(state, feeds){
        let sum = feeds.reduce((sum, item) => sum + item.rating, 0)
        let rating = Math.round(sum / feeds.length);
        state.rating = rating
        state.count_feeds = feeds.length
    }
}

export const actions = {
    async getTestimonials({commit}, product_id) {
        try {
          let feeds = await this.$axios.$get(`/api/shop/feedback/feedbacks-to-product/${product_id}`)
            commit('setFeeds', feeds.data)
            commit('setRating', feeds.data)
        } catch (e) {
            throw e
        }
    },
}

export const getters = {
    feeds: state => state.feeds,
    rating: state => state.rating,
    count_feeds: state => state.count_feeds,
}
