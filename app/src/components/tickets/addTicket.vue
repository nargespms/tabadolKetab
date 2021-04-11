<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('AddTicket') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="ticketsList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('TicketsList') }}
            </span>
          </v-tooltip>
        </v-card-actions>

        <v-form class="pt-6" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="ticket.title"
            :rules="ticketRules"
            :label="$t('title')"
            required
            outlined
            error-count="2"
          >
            <template v-slot:prepend-inner>
              <span class="red--text">
                *
              </span>
            </template>
          </v-text-field>
          <v-textarea
            outlined
            required
            :rules="requireRule"
            name="input-7-4"
            :label="$t('messageText')"
            v-model="ticket.thread.description"
          >
            <template v-slot:prepend-inner>
              <span class="red--text">
                *
              </span>
            </template>
          </v-textarea>
          <v-select
            v-if="this.$store.state.bookShop.userInfo.role === 'CLIENT'"
            :items="departments"
            :label="$t('department')"
            v-model="ticket.department"
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
          <div
            class="flex"
            v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
          >
            <clientsAutoComplete
              @setUser="setClient"
              ref="userAutocomplete"
              :isRequired="userValidate"
              :placeHolder="'users'"
            >
            </clientsAutoComplete>
          </div>

          <uploadFile @setUploadedId="setUploadedId" />

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
      <notifMessage
        v-if="saveSuccess"
        :msg="'operationSuccessfullyOcured'"
        @hideNotif="hideNotif"
        :type="'success'"
      />
    </v-col>
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import clientsAutoComplete from '../structure/clientsAutoComplete.vue';
import uploadFile from '../file/uploadFile.vue';

export default {
  name: 'addTicket',
  metaInfo: {
    title: 'افزودن تیکت',
  },
  components: {
    notifMessage,
    clientsAutoComplete,
    uploadFile,
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
      ticketRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      departments: ['INFO', 'TECH', 'BILLING'],
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      ticket: {
        title: '',
        thread: {},
      },
      userValidate: true,
    };
  },
  methods: {
    ticketsList() {
      this.$router.push({
        name: 'ticketsList',
      });
    },
    setClient(value) {
      this.ticket.clientId = value;
    },
    setUploadedId(value) {
      this.ticket.thread.attachmentId = value;
    },
    // validate form
    validate() {
      this.$refs.form.validate();
      // user validation
      if (this.$store.state.bookShop.userInfo.role !== 'CLIENT') {
        if (
          this.$refs.userAutocomplete.model === null ||
          this.$refs.userAutocomplete.model.length < 1
        ) {
          this.userValidate = true;
        } else {
          this.userValidate = false;
        }
      }

      if (this.$refs.form.validate()) {
        if (this.mode === 'addPage') {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/ticket', { ...this.ticket })
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                this.reset();
                this.$router.push({
                  name: 'ticketsList',
                });
              }
            });
        }
        this.$emit('savedSuccessfully');
      } else {
        this.valid = false;
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
      this.userValidate = true;
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
  },
};
</script>
