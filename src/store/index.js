import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productTypes: [],
    
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_PRODUCT(state, payload) {
      state.product.push(payload)
    },
    SET_PRODUCT_TYPES(state, types) {
      state.productTypes = types
    },
    REMOVE_PRODUCT(state, id) {
      const index = state.products.findIndex(product => product.id === id)
      state.products.splice(index, 1)
    }
  },
  actions: {
    getProducts({ commit }, { page, perPage }) {
      Vue.prototype.$axios.get('/product', {
        params: {
          page,
          perPage
        }
      })
        .then(res => {
          console.log(res);
          commit('SET_PRODUCTS', res.data)
        })
    },
    getProductTypes({ commit }) {
      Vue.prototype.$axios.get('/product/get-product-types')
        .then(res => {
          commit('SET_PRODUCT_TYPES', res.data)
        })
     },
    postProduct({ dispatch }, payload) { 

      Vue.prototype.$axios.post('/product', { ...payload }).then(res => {
        dispatch('getProducts')
      })
    },
    putProduct({ dispatch }, { payload, page }) { 
      Vue.prototype.$axios.put('/product', { ...payload })
        .then(res => {
          dispatch('getProducts', {
            page: page,
            perPage: 10
          })
        })
    },
    deleteProduct({ dispatch }, id) {
      Vue.prototype.$axios.delete('/product/' + id)
    }
  }
})