<template>
    <q-page padding>
      <div class="row" v-if="brand.name">
        <div class="col-12 text-center text-h4">
          {{  brand.name }}
        </div>
      </div>
      <div class="row">
        <q-table
          grid
          class="col-12"
          :rows="products"
          :columns="columnsProduct"
          row-key="id"
          :loading="loading"
          :filter="filter"
        >

          <template v-slot:top>
            <span class="text-h6"> Products </span>
            <q-input
              outlined
              dense
              v-model="filter"
              placeholder="Search"
              class="q-mr-sm"
              debounce="300"
              >
              <template v-slot:append>
                <q-icon name="mdi-magnify"/>
              </template>
            </q-input>
            <q-space />
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">
                <q-img :src="props.row.img_url" :ratio="4/3" />
                <q-card-section class="text-center">
                  <div class="text-h6">{{ props.row.name }}</div>
                  <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
      <dialog-product-details
        :show="showDialogDetails"
        :product="productDetails"
        @hide-dialog="showDialogDetails = false"
      />
    </q-page>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{name: 'form-product'}" />
    </q-page-sticky>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composable/useApi'
import useNotify from 'src/composable/useNOtify'
import { columnsProduct } from './table'
import { useRoute } from 'vue-router'
import { formatCurrency } from 'src/utils/format'
import DialogProductDetails from 'src/components/DialogProductDetails.vue'

export default defineComponent({
  name: 'PageProductPublic',
  components: {
    DialogProductDetails
  },
  setup () {
    const products = ref([])
    const loading = ref(true)
    const filter = ref('')
    const { listPublic, brand, getBrand } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()
    const showDialogDetails = ref(false)
    const productDetails = ref({})

    const handleListProducts = async (userId) => {
      try {
        products.value = await listPublic('product', userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleShowDetails = (product) => {
      productDetails.value = product
      showDialogDetails.value = true
    }

    onMounted(() => {
      if (route.params.id) {
        handleListProducts(route.params.id)
        getBrand()
      }
    })

    return {
      columnsProduct,
      products,
      loading,
      filter,
      formatCurrency,
      showDialogDetails,
      productDetails,
      handleShowDetails,
      brand
    }
  }
})
</script>
