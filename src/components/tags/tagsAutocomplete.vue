<template>
  <div>
    <v-autocomplete
      v-model="tags"
      :disabled="isUpdating"
      :items="tagsOption"
      outlined
      chips
      color="blue-grey lighten-2"
      :label="$t('tags')"
      item-text="title"
      item-value="id"
      multiple
      :required="true"
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
  name: 'tagsAutocomplete',
  props: {
    validate: {
      type: Boolean,
    },
    height: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      validation: this.validate,
      isUpdating: false,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      tags: [],
      tagsOption: [
        { title: 'کتاب پیشنهاد ما', id: ' 1' },
        { title: 'کتاب ما', id: ' 12' },
        { title: 'اهدایی', id: ' 13' },
        { title: 'منقضی', id: ' 14' },

        { title: 'Britta Holt', id: '25' },
        { title: 'Jane Smith ', id: '26' },
        { title: 'John Smith', id: '27' },
        { title: 'Sandra Williams', id: '28 ' },
      ],
    };
  },
  methods: {
    remove(item) {
      const index = this.tags.indexOf(item.id);
      if (index >= 0) this.tags.splice(index, 1);
    },
    sendValue() {
      this.$emit('getTag', this.tags);
      if (this.tags.length > 0) {
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
