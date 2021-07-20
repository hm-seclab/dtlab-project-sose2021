<template>
  <v-app-bar app color="teal darken-3" dark>
    <v-toolbar-title>ProjektApp</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isBackendOnline">
      <v-btn class="mx-2" v-if="this.$keycloak.authenticated" @click="logout()">Logout</v-btn>
      <v-btn class="mx-2" v-else @click="login()">Login</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: ['isBackendOnline'],
  methods: {
    login() {
      this.$keycloak.login()
    },
    logout() {
      this.$keycloak.logout()
    },
  },
}
</script>