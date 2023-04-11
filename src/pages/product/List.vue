<template>
    <q-page padding>
      <div class="row">
        <q-table
          class="col-12"
          :rows="products"
          :columns="columnsProduct"
          row-key="id"
          :loading="loading"
        >
         <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url"/>
            </q-avatar>
            <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
          </q-td>
        </template>
          <template v-slot:top>
            <span class="text-h6"> Product </span>
            <q-btn
             label="My Store"
             dense
             size="sm"
             outline
             class="q-ml-sm"
             icon="mdi-store"
             color="primary"
             @click="handleGoToStore"
             />
            <q-space />
            <q-btn v-if="$q.platform.is.desktop" :to="{name: 'form-product'}" icon="mdi-plus" label="Add New" color="primary" dense size="sm">
                <q-tooltip>Add new</q-tooltip>
              </q-btn>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
              <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemove(props.row)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-page>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to="{name: 'form-product'}" />
    </q-page-sticky>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composable/useApi'
import useNotify from 'src/composable/useNOtify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsProduct } from './table'
import userAuthUser from 'src/composable/useAuthUser'

export default defineComponent({
  name: 'PageProductList',
  setup () {
    const { user } = userAuthUser()
    const products = ref([])
    const loading = ref(true)
    const router = useRouter()
    const $q = useQuasar()
    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListProducts = async () => {
      try {
        products.value = await listPublic('product', user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (product) => {
      router.push({ name: 'form-product', params: { id: product.id } })
    }

    const handleRemove = async (product) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Do you really delet ${product.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove('product', product.id)
          notifySuccess('successfully deleted!')
          handleListProducts()
        })
      } catch (error) {
        notifyError(error)
      }
    }

    const handleGoToStore = () => {
      const idUser = user.value.id
      router.push({ name: 'product-public', params: { id: idUser } })
    }

    onMounted(() => {
      handleListProducts()
    })

    return {
      columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemove,
      handleGoToStore
    }
  }
})
</script>
