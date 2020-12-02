<template>
  <div>
    <v-autocomplete
      v-model="selectedValue"
      :disabled="isUpdating"
      :items="options"
      outlined
      chips
      color="blue-grey lighten-2"
      :label="$t(placeHolder)"
      item-text="title"
      item-value="id"
      multiple
      :required="!validate"
      :rules="requireRules"
      :error="!validation"
      hide-details
      @change="sendValue"
      :height="height"
    >
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
      <template v-slot:item="data">
        <template>
          <v-list-item-content v-text="data.item.title"></v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
    <p v-if="!validation" class="red--text fn13">
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
      validation: this.validate,
      isUpdating: false,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      selectedValue: [],
      options: [
        { title: ' الیف شافاک ', id: ' 1' },
        { title: 'دن براون ', id: ' 12' },
        { title: 'پايولو کويیلو', id: ' 13' },
        { title: 'جوجو مویز', id: ' 14' },
        { title: ' جورج اورل', id: ' 14' },
      ],
    };
  },
  methods: {
    remove(item) {
      const index = this.selectedValue.indexOf(item.id);
      if (index >= 0) this.selectedValue.splice(index, 1);
    },
    sendValue() {
      this.$emit('sendValue', this.selectedValue);
      if (this.selectedValue.length > 0) {
        this.validation = true;
      }
    },
  },
  watch: {
    isUpdating(val) {
      if (val) {
        // eslint-disable-next-line no-return-assign
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    validate(newVal) {
      this.validation = newVal;
    },
  },
};
</script>
