<template>
  <v-card class="pa-4">
    <v-card-actions class="teal mb-7">
      <v-card-title class="white--text pa-0">
        <span>
          گزارش دسته بندی های پرفروش
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
    <financeReportTable
      v-if="!isLoading"
      :columns="columns"
      :data="data"
      :module="'mostCategoryBuy'"
    />
  </v-card>
</template>

<script>
import financeReportTable from './financeReportTable.vue';
import rangeDatePickerCmp from '../structure/rangeDatePickerCmp.vue';

export default {
  name: 'categoryBuyReport',
  components: {
    financeReportTable,
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

      columns: [
        {
          text: 'radif',
        },
        {
          text: 'categoryName',
        },
        {
          text: 'number',
        },
        {
          text: 'totalBuy',
        },
      ],
      data: [
        {
          category: {
            name: 'مذهبی ',
          },
          number: 5,
          totalBuy: 120000,
        },
        {
          category: {
            name: 'اجتماعی ',
          },
          number: 10,
          totalBuy: 120000,
        },
        {
          category: {
            name: 'سیاسی ',
          },
          number: 9,
          totalBuy: 120000,
        },
      ],
    };
  },
  methods: {
    setDate(value) {
      console.log(value);
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
          this.reset();
          this.isLoading = false;
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
