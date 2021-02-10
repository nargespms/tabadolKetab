<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="10">
      <div class="pa-3 d-flex align-center ">
        <span class="font-weight-black"> {{ $t('payMethod') }} : </span>
        <v-radio-group
          v-model="payMethod"
          @change="setMethod"
          row
          class="pr-6"
          :rules="requireRule"
        >
          <template v-for="item in data">
            <v-radio
              :key="item.index"
              :label="$t(item)"
              :value="item"
              class="pr-6"
            ></v-radio>
          </template>
        </v-radio-group>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'payMethod',
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      payMethod: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  methods: {
    setMethod() {
      this.$emit('setMethod', this.payMethod);
    },
  },
};
</script>
