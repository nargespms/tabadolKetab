<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'postsRequestsNumber'"
          :number="posts.postsReq"
          :color="color"
          :link="'/postList'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todaypostsRequestsNumber'"
          :number="posts.todayPostsReq"
          :color="color"
          :link="`/postList?filter[createdAt]=${this.today}`"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'recievedPostsNumber'"
          :number="posts.recievedPosts"
          :color="color"
          :link="'/postList?filter[status]=RECEIVED'"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayRecievedPostsNumber'"
          :number="posts.todayRecievedPosts"
          :color="color"
          :link="`/postList?filter[receiveDate]=${this.today}`"
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
        postsReq: 0,
        todayPostsReq: 0,
        recievedPosts: 0,
        todayRecievedPosts: 0,
      },
    };
  },
  computed: {
    today() {
      return new Date().toISOString();
    },
  },
  methods: {
    getPostsReq() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/deliveries')
        .then(res => {
          if (res.status === 200) {
            this.posts.postsReq = res.data.count;
          }
        });
    },
    getTodayPostsReq() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/deliveries', {
          params: {
            filter: {
              createdAt: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.posts.todayPostsReq = res.data.count;
          }
        });
    },
    getRecievedPostsReq() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/deliveries', {
          params: {
            filter: {
              receive: true,
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.posts.recievedPosts = res.data.count;
          }
        });
    },
    getTodayRecievedPostsReq() {
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/report/deliveries', {
          params: {
            filter: {
              receiveDate: new Date(),
            },
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.posts.todayRecievedPosts = res.data.count;
          }
        });
    },
  },
  mounted() {
    this.getPostsReq();
    this.getTodayPostsReq();
    this.getRecievedPostsReq();
    this.getTodayRecievedPostsReq();
  },
};
</script>
