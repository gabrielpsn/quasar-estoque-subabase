<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          Form Config
        </p>
        <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
          <q-input
            label="Store Name"
            v-model="form.name"
            :rules="[val => (val && val.length > 0) || 'Name is required']"
            />

            <q-input
              label="Phone"
              v-model="form.phone"
              mask="(##) #####-####"
              unmasked-value
            />

            <q-input
              label="Img Paralax"
              stack-label
              v-model="paralax"
              type="file"
              accept="image/*"
            />

            <div class="row justify-center q-gutter-md q-pa-md">
              <q-color v-model="form.primary" class="my-picker col-md-4 col-sm-12 col-xs-12 text-center" />
              <q-color v-model="form.secondary" class="my-picker col-md-4 col-sm-12 col-xs-12 text-center" />
            </div>
          <q-btn label="Save" color="primary" class="full-width" rounded type="submit"/>
          <q-btn label="Cancel" color="primary" class="full-width" rounded flat :to="{name: 'category'}"/>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composable/useApi'
import useNotify from 'src/composable/useNOtify'
import { useRouter } from 'vue-router'
import useBrand from 'src/composable/useBrand'
import useAuthUser from 'src/composable/useAuthUser'

export default defineComponent({
  name: 'form-config',
  setup () {
    const table = 'config'
    const router = useRouter()
    const { post, update, listPublic, uploadImg } = useApi()
    const { notifySuccess, notifyError } = useNotify()
    const { setBrand } = useBrand()
    const { user } = useAuthUser()

    let config = {}

    const paralax = ref([])
    const form = ref({
      name: '',
      phone: '',
      primary: '',
      secondary: ''
    })

    const handleGetConfig = async () => {
      try {
        config = await listPublic(table, user.value.id)
        if (config.length > 0) {
          form.value = config[0]
        }
        setBrand(form.value.primary, form.value.secondary)
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(async () => {
      handleGetConfig()
    })

    const handleSubmit = async () => {
      try {
        if (paralax.value.length > 0) {
          const imgUrl = await uploadImg(paralax.value[0], 'paralax')
          console.log('imgUrl', imgUrl)
          form.value.img_paralax = imgUrl
        }

        if (form.value.id) {
          await update(table, form.value)
          notifySuccess('Update Success')
          setBrand(form.value.primary, form.value.secondary)
          router.push({ name: 'me' })
          return
        }
        await post(table, form.value)
        notifySuccess('Save Success')
        setBrand(form.value.primary, form.value.secondary)
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
      }
    }
    return {
      form,
      handleSubmit,
      paralax
    }
  }
})
</script>
