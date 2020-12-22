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
              >
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-text-field>
              <div>
                <span class="fn-25">
                  🧑‍💻
                </span>
                <usersAutoComplete
                  ref="userAutocomplete"
                  :isRequired="userValidate"
                  :placeHolder="'users'"
                  dynamicClass="pb-7"
                />
              </div>
              <v-textarea
                outlined
                name="input-7-4"
                :label="$t('description')"
                v-model="credit.desc"
                counter
                :rules="rules"
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
              {{ $t('increaseCredit') }}
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
      rules: [v => (v && v.length >= 15) || `${this.$t('minCharaters15')}`],
      userValidate: true,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      // user validate
      if (
        this.$refs.userAutocomplete.model === null ||
        this.$refs.userAutocomplete.model.length < 1
      ) {
        this.userValidate = true;
      } else {
        this.userValidate = false;
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