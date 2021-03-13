<template>
  <div>
    <dashboardTab />
  </div>
</template>

<script>
import dashboardTab from '../components/dashboard/dashboardTab.vue';

export default {
  name: 'dashboard',
  metaInfo: {
    title: 'داشبورد',
  },
  components: {
    dashboardTab,
  },
};
</script>
