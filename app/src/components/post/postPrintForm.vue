<template>
  <div class="A5 pa-6">
    <div class="sheet padding-25mm ">
      <div class="br-3 fn18 pa-8" v-if="!isLoading">
        <v-row>
          <v-col cols="12" md="4"> </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon>mdi-vanish </v-icon>
            {{ $t('postRequest') }} <v-icon>mdi-vanish </v-icon></v-col
          >
          <v-col cols="12" md="4" class="text-left">
            <span> {{ $t('date') }} : </span>
            {{ new Date().toLocaleDateString('fa') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <p>
              {{ $t('fullname') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ postReq.client.firstName }}
                {{ postReq.client.lastName }}
              </span>
            </p>
            <p class="w250 ">
              {{ $t('mobile') }} &nbsp; : &nbsp;
              <span class="pr-4 numberDir">
                {{ postReq.client.mobile }}
              </span>
            </p>

            <p>
              {{ $t('nationalId') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.client.nationalId) }}
              </span>
            </p>

            <p>
              {{ $t('numbersOfBook') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.books.length) }}
              </span>
            </p>
            <p>
              {{ $t('address') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.address.address) }}
              </span>
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <span>
              {{ $t('postSentDate') }} : &nbsp;
              <span class="pr-6">
                /
              </span>
              <span class="pr-6">
                /
              </span>
            </span>
            <div class="py-8 d-flex align-center ">
              <v-radio :label="$t('هماهنگی شد')"></v-radio>
              <v-radio :label="$t('کنسل شد')" class="pr-12"></v-radio>
              <v-radio :label="$t('دریافت شد')" class="pr-12"></v-radio>
            </div>
            <p class="mt-8 pa-3 pb-16 br-1-b">
              {{ $t('description') }} :
              <span>
                {{ postReq.description }}
              </span>
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <div class=" d-flex align-center ">
              <span class="font-weight-black"> {{ $t('recycle') }} : </span>
              <v-radio
                :label="$t('RECEIVEBOOK')"
                value="RECEIVEBOOK"
                class="pr-12"
              ></v-radio>
              <v-radio
                :label="$t('NOPROBLEM')"
                value="NOPROBLEM"
                class="pr-12"
              ></v-radio>
              <v-radio
                :label="$t('NOPROBLEMIFASKED')"
                value="NOPROBLEMIFASKED"
                class="pr-12"
              ></v-radio>
            </div>
          </v-col>
        </v-row>
        <v-row class="py-12">
          <v-col cols="12" md="6" class="text-center">
            امضا درخواست کننده</v-col
          >
          <v-col cols="12" md="6" class="text-center"> امضا تحویل گیرنده</v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postPrintForm',
  data() {
    return {
      isLoading: true,
      postReq: {
        // fullname: 'محدثه صباغی',
        // landLane: '۰۲۱۳۴۵۶۷۸۹۸',
        // mobilephone: '۰۹۱۲۳۴۵۶۱۲۳۴',
        // nationalId: '۰۰۱۷۸۲۳۲۰۳۴۸',
        // numbersOfBook: '۵۱',
        // address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
      },
    };
  },
  mounted() {
    this.$axios
      .get(`/v1/api/tabaadol-e-ketaab/order/${this.$route.params.postId}`)
      .then(res => {
        if (res.status === 200) {
          this.postReq = res.data;
          this.orderItems = res.data.books;

          this.isLoading = false;
        }
      });
  },
};
</script>
<style lang="scss">
.br-3 {
  border: 3px solid #404040;
}
.br-1-b {
  border: 1px solid #8f8f8f;
}
.w250 {
  width: 250px;
}
</style>
