<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="hadleForgotPassword">
      <div class="col-12">
        <p class="text-h5 text-center">Reset Password</p>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
          laze-rules
          :rules="[val => (val && val.length > 0) || 'Email is required']"
          type="email"
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

export default defineComponent({
  name: 'PagePasswordReset',
  setup () {
    const { sendPasswordrestEmail } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

    const email = ref('')

    const hadleForgotPassword = async () => {
      try {
        await sendPasswordrestEmail(email.value)
        notifySuccess(`Password send email ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      hadleForgotPassword
    }
  }
})
</script>
