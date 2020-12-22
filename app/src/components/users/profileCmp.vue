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
        <v-container>
          <v-row>
            <v-tabs vertical color="teal">
              <v-avatar size="160">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <v-btn text>{{ $t('imageEditing') }} </v-btn>
              <v-tab>
                {{ $t('personalInformation') }}
              </v-tab>
              <v-tab>
                {{ $t('edit') }}
              </v-tab>
              <v-tab>
                {{ $t('changePassword') }}
              </v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <template>
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr v-for="item in info" :key="item.name">
                              <td>{{ item.name }}</td>
                              <td>{{ item.value }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </template>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <editUser :mode="'edit'" />
                    <addUser />
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <passwords :mode="'edit'" />
                    <div class="justify-center d-flex">
                      <v-btn color="success" class="mr-4">
                        {{ $t('save') }}
                      </v-btn>
                      <v-btn color="error" class="mr-4"
                        >{{ $t('resetForm') }}
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import editUser from './addUser.vue';
import passwords from '../userControls/passwords.vue';

export default {
  name: 'profilecmp',

  components: {
    editUser,
    passwords,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      info: [
        {
          name: 'نام',
          value: 'علی',
        },
        {
          name: 'نام خانوادگی',
          value: 'تبادلیان',
        },
        {
          name: 'جنسیت',
          value: 'جنسیت',
        },
        {
          name: 'کدملی',
          value: '0010020030',
        },
        {
          name: 'موبایل',
          value: '09121111111',
        },
        {
          name: 'تلفن ثابت',
          value: '02111111111',
        },
        {
          name: 'ایمیل',
          value: 'example@mail.com',
        },
        {
          name: 'نقش',
          value: 'نقش',
        },
        {
          name: 'وضعیت',
          value: 'فعال',
        },
        {
          name: 'آدرس',
          value: 'آدرس آدرس',
        },
        {
          name: 'کدپستی',
          value: 1234567890,
        },
        {
          name: 'توضیحات',
          value: 'توضیحات',
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.v-btn,
.v-tab {
  letter-spacing: inherit;
}
</style>
