<template>
  <div>
    <span v-if="editData">
      {{ dateComming }}
    </span>
    <date-picker
      v-model="date"
      :placeholder="$t(placeHolderText)"
      :editable="true"
      :auto-submit="true"
      @change="submitDate"
      :class="valid ? 'costum-error pt-2' : ''"
      :clearable="true"
    >
      <div slot="label">
        <span v-if="isRequired" class="red--text">
          *
        </span>
        <v-icon color="primary" size="26" class="mt-3">mdi-calendar</v-icon>
      </div>
    </date-picker>
    <p v-if="valid" class="red--text fn13">
      {{ $t('thisFieldIsRequired') }}
    </p>
  </div>
</template>
<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

export default {
  name: 'datePickerCmp',
  props: {
    placeHolderText: {
      type: String,
    },
    isRequired: {
      type: Boolean,
    },
    editData: {
      type: String,
    },
  },

  data() {
    return {
      date: '',
      dateComming: '',
      valid: this.validate,
    };
  },
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  methods: {
    submitDate() {
      this.$emit('setDate', this.date);
    },
    clearDate() {
      this.date = '';
    },
  },
  watch: {
    isRequired(newVal) {
      this.valid = newVal;
    },
    date(newVal) {
      this.$emit('setDate', newVal);
      this.dateComming = '';
    },
    editData(newVal) {
      this.dateComming = new this.$persianDate(new Date(newVal)).format('L');
    },
  },
  mounted() {
    if (this.editData) {
      this.dateComming = new this.$persianDate(new Date(this.editData)).format(
        'L'
      );
    }
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
.form-control {
  display: block;
  max-width: 100%;
}
.vpd-input-group {
  display: block;
}
.vpd-clear-btn {
  font-size: 18px;
  margin-top: 10px;
  margin-left: 4px;
}
</style>
