<template>
  <v-row class="justify-center">
    <v-col cols="12" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('addPublisher') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="publishersList">
                  fa fa-table</v-icon
                >
              </v-btn>
            </template>
            <span>
              {{ $t('publishersList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <div v-if="mode === 'edit'" class="alertMessage mt-3">
          <p class="font-weight-black">
            <v-icon color="red"> fas fa-exclamation-triangle </v-icon>
            <span>
              توجه داشته باشید با ویرایش ناشر اطلاعاتی که به این ناشر اختصاص
              داشته ، تغییر میکند
            </span>
          </p>
        </div>
        <v-form class="pt-6 pa-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="12" class="pa-0 ">
              <v-text-field
                v-model="publisher.title"
                :rules="requireRule"
                :label="$t('title')"
                required
                outlined
                error-count="1"
              >
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-text-field>
              <v-textarea
                outlined
                name="input-7-4"
                :label="$t('address')"
                v-model="publisher.address"
              ></v-textarea>
              <v-col cols="12" md="6">
                <mobilePhone
                  :mode="'edit'"
                  :editData="this.mode === 'edit' ? publisher.phone : ''"
                  :isRequired="false"
                  :phone="true"
                  @setMobilePhone="setPhone"
                />
              </v-col>
              <v-checkbox
                v-if="this.mode === 'edit'"
                v-model="publisher.active"
                :label="$t('activeinactive')"
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
    <notifMessage
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
    <notifMessage
      v-if="error"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import mobilePhone from '../userControls/mobilePhone.vue';
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'addPublisher',
  components: {
    mobilePhone,
    notifMessage,
  },
  props: {
    mode: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      saveSuccess: false,
      publisher: {
        title: '',
      },
      // error messages
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    publishersList() {
      this.$router.push({
        name: 'publishersList',
      });
    },
    setPhone(value) {
      this.publisher.phone = value;
    },
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        if (this.mode === 'edit') {
          this.$axios
            .put(`/v1/api/tabaadol-e-ketaab/publisher/${this.publisher.id}`, {
              ...this.publisher,
            })
            .then(res => {
              if (res.status === 200) {
                this.$emit('editPublisher');
                this.reset();
              }
            })
            .catch({});
        } else {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/publisher', {
              ...this.publisher,
            })
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                this.reset();
                this.publisher.active = false;
              }
            })
            .catch(e => {
              if (e.response.status === 409) {
                this.error = true;
                this.errorMsg = 'repeatedPublisher';
              }
            });
        }
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
    },
    hideError() {
      this.error = false;
    },
  },
  mounted() {
    if (this.mode === 'edit') {
      this.publisher = this.data;
    }
  },
  watch: {
    data(newVal) {
      this.publisher = newVal;
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
