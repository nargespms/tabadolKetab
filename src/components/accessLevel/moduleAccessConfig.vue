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
        <roleAccessBut
          :item="item"
          :key="item.index"
          @changeAccess="changeAccess"
        />
      </template>
    </v-form>
  </v-card>
</template>

<script>
import roleAccessBut from './roleAccessBut.vue';

export default {
  name: 'moduleAccessConfig',
  props: {
    module: {
      type: Object,
    },
  },
  components: {
    roleAccessBut,
  },
  data() {
    return {
      valid: true,
      toggle: [],
      state: undefined,
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
