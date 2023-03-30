<template>
  <div class="main">
    <div class="filter">
      <q-input class="search" v-model="search" @input="searchData" label="Standard" />
      <q-select 
        class="select"
        v-model="select"
        @input="filterSelected"
        :options="options"
        option-value="id"
        option-label="name_uz"
        label="Product types" 
      />
    </div>
    <div class="products">
      <c-product 
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        :image="`https://picsum.photos/${400 + index}/450`"
      />
    </div>
    <q-pagination
        v-model="current"
        class="pagination"
        max="5"
        @input="changePagination"
        direction-links
        flat
        color="grey"
        active-color="primary"
      />
  </div>
</template>

<script>
import CProduct from "../components/CProduct.vue"

export default {
  name: 'PageIndex',
  components: {
    'c-product': CProduct
  },
  data() {
    return {
      search: '',
      select: '',
      current: 1,
      products: [],
      options: []
    }
  },
  mounted() {
    this.loading(2000)
    this.$store.dispatch('getProducts', {
      page: this.current,
      perPage: 10
    })
    this.$store.dispatch('getProductTypes')

    setTimeout(() => {
      this.products = this.$store.state.products
      this.options = this.$store.state.productTypes
      this.options.unshift({
        id: -1,
        name_uz: 'All'
      })
    }, 200)
  },
  methods: {
    loading(delay) {
      this.$q.loading.show()
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, delay)
    },
    filterSelected() {
      if (this.select.id == -1) {
        this.products = this.$store.state.products
      } else {
        this.products = this.$store.state.products.filter(product => product.product_type_id == this.select.id)
      }
    },
    changePagination() {
      this.$store.dispatch('getProducts', {
          page: this.current,
          perPage: 10
      })
      this.loading(300)
      setTimeout(() => this.products = this.$store.state.products, 100)
    },
    searchData() {
      if (this.search.length) {
        this.products = this.$store.state.products.filter(product => product.name_uz.startsWith(this.search))
      } else {
        this.products = this.$store.state.products
      }
    }
  },
  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>


<style lang="scss">
.main {
  max-width: 1400px;
  margin: 0 auto;
  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .select, .search {
      width: 300px;
    }
  }
}
.products {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
.pagination {
  float: right;
  margin: 10px 0 50px;
}
</style>
