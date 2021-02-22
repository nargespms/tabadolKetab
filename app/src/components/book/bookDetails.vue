<template>
  <v-card v-if="items">
    <v-card-actions class="teal">
      <v-card-title class="white--text pa-0">
        <span>
          {{ $t('bookDetailsInfo') }}
        </span>
      </v-card-title>
      <v-spacer></v-spacer>
    </v-card-actions>
    <div class="pa-6">
      <template v-for="(item, index) in items">
        <v-row
          v-if="item.value.length > 0"
          :key="item.text"
          :class="index % 2 === 0 ? 'grey lighten-3' : 'white'"
        >
          {{ item.index }}
          <v-col cols="12" lg="6">
            <span>
              {{ $t(item.text) }}
            </span>
          </v-col>
          <v-col cols="12" lg="6">
            <span v-if="item.value">
              {{ item.value }}
            </span>
          </v-col>
        </v-row>
      </template>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'bookDetails',
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      items: [
        { text: 'shabak', value: this.data.shabak ? this.data.shabak : null },
        {
          text: 'author',
          value: this.data.author.title ? this.data.author.title : null,
        },
        {
          text: 'writer',
          value: this.data.writer.title ? this.data.writer.title : null,
        },
        {
          text: 'publisher',
          value: this.data.publisher.title ? this.data.publisher.title : null,
        },
        {
          text: 'searcher',
          value: this.data.searcher.title ? this.data.searcher.title : null,
        },
        {
          text: 'translator',
          value: this.data.translator.title ? this.data.translator.title : null,
        },
        {
          text: 'category',
          value: this.data.category.title ? this.data.category.title : null,
        },
        { text: 'bookLang', value: this.$t(this.data.bookLang) },
      ],
    };
  },
};
</script>
