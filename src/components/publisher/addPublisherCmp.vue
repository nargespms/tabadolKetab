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
              ></v-text-field>
              <v-textarea
                outlined
                name="input-7-4"
                :label="$t('messageText')"
                v-model="publisher.address"
              ></v-textarea>
              <v-col cols="12" md="6">
                <mobilePhone
                  :phone="true"
                  @setMobilePhone="setPhone"
                  :validate="false"
                />
              </v-col>
              <v-checkbox
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
    title: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valid: true,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      saveSuccess: false,
      publisher: {
        active: true,
        title: '',
      },
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
          this.$emit('editPublisher', this.publisher);
        } else {
          this.saveSuccess = true;
        }
        this.reset();
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
  },
  mounted() {
    if (this.mode === 'edit') {
      this.publisher.active = this.active;
      this.publisher.title = this.title;
    }
  },
  watch: {
    active(newVal) {
      this.publisher.active = newVal;
    },
    title(newVal) {
      this.publisher.title = newVal;
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
