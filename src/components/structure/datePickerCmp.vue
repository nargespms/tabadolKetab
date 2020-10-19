<template>
  <div>
    <date-picker  v-model="date"
                  :placeholder="$t(placeHolderText)"
                  :editable="true"
                  :auto-submit="true"
                  @change="submitDate"
                  :class="!valid ? 'costum-error pt-2': ''"
      >

      <div slot="label">
        <v-icon color="primary" size="26" class="mt-3">mdi-calendar</v-icon>
      </div>

    </date-picker>
    <p v-if="!valid" class="red--text fn13">
      {{$t('thisFieldIsRequired')}}
    </p>
  </div>
</template>
<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

export default {
  name:'datePickerCmp',
  props:{
    placeHolderText:{
      type:String
    },
    validate:{
      type:Boolean,
    },
  },
  data () {
    return {
      date: '',
      valid:this.validate,
    };
  },
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  methods:{
    submitDate(){
      this.$emit('setDate', this.date);
        this.valid = true;
    }
  },
  watch: {
    validate(newVal){
      this.valid = newVal;
    }
  },
};
</script>


<style lang="scss">
.vpd-input-group input {
  border:1px solid #aca6a6;
  border-radius: 4px;
  padding: 12px 50px 12px 16px;

}
.costum-error {
  .vpd-input-group input {
    border:2px solid red;
  }
}
.costum-error {
  .vpd-input-group .v-icon{
    color: red!important;
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
   background-color: transparent!important;
 }

</style>
