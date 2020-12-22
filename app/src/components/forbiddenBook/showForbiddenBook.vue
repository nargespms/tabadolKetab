<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="8" md="6">
      <v-card color="white" class="pa-8 ma-auto" width="80%">
        <v-toolbar color="red darken-1" flat height="32">
          <v-icon color="white" right>fas fa-ban</v-icon>
          <span class=" white--text font-weight-bold">{{
            $t('forbiddenBook')
          }}</span>
        </v-toolbar>
        <div class="forbiddenBook">
          <v-card-title class="text-center justify-space-between">
            {{ forbiddenBook.title }}
            <v-card-subtitle>
              {{ $t('createdAt') }}:
              {{ new Date(forbiddenBook.createdAt).toLocaleTimeString('fa') }}
              <v-icon small color="red">
                mdi-clock
              </v-icon>
              {{ new Date(forbiddenBook.createdAt).toLocaleDateString('fa') }}
              <v-icon small color="black">
                mdi-calendar
              </v-icon>
            </v-card-subtitle>
          </v-card-title>
          <v-card-text>
            <p>{{ $t('writer') }} : {{ forbiddenBook.author }}</p>
            <p>
              {{ $t('shabak') }} :
              {{ forbiddenBook.shabak }}
            </p>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'showForbiddenBook',
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      forbiddenBook: {
        title: 'ملت عشق',
        author: 'الیف شافاک ',
        shabak: '1234567908653332',
        createdAt: '2020-11-14T07:57:56.171Z',
      },
    };
  },
};
</script>
<style lang="scss">
.forbiddenBook {
  border: 1px solid #d9d8d8;
}
</style>
