<template>
  <div>
    <form @submit="addPost">
      <v-card class="mx-auto" id="card" elevation="2" max-width="800" shaped>
        <v-card-title>
          {{
            this.$keycloak.idTokenParsed.preferred_username + " (" +
            this.$keycloak.idTokenParsed.given_name + " " +
            this.$keycloak.idTokenParsed.family_name + ")"
          }}
        </v-card-title>
        <div id="area">
          <v-textarea v-model="content" label="Whats new?" rows="3" counter maxlength="250" color="teal darken-3"
                      required filled auto-grow></v-textarea>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" rounded dark>Post</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {mapMutations} from "vuex";


export default {
  name: 'AddPost',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    addPost(e) {
      e.preventDefault();
      const newPost = {
        post_content: this.content,
        post_parent: null
      }
      axios.post(process.env.VUE_APP_BACKEND_URL + 'posts', newPost, {
        headers: {
          'Authorization': `Bearer ` + this.$keycloak.token,
          'Content-Type': 'application/json'
        }
      })
          .then(() => {
            this.SET_ALERT({
              'alert': true, 'msg': "Your post was added successfully!",
              'type': "success", 'dismissible': true
            });
            this.$emit('add-post');
          }).catch(() => {
        this.SET_ALERT({
          'alert': true, 'msg': "There was an error adding your post!",
          'type': "error", 'dismissible': true
        });
      });
      this.content = '';
    },
    ...mapMutations("main", ["SET_ALERT"]),
  }
}
</script>

<style scoped>
#card {
  margin: 15px;
}

#area {
  margin: 0px 15px 0px 15px;
}
</style>
