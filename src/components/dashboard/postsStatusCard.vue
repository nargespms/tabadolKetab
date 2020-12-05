<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'postsRequestsNumber'"
          :number="posts.postsReq"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todaypostsRequestsNumber'"
          :number="posts.todayPostsReq"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'recievedPostsNumber'"
          :number="posts.recievedPosts"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayRecievedPostsNumber'"
          :number="posts.todayRecievedPosts"
          :color="color"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';

export default {
  name: 'postsStatusCard',
  components: {
    statusCard,
  },
  data() {
    return {
      color: '#5E35B1',
      posts: {
        postsReq: 50,
        todayPostsReq: 2,
        recievedPosts: 20,
        todayRecievedPosts: 2,
      },
    };
  },
};
</script>
