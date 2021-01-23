<template>
  <v-row no-gutters class="justify-center">
    <span class="fn-25">
      🧑‍💻
    </span>
    <span class="fn-25">
      👨‍🔧
    </span>
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t(cardName) }}
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
            <span class="font-weight-black"> {{ $t('reciever') }} : </span>
            <v-radio-group v-model="reciever" row>
              <v-radio :label="$t('chooseUserorS')" value="notAll"></v-radio>
              <v-radio :label="$t('allStaffs')" value="staffs"></v-radio>
              <v-radio :label="$t('allClients')" value="clients"></v-radio>
            </v-radio-group>
          </div>
          <clientsAutoComplete
            ref="userAutocomplete"
            :isRequired="userValidate"
            class="py-6"
            v-if="reciever === 'notAll'"
            :placeHolder="'users'"
          />
          <v-text-field
            v-model="message.title"
            :rules="messageRules"
            :label="$t('title')"
            required
            outlined
            error-count="2"
            ><template v-slot:prepend-inner>
              <span class="red--text">
                *
              </span>
            </template></v-text-field
          >

          <v-textarea
            outlined
            required
            :rules="requireRule"
            name="input-7-4"
            :label="$t('messageText')"
            v-model="message.text"
          >
            <template v-slot:prepend-inner>
              <span class="red--text">
                *
              </span>
            </template>
          </v-textarea>
          <div class="d-flex align-center">
            <v-select
              :items="messageType"
              :label="$t('messageType')"
              outlined
              required="true"
              :rules="[v => !!v || `${this.$t('thisFieldIsRequired')}`]"
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
              <template v-slot:prepend-inner>
                <span class="red--text">
                  *
                </span>
              </template>
            </v-select>
            <datePickerCmp
              class="d-flex align-self-baseline pr-4 flex-column"
              ref="datePicker"
              :componenKey="dateKey"
              :placeHolderText="'sendDate'"
              :validate="Datevalidate"
              @setDate="setDate"
            />
          </div>
          <v-file-input
            outlined
            show-size
            multiple
            :label="$t('attachments')"
          ></v-file-input>
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-checkbox
                v-model="message.sms"
                :label="$t('sendSms')"
                required
                class="col-6 col-md-4"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="6" v-if="message.sms">
              <div class="alertMessage">
                <p class="font-weight-black">
                  <v-icon color="red"> fas fa-exclamation-triangle </v-icon>
                  {{ $t('becauseOfSMsMessageDoesntDelete') }}
                </p>
              </div>
            </v-col>
          </v-row>
          <div class="justify-center d-flex pt-2">
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
    <notifMessage
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import datePickerCmp from '../structure/datePickerCmp.vue';
import clientsAutoComplete from '../structure/clientsAutoComplete.vue';

export default {
  name: 'addMessageCmp',
  components: {
    notifMessage,
    datePickerCmp,
    clientsAutoComplete,
  },
  props: {
    mode: {
      type: String,
    },
    cardName: {
      type: String,
    },
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      messageRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      messageType: ['privateMessage', 'publicMessage'],
      users: ['user1', 'user2', 'user3', 'user4'],
      message: {
        title: '',
        text: '',
        messageType: null,
        sms: false,
        reciever: [],
      },
      reciever: 'notAll',
      Datevalidate: true,
      dateKey: 0,
      userValidate: true,
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
      if (this.reciever === 'notAll') {
        // user validation
        if (
          this.$refs.userAutocomplete.model === null ||
          this.$refs.userAutocomplete.model.length < 1
        ) {
          this.userValidate = true;
        } else {
          this.userValidate = false;
        }
      }

      if (
        this.$refs.datePicker.date.length < 1 ||
        this.$refs.datePicker.date === null
      ) {
        this.Datevalidate = false;
        this.dateKey = +1;
      }
      if (this.$refs.form.validate()) {
        if (this.mode === 'addPage') {
          this.saveSuccess = true;
          this.reset();
        }
        this.$emit('savedSuccessfully');
      } else {
        this.valid = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
      this.userValidate = true;
    },
    // date
    setDate(value) {
      // this valu is persian date
      // it should convert to gregorian
      console.log(value);
    },
  },
};
</script>
<style lang="scss">
.alertMessage {
  padding: 12px;
  border-radius: 4px;
  background-color: #ffdede;
  border: 1px solid red;
}
</style>
