<template>
  <q-page padding>
   <q-form class="row justify-center" @submit.prevent="hadleLogin">
    <div class="col-12">
      <p class="text-h5 text-center">Login</p>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
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
        label="Login"
        color="primary"
        class="full-width"
        type="submit"
        outline
        rounded
      />
      </div>

       <div class="full-width">
        <q-btn
        label="Register"
        color="primary"
        class="full-width"
        flat
        to="/register"
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
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const { login } = useAuthUser()
    const form = ref({
      email: '',
      password: ''
    })

    const hadleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me' })
      } catch (error) {
        alert(error)
      }
    }

    return {
      form,
      hadleLogin
    }
  }
})
</script>
