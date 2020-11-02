<template>
  <v-row class="px-3 pb-6">
    <v-col
      cols="12"
      md="6"
      class=" pa-xl-0 pa-md-0  pa-sm-0 pt-0 pr-0 pl-0 pb-6 pb-sm-6"
    >
      <date-picker
        style="width:100%"
        v-model="date.fromDate"
        :placeholder="$t('fromDate')"
        :editable="true"
        :auto-submit="true"
        @change="submitDate"
        :class="!fromValid ? 'costum-error pt-2' : ''"
      >
        <div slot="label">
          <v-icon color="primary" size="26" class="mt-3">mdi-calendar</v-icon>
        </div>
      </date-picker>
      <p v-if="!fromValid" class="red--text fn13">
        {{ $t('thisFieldIsRequired') }}
      </p>
    </v-col>
    <v-col cols="12" md="6" class="pa-0 pr-md-4 pr-xl-4 pr-sm-0">
      <date-picker
        style="width:100%"
        v-model="date.toDate"
        :placeholder="$t('toDate')"
        :editable="true"
        :auto-submit="true"
        @change="submitDate"
        :class="!toValid ? 'costum-error pt-2' : ''"
      >
        <div slot="label">
          <v-icon color="primary" size="26" class="mt-3">mdi-calendar</v-icon>
        </div>
      </date-picker>
      <p v-if="!toValid" class="red--text fn13">
        {{ $t('thisFieldIsRequired') }}
      </p>
    </v-col>
  </v-row>
</template>
<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

export default {
  name: 'datePickerCmp',
  props: {
    fromValidate: {
      type: Boolean,
    },
    toValidate: {
      type: Boolean,
    },
  },
  data() {
    return {
      date: {
        fromDate: '',
        toDate: '',
      },
      fromValid: this.fromValidate,
      toValid: this.toValidate,
    };
  },
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  methods: {
    submitDate() {
      this.$emit('setDate', this.date);
      if (this.date.fromDate.length > 0) {
        this.fromValid = true;
      }
      if (this.date.toDate.length > 0) {
        this.toValid = true;
      }
    },
  },
  watch: {
    fromValidate(newVal) {
      this.fromValid = newVal;
    },
    toValidate(newVal) {
      this.toValid = newVal;
    },
  },
};
</script>
<style lang="scss">
.vpd-input-group input {
  border: 1px solid #aca6a6;
  border-radius: 4px;
  padding: 12px 50px 12px 16px;
  width: 100%;
}
.costum-error {
  .vpd-input-group input {
    border: 2px solid red;
  }
}
.costum-error {
  .vpd-input-group .v-icon {
    color: red !important;
  }
}

.vpd-input-group label {
  white-space: nowrap;
  border-radius: 0 3px 3px 0;
  position: absolute;
  right: 1px;
  top: 1px;
}
.vpd-icon-btn {
  background-color: transparent !important;
}
</style>
