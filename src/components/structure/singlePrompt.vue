<template>
  <v-card>
    <div class="pa-4 d-flex">
      <v-text-field
        :label="$t(label)"
        outlined
        @keyup.enter="setValue"
        v-model="value"
        required
        :rules="requireRule"
      >
      </v-text-field>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            rounded
            color="green"
            left
            fab
            absolute
            class="pointer"
            v-bind="attrs"
            v-on="on"
            @click="setValue"
          >
            <v-icon color="white"> mdi-checkbox-marked-outline</v-icon>
          </v-btn>
        </template>
        {{ $t('save') }}
      </v-tooltip>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'singlePrompt',
  props: {
    label: {
      type: String,
    },
    data: {
      type: String,
    },
  },
  data() {
    return {
      value: this.data,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  watch: {
    data(newVal) {
      this.value = newVal;
    },
  },
  methods: {
    setValue() {
      this.$emit('setValue', this.value);
    },
  },
};
</script>
