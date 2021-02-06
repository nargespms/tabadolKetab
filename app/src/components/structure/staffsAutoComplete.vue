<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      item-text="fullName"
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
      :multiple="isMultiple"
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
          :close="isMultiple"
          @click="data.select"
        >
          {{ data.item.fullName }}
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.fullName"></v-list-item-title>
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
  name: 'staffsAutocomplete',
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
    isMultiple: {
      type: Boolean,
      default: false,
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
        this.$emit('setStaff', this.model);
        this.localRequire = true;
      }
    },

    clear() {
      this.model = '';
      this.$emit('setStaff', this.model);
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;
      this.$axios.get('/v1/api/tabaadol-e-ketaab/staffs').then(res => {
        if (res.status === 200) {
          this.items = res.data.staffs.map(name => ({
            id: name.id,
            fullName: `${name.firstName} ${name.lastName}`,
          }));
          console.log(this.items);
          // this.items = res.data.staffs;
          this.isLoading = false;
        }
      });
    },
    isRequired(newVal) {
      this.localRequire = newVal;
    },
  },
};
</script>
