<template>
  <div>
    <addAccessLevel :mode="'add'" />
  </div>
</template>

<script>
import addAccessLevel from '../../components/accessLevel/addAccessLevel.vue';

export default {
  name: 'accessLevelCreation',
  components: {
    addAccessLevel,
  },
};
</script>
