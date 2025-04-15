<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe700lQItMTpZGmXkgVXVvG8DhmBfQWf_1Aw&s"
          subtitle="diana@dc.com"
          title="Wonder woman"
           class="large-avatar"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.route"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(true)

const navItems = ref([
{ icon: 'mdi-account', title: 'Profile', route: '/profile' },
])
</script>

<style scoped>
.large-avatar .v-list-item__prepend > .v-avatar {
  width: 180px !important;
  height: 180px !important;
}
</style>
