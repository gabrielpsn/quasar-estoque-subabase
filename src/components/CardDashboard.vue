<template>
  <q-card class="my-card" bordered v-ripple:primary>
    <q-skeleton height="50px" v-if="load" />
      <q-card-section horizontal v-else>
        <div class="col flex flex-center text-h5">
          {{ count }} - {{ label }}
        </div>

        <q-card-actions vertical class="justify-around q-px-md">
          <q-btn flat round color="primary" :icon="icon" />
        </q-card-actions>
      </q-card-section>
    </q-card>
</template>
<script>
import useApi from 'src/composable/useApi'
import useAuthUser from 'src/composable/useAuthUser'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'cardDashboard',
  props: {
    table: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'mdi-database-outline'
    }
  },
  setup (props) {
    const count = ref(0)
    const { user } = useAuthUser()
    const { fetchCount } = useApi()
    const load = ref(true)

    onMounted(async () => {
      const response = await fetchCount(props.table, user.value.id)
      count.value = response.count
      load.value = false
    })

    return {
      count,
      load
    }
  }
})
</script>
