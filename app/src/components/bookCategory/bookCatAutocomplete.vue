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
      :label="$t('category')"
      outlined
      @change="sendValue"
      :require="isRequire"
      :rules="isRequire ? requireRules : []"
      :height="height"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            حداقل یک حرف را وارد نمایید
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ item }">
        {{ item.title }}
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
      <template v-slot:append v-if="this.model">
        <v-icon @click="clear">mdi-close-circle-outline</v-icon>
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
      localRequire: this.isRequire,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
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
      this.model = '';
      this.$emit('sendValue', this.model);
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
