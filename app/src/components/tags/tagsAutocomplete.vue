<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      item-text="name"
      item-value="id"
      :label="$t(placeHolder)"
      outlined
      @change="sendValue"
      :required="isRequire"
      :rules="isRequire ? requireRules : []"
      multiple
      :height="height"
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
          {{ data.item.title }}
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
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
  name: 'authorAutocomplete',
  props: {
    placeHolder: {
      type: String,
    },
    height: {
      type: Number,
      default: undefined,
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
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      localRequire: this.isRequire,
    };
  },
  methods: {
    sendValue() {
      if (this.model && this.model.length > 0) {
        this.$emit('sendValue', this.model);
        this.localRequire = true;
      }
    },
    remove(item) {
      const index = this.model.indexOf(item.id);
      if (index >= 0) this.model.splice(index, 1);
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;
      this.$axios.get('/v1/api/tabaadol-e-ketaab/tags').then(res => {
        console.log(res);
        if (res.status === 200) {
          this.items = res.data.tags;
          this.isLoading = false;
        }
      });
    },
    isRequire(newVal) {
      this.localRequire = newVal;
    },
  },
};
</script>
