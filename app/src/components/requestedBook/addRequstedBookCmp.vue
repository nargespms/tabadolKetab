<template>
  <v-row no-gutters class="justify-center">
    <span class="fn-25">
      👨‍💼
    </span>
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('addRequestedBooks') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="requestedBooksList">
                  fa fa-table</v-icon
                >
              </v-btn>
            </template>
            <span>
              {{ $t('requestedBooksList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form class="pt-6 pa-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="12" class="pa-0 ">
              <v-text-field
                v-model="reqBook.title"
                :rules="requireRule"
                :label="$t('title')"
                required
                outlined
                error-count="1"
                ><template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template></v-text-field
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <bookCatAutocomplete
                :isRequire="false"
                @sendValue="getBookCat"
                :height="32"
            /></v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <authorAutocomplete
                :isRequire="false"
                :placeHolder="'writer'"
                @sendValue="getWriter"
                :height="32"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <authorAutocomplete
                :isRequire="false"
                :placeHolder="'author'"
                @sendValue="getAuthor"
                :height="32"
              />
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <authorAutocomplete
                :isRequire="false"
                :placeHolder="'translator'"
                @sendValue="getTranslator"
                :height="32"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <authorAutocomplete
                :isRequire="false"
                :placeHolder="'searcher'"
                @sendValue="getSearcher"
                :height="32"
              />
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-text-field
                v-model="reqBook.shabak"
                :label="$t('shabak')"
                outlined
                error-count="1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0 pt-0">
              <v-textarea
                v-model="reqBook.description"
                :label="$t('description')"
                name="input-7-4"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0 pt-0">
              <v-file-input
                outlined
                show-size
                multiple
                :label="$t('attachments')"
              ></v-file-input>
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
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';
import authorAutocomplete from '../author/authorAutocomplete.vue';

export default {
  name: 'addRequestedBookCmp',
  components: {
    notifMessage,
    bookCatAutocomplete,
    authorAutocomplete,
  },
  data() {
    return {
      valid: true,
      successNotif: false,
      saveSuccess: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      reqBook: {},
    };
  },
  methods: {
    requestedBooksList() {
      this.$router.push({
        name: 'requestedBooksList',
      });
    },
    getBookCat(value) {
      this.reqBook.bookCats = value;
    },
    getWriter(value) {
      this.reqBook.writer = value;
    },
    getSearcher(value) {
      this.reqBook.searcher = value;
    },
    getTranslator(value) {
      this.reqBook.translator = value;
    },
    getAuthor(value) {
      this.reqBook.author = value;
    },
    // validate form
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        this.$axios
          .post('/v1/api/tabaadol-e-ketaab/requested-book', { ...this.reqBook })
          .then(res => {
            if (res.status === 200) {
              this.saveSuccess = true;
              this.reset();
            }
          });
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
