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
            <v-col cols="12" md="3">
              <v-avatar size="160">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <v-btn class="mr-4 d-block ma-4">{{ $t('edit') }} </v-btn>
              <v-btn class="mr-4 d-block ma-4"
                >{{ $t('changePassword') }}
              </v-btn>
            </v-col>

            <v-col cols="12" md="9">
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
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'profilecmp',

  data() {
    return {
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
.v-btn {
  letter-spacing: inherit;
}
</style>
