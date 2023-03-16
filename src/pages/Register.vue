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
          laze-rules
          :rules="[val => (val && val.length > 0) || 'Name is required']"
        />
        <q-input
          label="Email"
          v-model="form.email"
          laze-rules
          :rules="[val => (val && val.length > 0) || 'Email is required']"
          type="email"
        />
        <q-input
          label="Password"
          v-model="form.password"
          laze-rules
          :rules="[val => (val && val.length >= 6) || 'Password is required and 6']"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">

          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            type="submit"
            outline
            rounded
          />
          <q-btn
          label="Back"
          color="dark"
          class="full-width"
          :to="{ name: 'login' }"
          outline
          rounded
          flat
        />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composable/useAuthUser'
import useNotify from 'src/composable/useNOtify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',
  setup () {
    const router = useRouter()
    const { register } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

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
        notifySuccess('email send success')
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      hadleRegister
    }
  }
})
</script>
