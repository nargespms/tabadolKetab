<template>
  <v-row class="justify-center">
    <v-col cols="12" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('addAuthor') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="authorList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('authorsList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form class="pt-6 pa-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="12" class="pa-0 ">
              <v-text-field
                v-model="author.title"
                :rules="requireRule"
                :label="$t('title')"
                required
                outlined
                error-count="1"
              ></v-text-field>
              <v-checkbox
                v-model="author.active"
                :label="$t('activeinactive')"
                required
                :rules="requireRule"
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
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'addAuthorCmp',
  components: {
    notifMessage,
  },
  data() {
    return {
      valid: true,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      author: {},
    };
  },
  methods: {
    authorList() {
      this.$router.push({ name: 'authorsList' });
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
