export { default as AdminLeftSideBar } from '../..\\components\\AdminLeftSideBar.vue'
export { default as Categories } from '../..\\components\\Categories.vue'
export { default as Filters } from '../..\\components\\Filters.vue'
export { default as FooterBottom } from '../..\\components\\FooterBottom.vue'
export { default as GridView } from '../..\\components\\gridView.vue'
export { default as HeaderTop } from '../..\\components\\HeaderTop.vue'
export { default as ListView } from '../..\\components\\listView.vue'
export { default as ModalWindow } from '../..\\components\\modalWindow.vue'
export { default as NavBar } from '../..\\components\\NavBar.vue'
export { default as Reviews } from '../..\\components\\Reviews.vue'
export { default as SearchBlock } from '../..\\components\\SearchBlock.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
