<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4">
      <v-btn>{{ $t('changePassword') }}</v-btn>
      <v-btn class="ml-4">
        {{ $t('edit') }}
      </v-btn>
    </div>
    <div class="elevation-1 text-center ma-4">
      asd
    </div>
  </div>
</template>

<script>
export default {
  name: 'profilecmp',

  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.v-btn {
  letter-spacing: inherit;
}
</style>
