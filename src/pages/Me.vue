<template>
  <q-page class="flex flex-center">
    <div>
      <p>Hello {{  user }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composable/useAuthUser'

export default defineComponent({
  name: 'PageMe',
  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
