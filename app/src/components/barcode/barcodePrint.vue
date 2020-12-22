<template>
  <v-row class="justify-center">
    <v-col cols="12" md="6">
      <v-card class="d-flex justify-center pa-8">
        <div class="blue--text">
          book Number :
          {{ $route.params.bookId }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'barcodePrint',
};
</script>
