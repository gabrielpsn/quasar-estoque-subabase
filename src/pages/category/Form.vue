<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Form Category
        </p>
        <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
          <q-input
            label="Name"
            v-model="form.name"
            :rules="[val => (val && val.length > 0) || 'Name is required']"
            />
          <q-btn :label="isUpdate ? 'Edit' : 'Save'" color="primary" class="full-width" rounded type="submit"/>
          <q-btn label="Cancel" color="primary" class="full-width" rounded flat :to="{name: 'category'}"/>
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
  name: 'form-category',
  setup () {
    const table = 'category'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifySuccess, notifyError } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let category = {}

    const form = ref({
      name: ''
    })

    const handleGetCategoryById = async (id) => {
      try {
        category = await getById(table, id)
        form.value = category
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(async () => {
      if (isUpdate.value) {
        handleGetCategoryById(isUpdate.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Update Success')
          router.push({ name: 'category' })
          return
        }
        await post(table, form.value)
        notifySuccess('Save Success')
        router.push({ name: 'category' })
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleSubmit,
      isUpdate
    }
  }
})
</script>
