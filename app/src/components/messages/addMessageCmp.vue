<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-col cols="12" v-if="message.sms && mode === 'edit'">
        <div class="alertMessage text-center">
          <p class="font-weight-black">
            <v-icon color="red"> fas fa-exclamation-triangle </v-icon>
            {{ $t('becauseOfSMsMessageDoesntDelete') }}
          </p>
        </div>
      </v-col>
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
              <v-radio :label="$t('allStaffs')" value="allStaffs"></v-radio>
              <v-radio :label="$t('allClients')" value="allClients"></v-radio>
            </v-radio-group>
          </div>
          <clientsAutoComplete
            @setUser="setClient"
            v-if="reciever === 'notAll'"
            :placeHolder="'clients'"
            :isMultiple="true"
            :editDataId="
              mode === 'edit' && message.clientId ? message.clientId : ''
            "
          />
          <staffsAutoComplete
            v-if="reciever === 'notAll'"
            @setStaff="setStaff"
            :placeHolder="'staffs'"
            :isMultiple="true"
            :editDataId="
              mode === 'edit' && message.staffId ? message.staffId : ''
            "
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
              v-model="message.type"
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
              :key="dateKey"
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
    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideNotif"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import datePickerCmp from '../structure/datePickerCmp.vue';
import clientsAutoComplete from '../structure/clientsAutoComplete.vue';
import staffsAutoComplete from '../structure/staffsAutoComplete.vue';
import dateTime from '../../mixins/dateTime.js';

export default {
  name: 'addMessageCmp',
  components: {
    notifMessage,
    datePickerCmp,
    clientsAutoComplete,
    staffsAutoComplete,
  },
  mixins: [dateTime],
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
      messageType: ['PRIVATE', 'PUBLIC'],
      users: ['user1', 'user2', 'user3', 'user4'],
      message: {
        title: '',
        text: '',
        type: null,
        sms: false,
      },
      reciever: 'notAll',
      Datevalidate: true,
      dateKey: 0,
      // error
      errorEnable: false,
      errorMsg: '',
    };
  },
  methods: {
    messagesList() {
      this.$router.push({
        name: 'messagesList',
      });
    },
    setStaff(value) {
      console.log(value);
      this.message.reciverStaffs = value;
    },
    setClient(value) {
      console.log(value);
      this.message.reciverClients = value;
    },
    setDate(value) {
      console.log(value);
      this.message.sendDate = new Date(
        this.persionToGregorian(value)
      ).toISOString();
    },
    validate() {
      this.$refs.form.validate();
      console.log(this.$refs.datePicker.date);

      if (
        this.$refs.datePicker.date.length < 1 ||
        this.$refs.datePicker.date === null
      ) {
        this.Datevalidate = false;
        this.dateKey += 1;
      }
      if (this.$refs.form.validate()) {
        // reciver formatt
        if (this.reciever === 'allStaffs') {
          this.message.allStaffs = true;
        } else if (this.reciever === 'allClients') {
          this.message.allClients = true;
        }

        if (this.mode === 'add') {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/message', {
              ...this.message,
            })
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                this.reset();
                this.$emit('savedSuccessfully');
              }
            })
            .catch(e => {
              if (e.response.status === 422) {
                this.errorEnable = true;
                this.errorMsg = e.response.data.message;
              }
            });
        }
        if (this.mode === 'edit') {
          this.$axios
            .put(
              `/v1/api/tabaadol-e-ketaab/message/${this.$route.params.messageId}`,
              {
                ...this.message,
              }
            )
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                this.$router.push({
                  path: '/messagesList',
                });
                this.reset();
                this.$emit('savedSuccessfully');
              }
            })
            .catch(e => {
              if (e.response.status === 404) {
                this.errorEnable = true;
                this.errorMsg = 'canNotBeEditted';
              }
            });
        }
      } else {
        this.valid = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      delete this.message.reciverClients;
      delete this.message.reciverStaffs;
      delete this.message.reciverStaffs;
      delete this.message.allStaffs;
      delete this.message.allClients;
      this.dateKey += 1;
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    getMessage() {
      this.$axios
        .get(
          `/v1/api/tabaadol-e-ketaab/message/${this.$route.params.messageId}`
        )
        .then(res => {
          if (res.status === 200) {
            this.message = res.data;
          }
        });
    },
  },
  mounted() {
    if (this.mode === 'edit') {
      this.getMessage();
    }
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
