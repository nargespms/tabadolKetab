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
      :required="isRequired"
      :rules="isRequired ? requireRules : []"
      :dynamicClass="dynamicClass"
      :hint="hint"
      :persistentHint="persistentHint"
      :disabled="disable"
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
      <template v-if="isRequired" v-slot:prepend-inner>
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
  name: 'rolesAutoComplete',
  props: {
    placeHolder: {
      type: String,
    },
    height: {
      type: Number,
      default: undefined,
    },
    isRequired: {
      type: Boolean,
    },
    disable: {
      type: Boolean,
    },
    dynamicClass: {
      type: String,
    },
    hint: {
      type: String,
      default: '',
    },
    persistentHint: {
      type: Boolean,
      default: false,
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
      localRequire: this.isRequired,
    };
  },
  methods: {
    sendValue() {
      if (this.model && this.model.length > 0) {
        this.$emit('setRole', this.model);
        this.localRequire = true;
      }
    },
    clear() {
      this.model = '';
      this.$emit('setRole', this.model);
    },
    remove(item) {
      const index = this.model.indexOf(item.symbol);
      if (index >= 0) this.model.splice(index, 1);
    },
    getRole() {
      const edittingRole = this.items.find(item => {
        return item.id === this.editDataId;
      });
      this.model = edittingRole.id;
      this.$emit('setRole', this.model);
    },
    getData() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/roles').then(res => {
        if (res.status === 200) {
          this.items = res.data.roles;
          this.isLoading = false;
          if (this.editDataId.length > 0) {
            this.getRole();
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
      this.$axios.get('/v1/api/tabaadol-e-ketaab/roles').then(res => {
        console.log(res);
        if (res.status === 200) {
          this.items = res.data.roles;
          this.isLoading = false;
        }
      });
    },
    isRequired(newVal) {
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
