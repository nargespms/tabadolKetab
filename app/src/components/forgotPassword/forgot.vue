<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="8" md="5">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('forgotPassword') }}
            </span>
          </v-card-title>
        </v-card-actions>
        <v-container>
          <v-tabs fixed-tabs color="teal">
            <v-tab>
              از طریق پیامک
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form class="pt-6" ref="form" v-model="validMobile" lazy-validation>
                    <mobilePhone :isRequired="true" />
                    <div class="justify-center d-flex">
                      <v-btn
                        :disabled="!validMobile"
                        color="success"
                        class="mr-4"
                        @click="validateMobile"
                      >
                        {{ $t('enter') }}
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-container>
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
import mobilePhone from '../userControls/mobilePhone.vue';
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'forgot',
  components: {
    mobilePhone,
    notifMessage,
  },
  data() {
    return {
      saveSuccess: false,
      validMobile: false,
      forgotPass: false,
    };
  },
  methods: {
    validateMobile() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.saveSuccess = true;
        this.validMobile = true;
      } else {
        this.validMobile = false;
      }
    },

    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
  },
};
</script>
<style lang="scss">
.v-btn,
.v-tab {
  letter-spacing: inherit;
}
</style>
