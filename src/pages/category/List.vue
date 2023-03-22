<template>
    <q-page padding>
      <div class="row">
        <q-table
          class="col-12"
          :rows="categories"
          :columns="columns"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:top>
            <span class="text-h6"> Category </span>
            <q-space />
            <q-btn :to="{name: 'form-category'}" icon="mdi-plus" label="Add New" color="primary" dense size="sm">
                <q-tooltip>Add new</q-tooltip>
              </q-btn>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-x-sm">
              <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemove(props.row)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composable/useApi'
import useNotify from 'src/composable/useNOtify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true }
]

export default defineComponent({
  name: 'PageCategoryList',
  setup () {
    const categories = ref([])
    const loading = ref(true)
    const router = useRouter()
    const $q = useQuasar()
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const handleListCategories = async () => {
      try {
        categories.value = await list('category')
        console.log('cate', categories)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    const handleRemove = async (category) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Do you really delet ${category.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove('category', category.id)
          notifySuccess('successfully deleted!')
          handleListCategories()
        })
      } catch (error) {
        notifyError(error)
      }
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      columns,
      categories,
      loading,
      handleEdit,
      handleRemove
    }
  }
})
</script>
