<template>
  <div class="container my-5" id="topics">
    <h2>Latest Articles</h2>
    <div v-for="(topic, index) in items" :key="index" class="my-5" style="padding: 20px;">
      <h2>{{ topic.title }}</h2>
      <p class="text-muted">{{ topic.created_at }} by {{ topic.user.name }}</p>

      <div v-for="(post, k) in topic.posts" :key="k" class="ml-5 content">
        {{ post.body }}
        <p class="text-muted">{{ post.created_at }} by {{ post.user.name }}</p>
      </div>
    </div>


    <b-pagination
      class="t-4 flx-c"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      pills
      @change="changeHandler"
    ></b-pagination>



  </div>
</template>

<script>
import _ from "lodash";

export default {
  head: {
    title: 'Topics',
  },
  data() {
    return {
      perPage: 3,
      currentPage: +this.$route.query.page || 1,
      pageCount: 1,
      itemsAll: [],
      items: [],
      topics: [],
    }
  },

  async asyncData(ctx) {
    let some = await ctx.$axios.$get('/api/topics')
   // console.log(some.data);
    return {
      topics: some.data
    }
  },
  created() {
    this.itemsAll = _.chunk(this.topics, this.perPage)
    this.pageCount = _.size(this.itemsAll)
    this.items = this.itemsAll[this.currentPage - 1] || this.itemsAll[0]
  },

  computed: {
    rows() {
      return this.topics.length
    },
  },
  methods: {
    async changeHandler(page) {
      // await this.$router.push(`${this.$route.path}?page=${page}`) // Отображение в  адресной строке маршрута
      this.items = await this.itemsAll[page - 1] || this.itemsAll[0]
    },

  },
}
</script>

<style lang="scss" scoped>
#topics{
  h2 {
    color: #008035;
  }
}
.content {
  border-left: 10px solid white;
  padding: 0 10px;
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
