<template>
  <q-dialog>
    <q-card>
      <q-card-section
        class="text-h6"
      >
        Details
      </q-card-section>
      <q-card-section>
        <q-img :src="product.img_url" :ratio="4/3" style="min-width: 300px;" />
      </q-card-section>
      <q-card-section>
        <div   class="text-h6">
          {{ product.name }}
        </div>
        <div class="text-subtitle2">
          {{ formatCurrency(product.price) }}
        </div>
        <div class="text-bory2" v-html="product.description">
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="Cancel"
          color="negative"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { formatCurrency } from 'src/utils/format'

export default defineComponent({
  name: 'dialogProductDetails',
  props: {
    product: {
        type: 'Object'
    }
  },
  setup () {
    return {
      formatCurrency
    }
  },
})
</script>
