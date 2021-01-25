<template>
  <div>
    <addAccessLevel :mode="'add'" @reload="reload" :key="componentKey" />
  </div>
</template>

<script>
import addAccessLevel from '../../components/accessLevel/addAccessLevel.vue';

export default {
  name: 'accessLevelCreation',
  components: {
    addAccessLevel,
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    reload() {
      console.log('reload');
      this.componentKey += 1;
      console.log(this.componentKey);
    },
  },
};
</script>
