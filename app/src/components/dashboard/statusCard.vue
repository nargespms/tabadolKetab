<template>
  <v-card min-height="130" :style="`border:1px solid ${color}`">
    <v-card-title class="justify-center flex-column">
      <router-link v-if="link" :to="link">
        <p :style="`color:${color}`">
          {{ $t(lable) }}
        </p>
      </router-link>
      <p v-if="!link" :style="`color:${color}`">
        {{ $t(lable) }}
      </p>
      <span>
        {{ number }}
      </span>
      <span v-if="item">
        {{ item }}
      </span>
      <p v-if="users">
        <template v-for="user in users">
          <span :key="user.index">
            {{ user.fullName }}
          </span>
        </template>
      </p>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'statusCard',
  props: {
    lable: {
      type: String,
    },
    users: {
      type: Array,
    },
    number: {
      type: Number,
    },
    item: {
      type: String,
    },

    color: {
      type: String,
    },
    link: {
      type: String,
    },
  },
};
</script>
