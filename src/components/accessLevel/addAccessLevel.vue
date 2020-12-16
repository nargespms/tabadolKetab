<template>
  <v-row>
    <v-col>
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('accessLevel') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-form class="pt-6" ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="accessLevel.roleTitle"
                :rules="requireRule"
                :label="$t('roleTitle')"
                required
                outlined
                error-count="1"
                height="32"
                min-height="32"
                ><template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template></v-text-field
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.user" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.forbiddenBook" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.discount" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.book" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.tickets" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.transactions" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.category" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.discountsCategory" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.logs" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.tags" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.messages" />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig :module="modules.ordersList" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6">
              <moduleAccessConfig :module="modules.invoices" />
            </v-col>
          </v-row>
          <div class="justify-center d-flex">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 px-16"
              @click="saveAccess"
            >
              {{ $t('save') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideNotif"
      :type="'error'"
    />
    <notifMessage
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
  </v-row>
</template>

<script>
import moduleAccessConfig from './moduleAccessConfig.vue';
import notifMessage from '../structure/notifMessage.vue';
import accessModule from '../../mock/accessModule.json';

export default {
  name: 'addAccessLevel',
  components: {
    moduleAccessConfig,
    notifMessage,
  },
  data() {
    return {
      valid: true,
      accessLevel: {},
      modules: accessModule,
      saveSuccess: false,
      errorEnable: false,
      errorMsg: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  methods: {
    saveAccess() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.saveSuccess = true;
        this.reset();
      } else {
        this.valid = false;
        this.errorMsg = 'pleaseFillRoleTitle';
        this.errorEnable = true;
      }
    },
    // reset form
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
