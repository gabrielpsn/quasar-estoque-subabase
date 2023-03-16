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
        laze-rules
        :rules="[val => (val && val.length > 0) || 'Email is required']"
        type="email"
      />
      <q-input
        label="Password"
        v-model="form.password"
        laze-rules
        :rules="[val => (val && val.length > 0) || 'Password is required']"
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

       <div class="full-width">
        <q-btn
          label="Forgot Password ?"
          color="primary"
          class="full-width"
          flat
          to="/forgot-password"
        />
      </div>
      </div>
    </div>
   </q-form>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import useAuthUser from 'src/composable/useAuthUser'
import useNotify from 'src/composable/useNOtify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()
    const { login, isLoggedIn } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const hadleLogin = async () => {
      try {
        await login(form.value)
        router.push({ name: 'me' })
        notifySuccess('login success')
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      hadleLogin
    }
  }
})
</script>
