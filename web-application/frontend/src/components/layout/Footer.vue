<template>
  <v-footer color="teal darken-3" dark>
    <v-col class="text-center" cols="12">
      &copy; {{ new Date().getFullYear() }} Projektgruppe
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>