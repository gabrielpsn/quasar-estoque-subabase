<template>
  <q-dialog
    :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
    >
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
      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          color="negative"
          icon="mdi-close"
          outline
          v-close-popup
        ></q-btn>
        <q-btn
          v-if="!!brand.phone"
          label="Buy on WahtsApp"
          icon="mdi-whatsapp"
          color="green-7"
          @click="handleSendWhatsApp"
        >

        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { formatCurrency } from 'src/utils/format'
import { openURL } from 'quasar'
import useApi from 'src/composable/useApi'

export default defineComponent({
  name: 'dialogProductDetails',
  props: {
    product: {
      type: Object
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  setup (props, { emit }) {
    const { brand } = useApi()
    const msg = 'Olá fiquei ineterssado no produto: '
    const handleClose = () => {
      emit('hideDialog')
    }

    const handleSendWhatsApp = () => {
      const link = encodeURI(
        `https://api.whatsapp.com/send?phone55${brand.value.phone}&text=${msg}
        - ${props.product.name}
        - ${formatCurrency(props.product.price)}`)
      openURL(link)
    }
    return {
      formatCurrency,
      handleClose,
      handleSendWhatsApp,
      brand
    }
  }
})
</script>
