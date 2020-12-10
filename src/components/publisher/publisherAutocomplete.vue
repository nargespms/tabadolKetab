<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      hide-details
      item-text="name"
      item-value="symbol"
      :label="$t(placeHolder)"
      outlined
      @change="sendValue"
      :required="validate"
      :rules="validate ? requireRules : []"
      multiple
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            {{ $t('noDataText') }}
            (حداقل یک حرف را وارد نمایید)
          </v-list-item-title>
        </v-list-item>
      </template>

      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ data.item.name }}
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <p v-if="validation" class="red--text fn13">
      {{ $t('thisFieldIsRequired') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'authorAutocomplete',
  props: {
    placeHolder: {
      type: String,
    },
    height: {
      type: Number,
      default: undefined,
    },
    validate: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      items: [],
      model: null,
      search: null,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      validation: this.validate,
    };
  },
  methods: {
    sendValue() {
      if (this.model && this.model.length > 0) {
        this.$emit('sendValue', this.model);
        this.validation = true;
      }
    },
    remove(item) {
      const index = this.model.indexOf(item.symbol);
      if (index >= 0) this.model.splice(index, 1);
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
    validate(newVal) {
      this.validation = newVal;
    },
  },
};
</script>
