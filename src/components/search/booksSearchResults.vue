<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" md="11">
      <v-card>
        <v-card-actions class="teal pointer" @click="show = !show">
          <v-card-title class="white--text pa-0">
            <span class="pointer">
              {{ $t('searchResult') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-expand-transition>
          <v-row v-show="show" no-gutters class="pa-4">
            <v-col
              cols="12"
              md="4"
              lg="3"
              sm="6"
              v-for="item in localData"
              :key="item.index"
            >
              <bookCard :book="item" />
            </v-col>
          </v-row>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import bookCard from '../book/bookCard.vue';

export default {
  name: 'booksSearchResults',
  components: {
    bookCard,
  },
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      show: true,
      localData: this.data,
    };
  },
  watch: {
    data(newVal) {
      this.localData = newVal;
    },
  },
};
</script>
<style lang="scss">
.min-330h {
  min-height: 330px;
}
</style>
