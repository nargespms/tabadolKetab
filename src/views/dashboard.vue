<template>
  <div>
    <div class="ma-auto text-center pa-6">
      <div>admin --> 🧑‍💻</div>
      <div>tabadolStaff --> 👨‍🔧</div>
      <div>client --> 👨‍💼</div>
    </div>
    <dashboardTab />

    <!-- <template v-slot:prepend>
      <span class="fn-25">
        🧑‍💻
      </span>
    </template> -->

    <!-- <span class="fn-25">
       👨‍💼
      </span> -->
    <!-- <span class="fn-25">
       👨‍🔧
      </span> -->
  </div>
</template>

<script>
import dashboardTab from '../components/dashboard/dashboardTab.vue';

export default {
  name: 'dashboard',

  components: {
    dashboardTab,
  },
};
</script>
