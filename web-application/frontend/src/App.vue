<template>
  <v-app>
    <Header :isBackendOnline="this.backendStatus.online"/>
    <v-main>
      <div>
        <Alert/>
      </div>
      <div v-if="this.backendStatus.online">
        <div v-if="this.$keycloak.authenticated">
          <AddPost @add-post="addPost"/>
        </div>
        <Posts :posts="posts" @edited-post="editedPost" @delete-post="deletePost"/>
      </div>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/layout/Header';
import AddPost from './components/AddPost';
import Posts from './components/Posts';
import Footer from './components/layout/Footer';
import Alert from "./components/Alert";
import {mapActions, mapMutations, mapState} from "vuex";

import axios from 'axios';

export default {
  name: 'App',
  components: {
    Alert,
    Header,
    AddPost,
    Posts,
    Footer
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    addPost() {
      this.updatePosts()
    },
    editedPost() {
      this.updatePosts()
    },
    deletePost() {
      this.updatePosts()
    },
    updatePosts() {
      axios.get(process.env.VUE_APP_BACKEND_URL + 'posts/all')
          .then(response => {
            this.posts = response.data;
            this.SET_ALERT({
              'alert': false,
              'msg': null,
              'type': null,
              'dismissible': true
            });
          }).catch(() => {
        this.SET_ALERT({
          'alert': true,
          'msg': "A problem occurred while loading the posts.",
          'type': "error",
          'dismissible': true
        });
      });
    },
    ...mapMutations("main", ["SET_ALERT"]),
    ...mapActions("main", ["checkBackendStatus"])
  },
  created() {
    this.checkBackendStatus()
  },
  mounted() {
    this.updatePosts()
  },
  computed: {
    ...mapState("main", ["backendStatus"]),
  }
}
</script>
