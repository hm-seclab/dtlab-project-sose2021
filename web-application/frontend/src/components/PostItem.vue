<template>
    <div>
        <v-card id="card" class="mx-auto" elevation="2" max-width="800" shaped>
            <v-row class="mx-auto">
                <div>
                    <v-card-title>{{post.UserUserId + " (" + post.User.first_name + " " + post.User.last_name + ")"}}</v-card-title>
                    <v-card-subtitle>
                      <div v-if="wasEdited(post)">
                        {{convertTimestamp(post.updatedAt)}} | <b>Edited</b>
                      </div>
                      <div v-else>
                        {{convertTimestamp(post.updatedAt)}}
                      </div>
                    </v-card-subtitle>
                </div>
                <v-spacer></v-spacer>
                <div v-if="this.$keycloak.authenticated">
                  <v-card-actions>
                    <v-btn v-if="this.$keycloak.hasRealmRole('admin') || post.UserUserId === this.$keycloak.idTokenParsed.preferred_username" @click="openEditArea()" color="teal darken-3" icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions>
                    <v-btn
                        v-if="this.$keycloak.hasRealmRole('admin') || post.UserUserId === this.$keycloak.idTokenParsed.preferred_username"
                        v-on:click="deletePost(post.post_uuid)" color="teal darken-3" icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
            </v-row>
            <v-card-text v-if="isHidden">{{post.content}}</v-card-text>
            <div v-if="!isHidden">
              <div id="area">
                <v-textarea v-model="editedContent" name="editedContent" label="Please edit your Post" rows="3" counter maxlength="250" color="teal darken-3" filled auto-grow></v-textarea>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="cancel" @click="revertChanges()" rounded color="error">Cancel</v-btn>
                <v-btn type="submit" @click="saveChanges()" rounded color="teal" dark>Save</v-btn>
              </v-card-actions>
            </div>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import {mapMutations} from 'vuex';

export default {
  name: 'PostItem',
  props: ["post"],
  data() {
    return {
      isHidden: true,  // Boolean to hide or show editPost textarea and buttons
      editedContent: '',  // Bound to the "editedContent" textarea field -> Used to receive user input
      contentBeforeEditing: '',  // Saves the content of a post before it is edited -> Used to revert changes
    }
  },
  methods: {
    wasEdited(post) {
      return Date.parse(post.createdAt) !== Date.parse(post.updatedAt);
    },
    convertTimestamp(t) {
      return new Date(t).toLocaleString('de-DE')
    },
    openEditArea() {
      this.isHidden = false;
      this.contentBeforeEditing = this.post.content;  // Save the current post content before it is edited
      this.editedContent = this.post.content;  // Show current post content in opened textarea field "editedContent"
    },
    revertChanges() {
      this.isHidden = true;
      this.editedContent = '';
      this.contentBeforeEditing = '';
    },
    saveChanges() {
      const editedPost = {
        id: this.post.post_uuid,
        post_content: this.editedContent,
      };
      this.editPost(editedPost);
      this.isHidden = true;
      this.editedContent = '';
      this.contentBeforeEditing = '';
    },
    editPost(editedPost) {
      const config = {headers: {
          'Authorization': `Bearer ` + this.$keycloak.token,
          'Content-Type' : 'application/json'
        }};
      axios.put(process.env.VUE_APP_BACKEND_URL + 'posts', editedPost, config)
          .then (() => {
            this.SET_ALERT({'alert': true, 'msg': "Your post was updated successfully!",
              'type': "success", 'dismissible': true});
            this.$emit('edited-post');
          }).catch(() => {
        this.SET_ALERT({'alert': true, 'msg': "ERROR: Your post could not be updated!",
          'type': "error", 'dismissible': true});
      });
    },
    deletePost(dp_uuid) {
      const config = {
        headers: {
          'Authorization': `Bearer ` + this.$keycloak.token,
          'Content-Type': 'application/json'
        }
      };
      axios.delete(process.env.VUE_APP_BACKEND_URL + "posts/" + dp_uuid, config)
          .then(() => {
            this.SET_ALERT({
              'alert': true, 'msg': "Your post was deleted successfully!",
              'type': "success", 'dismissible': true
            });
            this.$emit('delete-post');
          }).catch(() => {
        this.SET_ALERT({
          'alert': true, 'msg': "ERROR: Your post was not deleted!",
          'type': "error", 'dismissible': true
        });
      });
    },
    ...mapMutations("main", ["SET_ALERT"]),
  }
}
</script>

<style scoped>
    #card {
        margin: 30px;
    }
    #area {
      margin: 0 15px 0 15px;
    }
</style>
