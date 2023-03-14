<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="hadleRegister">
      <div class="col-12">
        <p class="text-h5 text-center">Register</p>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
        />
        <q-input
          label="Email"
          v-model="form.email"
        />
        <q-input
          label="Password"
          v-model="form.password"
        />

        <div class="full-width q-pt-md">
          <q-btn
          label="Register"
          color="primary"
          class="full-width"
          type="submit"
          outline
          rounded
        />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composable/useAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',
  setup () {
    const router = useRouter()
    const { register } = useAuthUser()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const hadleRegister = async () => {
      try {
        await register(form.value)
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        alert(error)
      }
    }

    return {
      form,
      hadleRegister
    }
  }
})
</script>
