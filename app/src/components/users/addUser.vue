<template>
  <v-row no-gutters class="justify-center">
    <v-col
      cols="12"
      :lg="mode === 'edit' ? '12' : colWidth ? colWidth : '8'"
      :md="mode === 'edit' ? '12' : colWidth ? colWidth : '8'"
      :sm="mode === 'edit' ? '12' : '10'"
    >
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card class="pa-4" v-if="!isLoading">
        <v-card-actions class="teal" v-if="mode !== 'edit'">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('signUp') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="ClientsList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('ClientsList') }}
            </span>
          </v-tooltip>
        </v-card-actions>

        <v-form class="pt-6" ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" class="pa-0">
                <v-text-field
                  v-model="register.firstName"
                  :label="$t('name')"
                  :rules="nameRules"
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
              </v-col>
              <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
                <v-text-field
                  v-model="register.lastName"
                  :rules="nameRules"
                  :label="$t('lastName')"
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
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" class="pa-0">
                <nationalId
                  @setNationalId="setNationalId"
                  :isRequire="true"
                  :editData="mode === 'edit' ? editData.nationalId : ''"
                />
              </v-col>
              <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
                <mobilePhone
                  @setMobilePhone="setMobilePhone"
                  :validate="true"
                  :mode="'edit'"
                  :editData="this.mode === 'edit' ? editData.mobile : ''"
                  :isRequired="true"
                  :phone="false"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" class="pa-0">
                <v-select
                  v-model="register.gender"
                  :items="gender"
                  :label="$t('gender')"
                  outlined
                  clearable
                  hide-selected
                  :rules="checkRule"
                  required
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
              </v-col>
              <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
                <v-select
                  v-model="register.introduction"
                  :items="introductionType"
                  :label="$t('introduction')"
                  outlined
                  clearable
                  hide-selected
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
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6" class="pa-0">
                <email
                  :isRequire="true"
                  @setEmail="setEmail"
                  :editData="this.mode === 'edit' ? editData.email : ''"
                />
              </v-col>
              <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
                <v-select
                  v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'"
                  v-model="role"
                  :items="roleType"
                  :label="$t('role')"
                  outlined
                  clearable
                  hide-selected
                  :rules="checkRule"
                  required
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
              </v-col>
            </v-row>

            <v-row v-if="role === 'staff'">
              <v-col cols="12" md="6" class="pa-0 ">
                <v-select
                  v-model="register.department"
                  :items="departments"
                  :label="$t('department')"
                  outlined
                  clearable
                  hide-selected
                  :rules="checkRule"
                  required
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
              </v-col>
              <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
                <rolesAutocomplete
                  @setRole="setRole"
                  :placeHolder="$t('staffAccess')"
                  :height="32"
                  :disable="role === 'client' || role === '' ? true : false"
                  :editDataId="mode === 'edit' ? editData.role.id : ''"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6" class="pa-0 ">
                <v-textarea
                  outlined
                  required
                  name="input-7-4"
                  :label="$t('description')"
                  v-model="register.description"
                  v-if="$store.state.bookShop.userInfo.role !== 'CLIENT'"
                >
                </v-textarea>
              </v-col>
            </v-row>

            <passwords v-if="mode !== 'edit'" @setPass="setPass" />
            <v-row
              v-if="
                mode === 'edit' &&
                  this.$route.params.userId !==
                    this.$store.state.bookShop.userInfo.id
              "
            >
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="register.active"
                  :label="$t('activeinactive')"
                  required
                >
                </v-checkbox>
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
          </v-container>
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
import notifMessage from '../structure/notifMessage.vue';
import passwords from '../userControls/passwords.vue';
import mobilePhone from '../userControls/mobilePhone.vue';
import nationalId from '../userControls/nationalId.vue';
import email from '../userControls/email.vue';
import RolesAutocomplete from '../structure/rolesAutocomplete.vue';

export default {
  name: 'addUser',
  props: {
    mode: {
      type: String,
    },
    editData: {
      type: Object,
    },
    colWidth: {
      type: String,
    },
  },
  components: {
    notifMessage,
    passwords,
    mobilePhone,
    nationalId,
    email,
    RolesAutocomplete,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      nameRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      postalCodeRules: [v => v.length >= 10 || `${this.$t('minCharaters10')}`],
      checkRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],

      introductionType: [
        'website',
        'advertising',
        'friendsAndAcquaintances',
        'other',
      ],
      roleType: ['client', 'staff'],
      role: '',
      register: {},
      captcha: '',
      active: '',
      gender: ['MALE', 'FEMALE', 'OTHER'],
      departments: ['INFO', 'IT', 'GENERAL', 'BILLING', 'BOOK'],
      isLoading: true,
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    ClientsList() {
      this.$router.push({
        name: 'clientsList',
      });
    },
    setPass(value) {
      this.register.password = value;
    },
    setRole(value) {
      this.register.roleId = value;
    },

    validate() {
      this.$refs.form.validate();
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate() && this.mode === 'add') {
        let endpoint = '';
        if (this.role === 'client') {
          endpoint = '/v1/api/tabaadol-e-ketaab/client';
        } else if (this.role === 'staff') {
          endpoint = '/v1/api/tabaadol-e-ketaab/staff';
        }
        this.$axios
          .post(endpoint, {
            ...this.register,
          })
          .then(res => {
            if (res.status === 200) {
              this.saveSuccess = true;
              this.reset();
              this.$emit('closeModal');
            }
          })
          .catch(e => {
            if (e.response.status === 409) {
              this.error = true;
              this.errorMsg = 'emailORmobileORnationalIdisRepeated';
            }
          });
      } else if (this.$refs.form.validate() && this.mode === 'edit') {
        let endpoint = '';
        if (this.role === 'client') {
          endpoint = `/v1/api/tabaadol-e-ketaab/client/${this.$route.params.userId}`;
        } else if (this.role === 'staff') {
          endpoint = `/v1/api/tabaadol-e-ketaab/staff/${this.$route.params.userId}`;
        }
        this.$axios
          .put(endpoint, {
            ...this.register,
          })
          .then(res => {
            if (res.status === 200) {
              this.saveSuccess = true;
              this.$emit('reloadUserData');
              // update data in menu
              if (this.$route.name === 'profile') {
                this.$store.commit('bookShop/userEnter', res.data.user, {
                  module: 'bookShop',
                });
              }
            }
          })
          .catch(e => {
            if (e.response.status === 403) {
              this.error = true;
              this.errorMsg = 'accessDenied';
            } else if (e.response.status === 409) {
              this.error = true;
              this.errorMsg = 'emailORmobileORnationalIdisRepeated';
            }
          });
      } else {
        this.valid = false;
      }
    },
    setEmail(value) {
      this.register.email = value;
    },
    setCaptcha(value) {
      this.captcha = value;
    },
    setNationalId(value) {
      this.register.nationalId = value;
    },
    setMobilePhone(value) {
      this.register.mobile = value;
    },
    setPhone(value) {
      this.register.phone = value;
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
  watch: {
    editData(newVal) {
      this.register = newVal;
    },
  },
  mounted() {
    if (this.mode === 'edit') {
      this.register = this.editData;
      this.role = this.editData.role === 'CLIENT' ? 'client' : 'staff';
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  },
};
</script>
