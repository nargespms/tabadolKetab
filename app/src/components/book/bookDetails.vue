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
          :key="item.text"
          :class="index % 2 === 0 ? 'grey lighten-3' : 'white'"
        >
          {{ item.index }}
          <v-col cols="12" lg="3">
            <span>
              {{ $t(item.text) }}
            </span>
          </v-col>
          <v-col cols="12" lg="6" v-if="item.text !== 'tags'">
            <span>
              {{ item.value || '-' }}
            </span>
          </v-col>

          <v-col cols="12" lg="9" v-if="item.text === 'tags'">
            <template v-for="tag in item.value">
              <span v-if="item.value.length > 0" :key="tag.id">
                {{ tag.title }} -
              </span>
            </template>
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
        { text: 'shabak', value: this.data.shabak ? this.data.shabak : '' },
        {
          text: 'author',
          value: this.data.author ? this.data.author.title : '',
        },
        {
          text: 'writer',
          value: this.data.writer ? this.data.writer.title : '',
        },
        {
          text: 'publisher',
          value: this.data.publisher ? this.data.publisher.title : '',
        },
        {
          text: 'searcher',
          value: this.data.searcher ? this.data.searcher.title : '',
        },
        {
          text: 'translator',
          value: this.data.translator ? this.data.translator.title : '',
        },
        {
          text: 'category',
          value: this.data.category ? this.data.category.title : '',
        },
        { text: 'bookLang', value: this.$t(this.data.bookLang) },
        { text: 'tags', value: this.data.tags },
      ],
    };
  },
};
</script>
