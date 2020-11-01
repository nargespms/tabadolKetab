<template>
  <div>
    <v-autocomplete
      v-model="bookCats"
      :disabled="isUpdating"
      :items="categories"
      outlined
      chips
      color="blue-grey lighten-2"
      :label="$t('categorySend')"
      item-text="name"
      item-value="name"
      multiple
      :required="true"
      :rules="requireRules"
      :error="!validation"
      hide-details
      @change="sendValue"
    >
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
      <template v-slot:item="data">
        <template>
          <v-list-item-content v-text="data.item.name"></v-list-item-content>
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
  name: 'bookCatAutocomplete',
  props: {
    validate: {
      type: Boolean,
    },
  },
  data() {
    return {
      validation: this.validate,
      isUpdating: false,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      bookCats: [],
      categories: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1' },
        { name: 'Ali Connors', group: 'Group 1' },
        { name: 'Trevor Hansen', group: 'Group 1' },
        { name: 'Tucker Smith', group: 'Group 1' },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2' },
        { name: 'Jane Smith ', group: 'Group 2' },
        { name: 'John Smith', group: 'Group 2' },
        { name: 'Sandra Williams', group: 'Group 2 ' },
      ],
    };
  },
  methods: {
    remove(item) {
      const index = this.bookCats.indexOf(item.name);
      if (index >= 0) this.bookCats.splice(index, 1);
    },
    sendValue() {
      this.$emit('setBookCat', this.bookCats);
      if (this.bookCats.length > 0) {
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
