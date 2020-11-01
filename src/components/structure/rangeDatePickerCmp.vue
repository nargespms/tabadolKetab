<template>
  <v-row no-gutters>
    <v-col cols="12" md="6">
      <date-picker
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
    <v-col cols="12" md="6">
      <date-picker
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
