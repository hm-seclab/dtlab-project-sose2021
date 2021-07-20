<template>
    <div>
        <v-subheader inset>Posts</v-subheader>
        <v-divider inset></v-divider>
        <div v-for="post in getSortedByUpdatedAt(posts.slice())" v-bind:key="post.id">
            <PostItem v-bind:post="post" v-on:edited-post="$emit('edited-post')" v-on:delete-post="$emit('delete-post', post.id)" />
        </div>
    </div>
</template>

<script>
import PostItem from './PostItem.vue'

export default {
    name: 'Posts',
    components: {
        PostItem
    },
    props: ["posts"],
  methods: {
      getSortedByUpdatedAt(posts) {
        posts.sort((post1, post2) => {
          if (Date.parse(post1.updatedAt) > Date.parse(post2.updatedAt)) {
            return -1;
          }
          if (Date.parse(post1.updatedAt) < Date.parse(post2.updatedAt)) {
            return 1;
          }
          return 0
        })
        return posts
      }
  }
}
</script>