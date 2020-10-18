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
          <v-text-field
            v-model="message.title"
            :rules="messageRules"
            :label="$t('title')"
            required
            outlined
          ></v-text-field>

          <v-textarea
            outlined
            required
            :rules="requireRule"
            name="input-7-4"
            :label="$t('summaryText')"
            v-model="message.text"
          ></v-textarea>

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

          <v-checkbox
            v-model="message.sms"
            :label="$t('sendSms')"
            required
          ></v-checkbox>

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

export default {
  name: 'addMessageCmp',
  components: {
    successNotif,
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
      message: {
        title: '',
        text: '',
        messageType: null,
        sms: false,
      },
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
      if (this.mode === 'addPage') {
        this.saveSuccess = true;
        this.reset();
      }
      this.$emit('savedSuccessfully');
    },
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
  },
};
</script>
