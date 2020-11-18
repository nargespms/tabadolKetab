<template>
  <div class="A4 pa-6">
    <div class="sheet padding-25mm ">
      <div class="br-3 fn18 pa-8">
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
                {{ $t(postReq.fullname) }}
              </span>
            </p>
            <p>
              {{ $t('landLane') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.landLane) }}
              </span>
            </p>
            <p>
              {{ $t('mobilephone') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.mobilephone) }}
              </span>
            </p>
            <p>
              {{ $t('nationalId') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.nationalId) }}
              </span>
            </p>

            <p>
              {{ $t('numbersOfBook') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.numbersOfBook) }}
              </span>
            </p>
            <p>
              {{ $t('address') }} &nbsp; : &nbsp;
              <span class="pr-4">
                {{ $t(postReq.address) }}
              </span>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" class="ma-auto text-center">
            <v-icon color="black" large>mdi-blur</v-icon>
            <v-icon color="black" large> mdi-blur</v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large>mdi-blur </v-icon>
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
            <p class="mt-8 pa-3 pb-16 br-1-b">{{ $t('description') }} :</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" class="ma-auto text-center">
            <v-icon color="black" large>mdi-blur</v-icon>
            <v-icon color="black" large> mdi-blur</v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large> mdi-blur </v-icon>
            <v-icon color="black" large>mdi-blur </v-icon>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <div class=" d-flex align-center ">
              <span class="font-weight-black"> {{ $t('recycle') }} : </span>
              <v-radio
                :label="$t('recieveBook')"
                value="recieveBook"
                class="pr-12"
              ></v-radio>
              <v-radio
                :label="$t('noProblem')"
                value="noProblem"
                class="pr-12"
              ></v-radio>
              <v-radio
                :label="$t('noProblemWithKnowing')"
                value="noProblemWithKnowing"
                class="pr-12"
              ></v-radio>
            </div>
          </v-col>
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
      postReq: {
        fullname: 'محدثه صباغی',
        landLane: '۰۲۱۳۴۵۶۷۸۹۸',
        mobilephone: '۰۹۱۲۳۴۵۶۱۲۳۴',
        nationalId: '۰۰۱۷۸۲۳۲۰۳۴۸',
        numbersOfBook: '۵۱',
        address: 'شهران خیابان طوقانی خیابان جهاد پلاک ۳۰ واحد ۷',
      },
    };
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
</style>
