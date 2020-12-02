<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('addForbiddenBook') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="forbiddenBookList">
                  fa fa-table</v-icon
                >
              </v-btn>
            </template>
            <span>
              {{ $t('forbiddenBookList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form class="pt-6 pa-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="12" class="pa-0 ">
              <v-text-field
                v-model="forbiddenBook.title"
                :rules="requireRule"
                :label="$t('title')"
                required
                outlined
                error-count="1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <authorAutocomplete
                :validate="true"
                :placeHolder="'writer'"
                :height="36"
                @sendValue="getWriter"
              />
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-text-field
                v-model="forbiddenBook.shabak"
                :label="$t('shabak')"
                outlined
                error-count="1"
              ></v-text-field>
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
import notifMessage from '../structure/notifMessage.vue';
import authorAutocomplete from '../author/authorAutocomplete.vue';

export default {
  name: 'addForbiddenBookCmp',
  components: {
    notifMessage,
    authorAutocomplete,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      forbiddenBook: {},
    };
  },
  methods: {
    forbiddenBookList() {
      this.$router.push({
        name: 'forbiddenBookList',
      });
    },
    getWriter(value) {
      console.log(value);
    },
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        this.saveSuccess = true;
        this.reset();
      } else {
        this.valid = false;
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
