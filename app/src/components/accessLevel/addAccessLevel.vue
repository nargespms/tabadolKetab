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
                v-model="accessLevel.title"
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
              <moduleAccessConfig
                :mode="mode"
                :module="modules.staffs"
                @setAccess="setAccessStaffs"
                :data="this.mode === 'edit' ? this.permission.staffData : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.clients"
                @setAccess="setAccessClients"
                :data="this.mode === 'edit' ? this.permission.clientData : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.forbiddenBook"
                @setAccess="setAccessForbiddenBook"
                :data="
                  this.mode === 'edit' ? this.permission.forbiddenData : {}
                "
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.discount"
                @setAccess="setAccessDiscount"
                :data="this.mode === 'edit' ? this.permission.discount : {}"
              />
            </v-col>
            <v-col cols="12" lg="3"> </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.tickets"
                @setAccess="setAccessTickets"
                :data="this.mode === 'edit' ? this.permission.ticket : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.transactions"
                @setAccess="setAccessTransactions"
                :data="this.mode === 'edit' ? this.permission.transaction : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.category"
                @setAccess="setAccessCategory"
                :data="this.mode === 'edit' ? this.permission.category : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.book"
                @setAccess="setAccessBook"
                :data="this.mode === 'edit' ? this.permission.book : {}"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.logs"
                @setAccess="setAccesslogs"
                :data="this.mode === 'edit' ? this.permission.log : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.role"
                @setAccess="setAccessRole"
                :data="this.mode === 'edit' ? this.permission.role : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.messages"
                @setAccess="setAccessmessages"
                :data="this.mode === 'edit' ? this.permission.messages : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.ordersList"
                @setAccess="setAccessOrdersList"
                :data="this.mode === 'edit' ? this.permission.orders : {}"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.author"
                @setAccess="setAccessAuthor"
                :data="this.mode === 'edit' ? this.permission.authors : {}"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.publisher"
                @setAccess="setAccessPublisher"
                :data="this.mode === 'edit' ? this.permission.publishers : {}"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.invoices"
                @setAccess="setAccessInvoices"
                :data="this.mode === 'edit' ? this.permission.invoices : {}"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6">
              <moduleAccessConfig
                :mode="mode"
                :module="modules.tags"
                @setAccess="setAccessTags"
                :data="this.mode === 'edit' ? this.permission.tagData : {}"
              />
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
  props: {
    mode: {
      type: String,
    },
    permission: {
      type: Object,
    },
    editData: {
      type: Object,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      valid: true,
      isLoading: true,
      accessLevel: this.mode === 'edit' ? this.editData : {},
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
        if (this.mode !== 'edit') {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/role', {
              ...this.accessLevel,
            })
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                this.reset();
                setTimeout(
                  function dynamicClass() {
                    this.$emit('reload');
                  }.bind(this),
                  1000
                );
              }
            });
        } else if (this.mode === 'edit') {
          this.$axios
            .put(`/v1/api/tabaadol-e-ketaab/role/${this.$route.params.role}`, {
              ...this.accessLevel,
            })
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                // change route with delay
                setTimeout(
                  function changeRoute() {
                    this.$router.push({
                      name: 'accessLevelList',
                    });
                  }.bind(this),
                  1000
                );
              }
            })
            .catch(e => {
              if (e.response.status === 409) {
                this.errorMsg = 'repeatedTitle';
                this.error = true;
              }
            });
        }
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
    setAccessStaffs(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_staff = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_staff = value.status;
      }
    },
    setAccessClients(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_client = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_client = value.status;
      }
    },
    setAccessForbiddenBook(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_forbiddenBook = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_forbiddenBook = value.status;
      }
    },
    setAccessDiscount(value) {
      if (value.itemName === 'addORdelete') {
        this.accessLevel.cd_discount = value.status;
      }
    },

    setAccessBook(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_book = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_book = value.status;
      }
    },
    setAccessTickets(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_ticket = value.status;
      }
    },
    setAccessTransactions(value) {
      if (value.itemName === 'preview') {
        this.accessLevel.r_transaction = value.status;
      }
    },
    setAccessCategory(value) {
      if (value.itemName === 'all') {
        this.accessLevel.cu_category = value.status;
      }
    },
    setAccesslogs(value) {
      if (value.itemName === 'preview') {
        this.accessLevel.r_log = value.status;
      }
    },
    setAccessTags(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_tag = value.status;
      } else if (value.itemName === 'preview') {
        this.accessLevel.r_tag = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_tag = value.status;
      }
    },
    setAccessmessages(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_message = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_message = value.status;
      }
    },
    setAccessOrdersList(value) {
      if (value.itemName === 'previewAll') {
        this.accessLevel.r_order = value.status;
      } else if (value.itemName === 'postListPreview') {
        this.accessLevel.r_post = value.status;
      }
    },
    setAccessAuthor(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_author = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_author = value.status;
      }
    },
    setAccessPublisher(value) {
      if (value.itemName === 'addORedit') {
        this.accessLevel.cu_publisher = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_publisher = value.status;
      }
    },
    setAccessInvoices(value) {
      if (value.itemName === 'add') {
        this.accessLevel.c_invoice = value.status;
      } else if (value.itemName === 'delete') {
        this.accessLevel.d_invoice = value.status;
      } else if (value.itemName === 'previewAll') {
        this.accessLevel.r_invoices = value.status;
      } else if (value.itemName === 'preview') {
        this.accessLevel.r_invoice = value.status;
      }
    },
    setAccessRole(value) {
      if (value.itemName === 'all') {
        this.accessLevel.cu_role = value.status;
      }
    },
  },
  watch: {
    title(newVal) {
      this.accessLevel.title = newVal.title;
    },
  },
  mounted() {
    if (this.mode === 'edit') {
      this.accessLevel.title = this.permission.title;
    }
  },
};
</script>
