<template>
  <div class="q-pa-md">
    <div class="add-product">
        <q-btn @click="openModal" color="primary">Add Product</q-btn>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-right">Address</th>
          <th class="text-right">Cost</th>
          <th class="text-right">Product Type</th>
          <th class="text-right">Created Date</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr 
            v-for="(product, index) in $store.state.products"
            :key="index"
        >
          <td class="text-left">{{ product.name_uz }}</td>
          <td class="text-right">{{ product.address }}</td>
          <td class="text-right">{{ product.cost }}</td>
          <td class="text-right">{{ productType(product.product_type_id) && productType(product.product_type_id).name_uz }}</td>
          <td class="text-right">{{ convertTimestampToDate(product.created_date) }}</td>
          <td class="text-right actions">
            <q-icon 
                @click="editProduct(product)"
                name="edit"
                class="icon" 
            />
            <q-icon 
                @click="deleteProduct(product)"
                name="delete" 
                class="icon"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

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

    <!-- Update Modal -->
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px; height: 100%;">
        <div class="q-pa-md" style="max-width: 400px">
            <q-form
                @submit.prevent="updateOrCreate"
                @reset="reset"
                class="q-gutter-md"
            >
                <q-input
                    filled
                    v-model="form.name_uz"
                    label="Product name *"
                    hint="Product name"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    type="text"
                    v-model="form.address"
                    label="Address *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                    filled
                    type="number"
                    v-model="form.cost"
                    label="Cost of product *"
                    lazy-rules
                />
                <q-select 
                    filled 
                    v-model="productTypeId" 
                    :options="$store.state.productTypes"
                    option-value="id"
                    option-label="name_uz"
                    label="Product type" 
                />

                <div>
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
    data() {
        return {
            dialog: false,
            position: 'right',
            updating: false,
            current: 1,
            productTypeId: '',
            form: {
                name_uz: '',
                address: '',
                product_type_id: '',
                cost: ''
            }
        }
    },
    methods: {
        productType(product) {
            return this.$store.state.productTypes.find(productType => productType.id == product);
        },
        convertTimestampToDate(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            return formattedDate;
        },
        editProduct(product) {
            this.updating = true
            this.dialog = true
            this.form = { ...product }
            this.productTypeId = this.productType(this.form.product_type_id)
        },
        reset() {
            this.form = {}
        },
        updateProduct() {
            this.dialog = false
            this.form.product_type_id = this.productTypeId.id
            this.$store.dispatch('putProduct', {
                payload: this.form,
                page: this.current
            })
            this.updating = false
            this.form = {}
        },
        deleteProduct(product) { 
            this.$store.dispatch('deleteProduct', product.id)
            this.$store.commit('REMOVE_PRODUCT', product.id)
        },
        openModal() {
            this.dialog = true
        },
        createProduct() {
            this.form.product_type_id = this.productTypeId.id
            this.form.created_date = new Date()
            this.$store.dispatch('postProduct', this.form)
            this.dialog = false
            this.form = {}
        },
        updateOrCreate() {
            if (this.updating) {
                this.updateProduct()
            } else {
                this.createProduct()
            }
        },
        loading() {
            this.$q.loading.show()
            this.timer = setTimeout(() => {
                this.$q.loading.hide()
                this.timer = void 0
            }, 500)
        },
        changePagination() {
            this.$store.dispatch('getProducts', {
                page: this.current,
                perPage: 10
            })
        }
    },
    mounted() {
        this.loading()
        this.$store.dispatch('getProducts', {
            page: this.current,
            perPage: 10
        })
        this.$store.dispatch('getProductTypes')
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
    .actions {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;
    }
    .icon {
        cursor: pointer;
        font-size: 1.2rem;
    }
    .add-product { 
        display: flex;
        align-items: center;
        justify-content: end;
        margin: 20px;
    }
    .pagination {
        float: right;
        margin: 10px 0;
    }
</style>