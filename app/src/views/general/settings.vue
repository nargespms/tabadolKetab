<template>
  <generalSettings
    v-if="!isLoading"
    :data="setting"
    @reloadSetting="getSettingData"
  />
</template>

<script>
import generalSettings from '../../components/settings/generalSettings.vue';

export default {
  name: 'settings',
  metaInfo: {
    title: 'تنظیمات',
  },
  components: {
    generalSettings,
  },
  data() {
    return {
      setting: {},
      isLoading: true,
    };
  },
  methods: {
    getSettingData() {
      this.$axios.get('/v1/api/tabaadol-e-ketaab/setting').then(res => {
        if (res.status === 200) {
          this.setting = res.data;
          this.isLoading = false;
          console.log(res);
        }
      });
    },
  },
  mounted() {
    this.getSettingData();
  },
};
</script>
