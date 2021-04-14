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
          <template v-for="item in items">
            <v-tab
              v-if="item.condition"
              :key="item.index"
              :class="$vuetify.breakpoint.xs ? 'mt-4' : ''"
              class="pl-4"
            >
              {{ $t(item.tab) }}
            </v-tab>
          </template>

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
              <addressCmp
                v-if="
                  item.tab === 'addresses' &&
                    (($route.name === 'profile' &&
                      $store.state.bookShop.userInfo.role === 'CLIENT') ||
                      $route.name === 'clientProfile')
                "
                :state="'list'"
                :toolBar="false"
                :clientId="$route.params.userId"
                :selective="false"
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
import addressCmp from '../address/addressCmp.vue';

export default {
  name: 'profilecmp',

  components: {
    addUser,
    userInfo,
    changePassword,
    addressCmp,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      isLoading: true,
      valid: true,
      saveSuccess: false,
      tab: null,
      items: [
        { tab: 'personalInformation', condition: true },
        {
          tab: 'edit',
          condition: true,
        },
        {
          tab: 'changePassword',
          condition: true,
        },
        {
          tab: 'addresses',
          condition:
            (this.$route.name === 'profile' &&
              this.$store.state.bookShop.userInfo.role === 'CLIENT') ||
            this.$route.name === 'clientProfile',
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
  mounted() {
    console.log(this.$route.name);
  },
};
</script>
<style lang="scss" scoped>
.v-btn,
.v-tab {
  letter-spacing: inherit;
}
</style>
