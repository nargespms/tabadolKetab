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
      v-if="mode === 'edit'"
      class="pt-6 d-flex justify-space-around flex-wrap"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <template v-for="item in data.items">
        <roleAccessBut
          class="mb-4"
          :mode="mode"
          :item="item"
          :key="item.index"
          @changeAccess="changeAccess"
        />
      </template>
    </v-form>
    <v-form
      v-else
      class="pt-6 d-flex justify-space-around"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <template v-for="item in module.items">
        <roleAccessBut
          class="mb-4"
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
    data: {
      type: Object,
    },
    mode: {
      type: String,
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
      editData: this.data,
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
  watch: {
    data(newVal) {
      this.editData = newVal;
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
