<template>
  <div class="d-flex flex-column">
    <span class="pb-3 font-weight-medium">
      <v-icon>
        mdi-format-list-checks
      </v-icon>
      {{ $t(item.name) }}
    </span>
    <v-btn-toggle mandatory v-model="state">
      <v-btn
        activeClass="green accent-3 innerEl"
        @change="changeAccess(item, true)"
      >
        <span>{{ $t('yes') }}</span>
        <!-- <v-icon>mdi-check-all</v-icon> -->
      </v-btn>
      <v-btn
        activeClass="red darken-1 innerEl"
        @change="changeAccess(item, false)"
      >
        <span>{{ $t('no') }}</span>
        <!-- <v-icon>mdi-cancel</v-icon> -->
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: 'roleAccessBut',
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      state: 1,
    };
  },
  methods: {
    changeAccess(item, status) {
      this.$emit('changeAccess', item, status);
    },
  },
};
</script>
