<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="8" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('profile') }}
            </span>
          </v-card-title>
        </v-card-actions>

        <v-tabs
          :vertical="$vuetify.breakpoint.xs ? false : true"
          class="pa-3"
          color="teal"
          v-model="tab"
        >
          <v-tab
            v-for="item in items"
            :key="item.index"
            :class="$vuetify.breakpoint.xs ? 'mt-4' : ''"
            class="pl-4"
          >
            {{ $t(item.tab) }}
          </v-tab>

          <v-tabs-items v-model="tab" class="pr-5">
            <v-tab-item v-for="item in items" :key="item.index">
              <userInfo
                v-if="item.tab === 'personalInformation'"
                :data="data"
              />
              <addUser
                v-if="item.tab === 'edit'"
                :mode="'edit'"
                :editData="data"
                @reloadUserData="reloadUserData"
              />
              <changePassword
                v-if="item.tab === 'changePassword'"
                @success="success"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import addUser from './addUser.vue';
import userInfo from './userInfo.vue';
import changePassword from './changePassword.vue';

export default {
  name: 'profilecmp',

  components: {
    addUser,
    userInfo,
    changePassword,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      tab: null,
      items: [
        { tab: 'personalInformation' },
        {
          tab: 'edit',
        },
        {
          tab: 'changePassword',
        },
      ],
    };
  },
  methods: {
    reloadUserData() {
      this.tab = 'personalInformation';
      this.$emit('reloadUserData');
    },
    success() {
      this.tab = 'personalInformation';
      this.$emit('success');
    },
  },
};
</script>
<style lang="scss" scoped>
.v-btn,
.v-tab {
  letter-spacing: inherit;
}
</style>
