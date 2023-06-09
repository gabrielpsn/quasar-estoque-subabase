<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Estoque
        </q-toolbar-title>

        <dark-mode-toggle />

         <q-btn-dropdown flat color="white" icon="person">
            <q-list>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import useAuthUser from 'src/composable/useAuthUser'
import useApi from 'src/composable/useApi'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import DarkModeToggle from 'src/components/DarkModeToggle.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'mdi-home',
    routeName: 'me'
  },
  {
    title: 'Category',
    caption: '',
    icon: 'mdi-shape-outline',
    routeName: 'category'
  },
  {
    title: 'Product',
    caption: '',
    icon: 'mdi-shape-outline',
    routeName: 'product'
  },
  {
    title: 'Config',
    caption: '',
    icon: 'mdi-cog',
    routeName: 'form-config'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    DarkModeToggle
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const $q = useQuasar()
    const { logout } = useAuthUser()
    const { getBrand } = useApi()

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'do you really want to leave?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await logout()
        router.replace({ name: 'login' })
      })
    }

    onMounted(() => {
      getBrand()
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout
    }
  }
})
</script>
