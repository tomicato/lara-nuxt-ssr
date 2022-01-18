import Vue from 'vue';
import {mapGetters} from 'vuex';

const _user = {
  install(Vue, options){
    Vue.mixin({
      computed: {
        ...mapGetters({
          user: "user",
          authenticated: "authenticated"
        })
      }
    })
  }
}

Vue.use(_user);
