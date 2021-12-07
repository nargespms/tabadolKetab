<template>
  <v-card class="pa-4 mb-5">
    <v-card-actions class="teal mb-7">
      <v-card-title class="white--text pa-0">
        <span>
          گزارش کاربران با بیشترین خرید
        </span>
      </v-card-title>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-form class="filterReport" lazy-validation v-model="valid" ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <rangeDatePickerCmp
            ref="datePicker"
            :fromValidate="fromDateValidation"
            :toValidate="toDateValidation"
            :key="dateKey"
            @setDate="setDate"
          />
          <span>
            <v-icon small color="red"> fas fa-exclamation-triangle </v-icon>
            <span>
              بازه زمانی حداکثر تا سه ماه میباشد
            </span>
          </span>
        </v-col>

        <v-col cols="12" md="1">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4 py-7 px-8"
            @click="showResult"
          >
            {{ $t('show') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-row v-if="!isLoading" class="justify-center">
      <v-col v-for="user in bestBuyers" :key="user.id" cols="12" lg="2">
        <statusCard
          :lable="` ${user.firstName}${user.lastName}`"
          :number="`${moneyFormat(user.total)} ${$t('rial')}`"
          :color="'#0277BD'"
        />
      </v-col>
      <!-- <v-col cols="12" lg="4">
        <statusCard
          :lable="
            `بیشترین فروش /n ${data.bestBuyer.firstName}${data.bestBuyer.lastName}`
          "
          :number="data.bestSeller.total"
          :color="'#0277BD'"
        />
      </v-col> -->
    </v-row>
  </v-card>
</template>

<script>
import statusCard from '../dashboard/statusCard.vue';
import rangeDatePickerCmp from '../structure/rangeDatePickerCmp.vue';
import dateTime from '../../mixins/dateTime.js';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'userBuyReport',
  components: {
    statusCard,

    rangeDatePickerCmp,
  },
  data() {
    return {
      valid: true,
      isLoading: true,
      // rangepcker data
      dateKey: 0,
      fromDateValidation: true,
      toDateValidation: true,

      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      startDate: '',
      endDate: '',
      type: '',
      columns: [
        {
          text: 'radif',
        },
        {
          text: 'userName',
        },
        {
          text: 'totalBuy',
        },
      ],
      bestBuyers: [],
    };
  },
  mixins: [dateTime, moneyFormat],
  methods: {
    setDate(value) {
      if (value.fromDate.length > 0) {
        this.startDate = new Date(
          this.persionToGregorian(value.fromDate)
        ).toISOString();
      }
      if (value.toDate.length > 0) {
        this.endDate = new Date(
          this.persionToGregorian(value.toDate)
        ).toISOString();
      }
    },
    showResult() {
      this.$refs.form.validate();
      // date picker validation
      if (
        this.$refs.datePicker.date.fromDate.length < 1 ||
        this.$refs.datePicker.date === null
      ) {
        this.fromDateValidation = false;
      } else {
        this.fromDateValidation = true;
      }
      if (
        this.$refs.datePicker.date === null ||
        this.$refs.datePicker.date.toDate.length < 1
      ) {
        this.toDateValidation = false;
      } else {
        this.toDateValidation = true;
      }

      if (this.toDateValidation && this.fromDateValidation) {
        // formvalidation
        if (this.$refs.form.validate()) {
          this.$axios
            .get('/v1/api/tabaadol-e-ketaab/report/best-buyers', {
              params: {
                filter: {
                  startDate: this.startDate,
                  endDate: this.endDate,
                },
              },
            })
            .then(res => {
              if (res.status === 200) {
                this.bestBuyers = res.data.result;
                // this.reset();
                this.isLoading = false;
              }
            });
        } else {
          this.valid = false;
        }
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
      this.dateKey = +1;
      this.toDateValidation = true;
      this.fromDateValidation = true;
    },
  },
};
</script>
