<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <postPrintForm
      v-if="!isLoading && this.$route.name === 'printPostRequest'"
    />
  </div>
</template>

<script>
import postPrintForm from '../components/post/postPrintForm.vue';

export default {
  name: 'printForm',
  components: {
    postPrintForm,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    if (this.$route.name === 'printPostRequest') {
      this.isLoading = false;
    }
  },
};
</script>
