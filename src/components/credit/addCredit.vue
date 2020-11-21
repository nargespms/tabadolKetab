<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card>
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('increaseCredit') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
          <v-row>
            <v-col>
              <v-text-field
                v-model="credit.cost"
                :rules="requireRule"
                :label="$t('cost')"
                required
                outlined
                error-count="1"
                v-mask="'#############'"
                :hint="
                  this.credit.cost
                    ? `${$t('costInToman')}${moneyFormat(credit.cost)}`
                    : ''
                "
                persistent-hint
              ></v-text-field>
              <usersAutoComplete
                ref="userAutocomplete"
                :validate="userValidate"
                dynamicClass="pb-7"
              />
              <v-textarea
                outlined
                name="input-7-4"
                :label="$t('description')"
                v-model="credit.desc"
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="justify-center d-flex">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ $t('send') }}
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
import usersAutoComplete from '../structure/usersAutoComplete.vue';

export default {
  name: 'addCredit',
  components: {
    notifMessage,
    usersAutoComplete,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      credit: {},
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      userValidate: true,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      // user validate
      if (
        this.$refs.userAutocomplete.users === null ||
        this.$refs.userAutocomplete.users.length < 1
      ) {
        this.userValidate = false;
      } else {
        this.userValidate = true;
      }

      if (this.$refs.form.validate() && this.userValidate) {
        this.saveSuccess = true;
        this.reset();
      } else {
        this.valid = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.userValidate = true;
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
      this.userValidate = true;
    },
    moneyFormat(value) {
      return new Intl.NumberFormat('es-ES').format(value);
    },
  },
};
</script>
