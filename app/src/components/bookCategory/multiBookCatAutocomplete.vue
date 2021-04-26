<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      hide-selected
      item-text="title"
      item-value="id"
      :placeholder="$t('category')"
      :prefix="allSelected ? '' : $t('category')"
      outlined
      @change="sendValue"
      :require="isRequire"
      :rules="isRequire ? requireRules : []"
      :height="model.length < 3 || allSelected ? height : undefined"
      multiple
      class="multiBookCat"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            حداقل یک حرف را وارد نمایید
          </v-list-item-title>
        </v-list-item>
      </template>

      <template v-slot:selection="data">
        <v-chip
          v-if="!allSelected"
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          {{ data.item.title }}
        </v-chip>
      </template>

      <template v-slot:prepend-item v-if="this.items.length > 0">
        <v-list-item ripple @click="toggle">
          <v-list-item-action>
            <v-icon :color="model.length > 0 ? 'indigo darken-4' : ''">{{
              icon
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('allCategories') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
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
        <span v-if="allSelected">
          <v-chip @click:close="clear()">
            {{ $t('allCategories') }}
          </v-chip>
        </span>
      </template>

      <template v-slot:append v-if="this.model.length > 0">
        <v-icon @click="clear">mdi-close-circle-outline</v-icon>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'multiBookCategoryAutocomplete',
  props: {
    height: {
      type: Number,
    },
    isRequire: {
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
      model: [],
      search: null,
      localRequire: this.isRequire,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  computed: {
    icon() {
      if (this.allSelected) return 'mdi-close-box';
      return 'mdi-checkbox-blank-outline';
    },
    allSelected() {
      return this.model.length === this.items.length && this.model.length > 0;
    },
  },
  methods: {
    sendValue() {
      if (this.model && this.model.length > 0) {
        this.$emit('sendValue', this.model);
        this.localRequire = true;
      }
    },
    clear() {
      this.model = [];
      this.$emit('sendValue', this.model);
    },
    remove(item) {
      const index = this.model.indexOf(item.id);
      if (index >= 0) this.model.splice(index, 1);
    },
    getCategory() {
      const edittingCategory = this.items.find(item => {
        return item.id === this.editDataId;
      });
      this.model = edittingCategory.id;
      this.$emit('sendValue', this.model);
    },
    getData() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/categories').then(res => {
        if (res.status === 200) {
          this.items = res.data.categories;
          this.isLoading = false;
          if (this.editDataId.length > 0) {
            this.getCategory();
          }
        }
      });
    },
    toggle() {
      if (this.allSelected) {
        this.model = [];
      } else {
        this.model = this.items.map(cat => {
          return cat.id;
        });
      }
      this.$emit('sendValue', this.model);
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;
      this.$axios.get('/v1/api/tabaadol-e-ketaab/categories').then(res => {
        console.log(res);
        if (res.status === 200) {
          this.items = res.data.categories;
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
<style lang="scss">
.multiBookCat {
  .v-input__prepend-inner {
    .v-chip {
      margin-top: -6px;
    }
  }
}
</style>
