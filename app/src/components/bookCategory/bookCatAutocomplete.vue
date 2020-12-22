<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-selected
      item-text="name"
      item-value="symbol"
      :label="$t('category')"
      outlined
      @change="sendValue"
      :require="isRequire"
      :rules="isRequire ? requireRules : []"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            حداقل یک حرف را وارد نمایید
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
      <template v-if="isRequire" v-slot:prepend-inner>
        <span class="red--text">
          *
        </span>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'bookCatAutocomplete',
  props: {
    height: {
      type: Number,
    },
    isRequire: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      items: [],
      model: null,
      search: null,
      localRequire: this.isRequire,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  methods: {
    sendValue() {
      if (this.model && this.model.length > 0) {
        this.$emit('setBookCat', this.model);
        this.localRequire = true;
      }
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;

      // Lazily load input items
      fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(res => res.clone().json())
        .then(res => {
          this.items = res;
        })
        .catch(err => {
          console.log(err);
        })
        // eslint-disable-next-line no-return-assign
        .finally(() => (this.isLoading = false));
    },
    isRequire(newVal) {
      this.localRequire = newVal;
    },
  },
};
</script>
