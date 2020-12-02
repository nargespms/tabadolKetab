<template>
  <div>
    <v-autocomplete
      v-model="publisher"
      :disabled="isUpdating"
      :items="publishers"
      outlined
      color="blue-grey lighten-2"
      :label="$t('publisher')"
      item-text="name"
      item-value="name"
      :required="required"
      :rules="required ? requireRules : []"
      :error="required"
      hide-details
      @change="sendValue"
      :height="height"
    >
      <template v-slot:item="data">
        <template>
          <v-list-item-content v-text="data.item.name"></v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
    <p v-if="required" class="red--text fn13">
      {{ $t('thisFieldIsRequired') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'publisherAutocomplete',
  props: {
    required: {
      type: Boolean,
    },
    height: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      validation: this.required,
      isUpdating: false,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      publisher: '',
      publishers: [
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
    sendValue() {
      this.$emit('sendValue', this.publisher);
      if (this.publisher.length > 0) {
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
