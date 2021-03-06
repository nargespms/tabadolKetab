<template>
  <v-row class="justify-center">
    <v-col cols="12">
      <p class="d-block ma-auto text-center fn-25 mt-6">
        {{ $t('ErrorMessage404') }}
      </p>
      <img class="d-block ma-auto" src="../../assets/404.jpg" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'E404',
};
</script>
