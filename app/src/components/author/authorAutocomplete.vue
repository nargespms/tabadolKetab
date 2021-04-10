<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      item-text="title"
      item-value="id"
      :label="$t(placeHolder)"
      outlined
      :height="height"
      @change="sendValue"
      :required="isRequire"
      :rules="isRequire ? requireRules : []"
      :multiple="isMultiple"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            (حداقل یک حرف را وارد نمایید)
          </v-list-item-title>
        </v-list-item>
      </template>

      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          :close="isMultiple"
          @click="data.select"
        >
          {{ data.item.title }}
        </v-chip>
      </template>

      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </template>

      <template v-if="clearable && this.model" v-slot:append>
        <v-icon @click="clear">mdi-close-circle-outline</v-icon>
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
    isMultiple: {
      type: Boolean,
    },
    clearable: {
      type: Boolean,
    },
    editDataId: {
      type: String,
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
    clear() {
      this.model = null;
      this.$emit('sendValue', this.model);
    },
    getAuthor() {
      const edittingAuthor = this.items.find(item => {
        return item.id === this.editDataId;
      });
      this.model = edittingAuthor.id;
      this.$emit('sendValue', this.model);
    },
    getData() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/authors').then(res => {
        if (res.status === 200) {
          this.items = res.data.authors;
          this.isLoading = false;
          if (this.editDataId.length > 0) {
            this.getAuthor();
          }
        }
      });
    },
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;
      this.$axios.get('/v1/api/tabaadol-e-ketaab/authors').then(res => {
        if (res.status === 200) {
          this.items = res.data.authors;
          this.isLoading = false;
        }
      });
    },
    isRequire(newVal) {
      this.localRequire = newVal;
    },
    editDataId() {
      this.getData();
    },
  },
  mounted() {
    if (this.editDataId) {
      this.getData();
    }
  },
};
</script>
