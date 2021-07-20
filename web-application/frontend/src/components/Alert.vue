<template>
  <div>
    <v-alert
        class="text-center"
        :value="alert['alert']"
        :type="alert['type']"
        :dismissible="alert['dismissible']"
        outlined
        border="left"
        @input="closeAlert"
    >{{ alert['msg'] }}
    </v-alert>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Alert",
  computed: {
    ...mapState("main", ["alert"]),
  },
  methods: {
    ...mapMutations("main", ["SET_ALERT"]),
    closeAlert() {
      this.SET_ALERT({'alert': false, 'msg': null, 'type': null, 'dismissible': true})
    }
  }
}
</script>
