<template>
  <v-card class="pa-4" :style="`border :1px solid ${this.module.bgColor}`">
    <v-card-actions :class="this.module.headerColor">
      <div class="white--text pa-0">
        <span class="font-weight-medium">
          <v-icon color="white">
            {{ this.module.icon }}
          </v-icon>
          {{ $t(this.module.name) }}
        </span>
      </div>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-form
      class="pt-6 d-flex justify-space-around"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <template v-for="item in module.items">
        <div :key="item.index" class="d-flex flex-column">
          <span class="pb-3 font-weight-medium">
            <v-icon>
              mdi-format-list-checks
            </v-icon>
            {{ $t(item.name) }}
          </span>
          <v-btn-toggle mandatory>
            <v-btn
              activeClass="green accent-3 innerEl"
              @change="changeAccess(item, true)"
            >
              <span>{{ $t('yes') }}</span>
              <!-- <v-icon>mdi-check-all</v-icon> -->
            </v-btn>
            <v-btn
              activeClass="red darken-1 innerEl"
              @change="changeAccess(item, false)"
            >
              <span>{{ $t('no') }}</span>
              <!-- <v-icon>mdi-cancel</v-icon> -->
            </v-btn>
          </v-btn-toggle>
        </div>
      </template>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'moduleAccessConfig',
  props: {
    module: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      toggle: [],
    };
  },
  methods: {
    changeAccess(item, status) {
      const accessModule = {
        moduleName: this.module.name,
        itemName: item.name,
        status,
      };

      this.$emit('setAccess', accessModule);
      console.log(accessModule);
    },
  },
};
</script>
<style lang="scss">
.innerEl {
  span,
  i {
    color: #fff;
  }
}
</style>
