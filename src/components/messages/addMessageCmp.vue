<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('CreateMessage') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="messagesList">
                  fa fa-table</v-icon
                >
              </v-btn>
            </template>
            <span>
              {{ $t('MessagesList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form class="pt-6" ref="form" v-model="valid" lazy-validation>
          <div class="recieveUserWrap d-flex align-center">
            <span class="font-weight-black">
              {{$t('reciever')}} :
            </span>
              <v-radio-group
                v-model="reciever"
                row
              >
                <v-radio
                  :label="$t('chooseUserorS')"
                  value="notAll"
                ></v-radio>
                <v-radio
                  :label="$t('allStaffs')"
                  value="staffs"
                ></v-radio>
                <v-radio
                  :label="$t('allClients')"
                  value="clients"
                ></v-radio>
              </v-radio-group>
          </div>
          <usersAutoComplete v-if="reciever === 'notAll'"/>
          <v-text-field
            v-model="message.title"
            :rules="messageRules"
            :label="$t('title')"
            required
            outlined
            error-count="2"
          ></v-text-field>

          <v-textarea
            outlined
            required
            :rules="requireRule"
            name="input-7-4"
            :label="$t('summaryText')"
            v-model="message.text"
          ></v-textarea>
          <div class="d-flex align-center" >
            <v-select
              :items="messageType"
              :label="$t('messageType')"
              outlined
              required="true"
              :rules="[(v) => !!v || `${this.$t('thisFieldIsRequired')}`]"
            >
              <template v-slot:item="{ item }">
                <span>
                  {{ $t(item) }}
                </span>
              </template>
              <template v-slot:selection="{ item }">
                <span>
                  {{ $t(item) }}
                </span>
              </template>
            </v-select>
            <dataPickerCmp
              class="d-flex align-self-baseline pr-4 flex-column"
              ref="datePicker"
              :componenKey="dateKey"
              :placeHolderText="'sendDate'"
              :validate="Datevalidate"
              @setDate="setDate"
            />
          </div>
          <v-file-input outlined show-size multiple :label="$t('attachments')"></v-file-input>
          <v-row no-gutters>
            <v-col cols="6" md="4">
              <v-checkbox
                v-model="message.sms"
                :label="$t('sendSms')"
                required
                class="col-6 col-md-4"
              ></v-checkbox>
            </v-col>
          </v-row>
          <div class="justify-center d-flex">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ $t('save') }}
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset"
              >{{ $t('resetForm') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
    <successNotif
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
    />
  </v-row>
</template>


<script>
import successNotif from '../structure/successNotif.vue';
import dataPickerCmp from '../structure/datePickerCmp.vue';
import usersAutoComplete from '../structure/usersAutoComplete.vue';

export default {
  name: 'addMessageCmp',
  components: {
    successNotif,
    dataPickerCmp,
    usersAutoComplete
  },
  props: {
    mode: {
      type: String,
    },
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      messageRules: [
        (v) => !!v || `${this.$t('thisFieldIsRequired')}`,
        (v) => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      requireRule: [(v) => !!v || `${this.$t('thisFieldIsRequired')}`],
      messageType: ['privateMessage', 'publicMessage'],
      users:['user1', 'user2', 'user3', 'user4'],
      message: {
        title: '',
        text: '',
        messageType: null,
        sms: false,
        reciever:[],
      },
      reciever:'notAll',
      Datevalidate:true,
      dateKey:0,
    };
  },
  methods: {
    messagesList() {
      this.$router.push({
        name: 'messagesList',
      });
    },
    validate() {
      this.$refs.form.validate();
      console.log(this.$refs.datePicker.date);
      if(this.$refs.datePicker.date.length<1 || this.$refs.datePicker.date === null) {
        this.Datevalidate = false;
        this.dateKey =+1;
      }
      if(this.$refs.form.validate()) {
        if (this.mode === 'addPage') {
          this.saveSuccess = true;
          this.reset();
        }
        this.$emit('savedSuccessfully');
      }else {
        this.valid = false
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    // date
    setDate(value){
      // this valu is persian date
      // it should convert to gregorian
      console.log(value);
    }
  },

};
</script>
