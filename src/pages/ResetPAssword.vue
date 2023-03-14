<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="hadlePasswordReset">
      <div class="col-12">
        <p class="text-h5 text-center">Reset Password</p>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New password"
          v-model="password"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">

          <q-btn
            label="Reset Password"
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
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'PagePasswordReset',
  setup () {
    const { resetPassword } = useAuthUser()
    const route = useRoute()
    const router = useRouter()
    const token = route.query.token
    const password = ref('')

    const hadlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        router.push({ name: 'login' })
      } catch (error) {
        alert(error)
      }
    }

    return {
      password,
      hadlePasswordReset
    }
  }
})
</script>
