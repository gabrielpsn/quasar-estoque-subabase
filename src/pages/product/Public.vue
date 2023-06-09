<template>
    <q-page padding>
      <div class="row" v-if="brand.name">
        <div class="col-12 text-center text-h4">
          {{  brand.name }}
        </div>
      </div>
      <div class="row">
        <q-select
          outlined
          v-model="categoryId"
          :options="optionsCategories"
          label="Category"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          dense
          clearable
          class="col-12"
          @update:model-value="handleListProducts(route.params.id)"
        />
        <q-table
          grid
          class="col-12"
          :rows="products"
          :columns="columnsProduct"
          v-model:pagination="initialPaginations"
          row-key="id"
          :loading="loading"
          :filter="filter"
          hide-pagination
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
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3">
              <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">
                <q-img :src="props.row.img_url" :ratio="4/3" />
                <q-card-section class="text-center">
                  <div class="text-h6">{{ props.row.name }}</div>
                  <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="q-pa-md col-12" v-if="props.rowIndex === 3">
              <q-parallax :height="200" :speed="0.5">
                <template v-slot:media>
                  <img :src="brand.img_paralax"/>
                </template>
                <h3 >{{ brand.name }}</h3>
              </q-parallax>
            </div>
          </template>
        </q-table>
      </div>
      <div class="row justify-center q-mt-md">
        <q-pagination
        :max="pagesNumber"
        direction-links
        v-model="initialPaginations.page"
        @update:model-value="handleScrollToTop"
        />
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
import { defineComponent, ref, onMounted, computed } from 'vue'
import useApi from 'src/composable/useApi'
import useNotify from 'src/composable/useNOtify'
import { columnsProduct, initialPaginations } from './table'
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
    const optionsCategories = ref([])
    const categoryId = ref('')

    const handleListProducts = async (userId) => {
      try {
        products.value = categoryId.value ? await listPublic('product', userId, 'category_id', categoryId.value) : await listPublic('product', userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleShowDetails = (product) => {
      productDetails.value = product
      showDialogDetails.value = true
    }

    const handleListCategory = async (userId) => {
      optionsCategories.value = await listPublic('category', userId)
    }

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onMounted(() => {
      if (route.params.id) {
        handleListProducts(route.params.id)
        handleListCategory(route.params.id)
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
      brand,
      optionsCategories,
      categoryId,
      handleListProducts,
      route,
      initialPaginations,
      pagesNumber: computed(() => Math.ceil(products.value.length / initialPaginations.value.rowsPerPage)),
      handleScrollToTop
    }
  }
})
</script>
