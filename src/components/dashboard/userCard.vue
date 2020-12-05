<template>
  <v-card min-height="130" :style="`border:1px solid ${color}`">
    <v-card-title class="justify-center flex-column">
      <p :style="`color:${color}`">
        {{ user.fullName }}
      </p>
      <div v-if="actions">
        <template v-for="action in actions">
          <p :key="action.index" class="d-flex justify-center">
            {{ $t(action.title) }} :
            <span v-if="action.number" class="pr-4" :style="`color:${color}`">
              {{ action.number }}
            </span>
          </p>
        </template>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'userCard',
  props: {
    user: {
      type: Object,
    },

    actions: {
      type: Array,
    },
    color: {
      type: String,
    },
  },
};
</script>
