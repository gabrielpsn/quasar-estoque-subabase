<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Form Product
        </p>
        <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">

          <q-input
            label="Image"
            stack-label
            v-model="img"
            type="file"
          />
          <q-input
            label="Name"
            v-model="form.name"
            :rules="[val => (val && val.length > 0) || 'Name is required']"
            />

            <q-editor v-model="form.description" min-height="5rem" />

            <q-input
            label="Amount"
            type="number"
            v-model="form.amount"
            :rules="[val => !!val || 'Amount is required']"
            />

            <q-input
            label="Price"
            type="number"
            v-model="form.price"
            prefix="R$"
            :rules="[val => !!val || 'Amount is required']"
            />

            <q-select
              v-model="form.category_id"
              :options="optionsCategory"
              label="Category"
              option-value="id"
              option-label="name"
              map-options
              emit-value
              :rules="[val => !!val || 'Category is required']"
            />

          <q-btn :label="isUpdate ? 'Edit' : 'Save'" color="primary" class="full-width" rounded type="submit"/>
          <q-btn label="Cancel" color="primary" class="full-width" rounded flat :to="{name: 'product'}"/>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import useApi from 'src/composable/useApi'
import useNotify from 'src/composable/useNOtify'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'form-product',
  setup () {
    const table = 'product'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list, uploadImg } = useApi()
    const { notifySuccess, notifyError } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let product = {}
    const optionsCategory = ref([])

    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: null,
      img_url: ''
    })

    const img = ref([])

    const handleGetProductById = async (id) => {
      try {
        product = await getById(table, id)
        form.value = product
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(async () => {
      handleListCategory()
      if (isUpdate.value) {
        handleGetProductById(isUpdate.value)
      }
    })

    const handleListCategory = async () => {
      optionsCategory.value = await list('category')
    }

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'products')
          console.log('imgUrl', imgUrl)
          form.value.img_url = imgUrl
        }

        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Update Success')
          router.push({ name: 'product' })
          return
        }
        await post(table, form.value)
        notifySuccess('Save Success')
        router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleSubmit,
      isUpdate,
      optionsCategory,
      img
    }
  }
})
</script>
