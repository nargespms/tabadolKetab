<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('addBook') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="bookList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('bookList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form class="pt-6 pa-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <v-text-field
                v-model="book.bookName"
                :rules="requireRule"
                :label="$t('bookName')"
                required
                outlined
                error-count="1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-text-field
                v-model="book.coverPrice"
                :label="$t('coverPrice')"
                outlined
                v-mask="'#############'"
                :hint="
                  this.book.coverPrice
                    ? `${$t('costInToman')}${moneyFormat(book.coverPrice)}`
                    : ''
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 pb-6">
              <bookCatAutocomplete
                :validate="bookCatVallidate"
                :height="36"
                @sendValue="getBookCat"
                ref="bookCat"
            /></v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-text-field
                v-model="book.writer"
                :label="$t('writer')"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <v-text-field
                v-model="book.author"
                :label="$t('author')"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-text-field
                v-model="book.translator"
                :label="$t('translator')"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <v-text-field
                v-model="book.searcher"
                :label="$t('searcher')"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-text-field
                v-model="book.shabak"
                :label="$t('shabak')"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <v-text-field
                v-model="book.nationalcode"
                :label="$t('nationalcode')"
                outlined
                v-mask="'###########'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-select :items="langs" :label="$t('bookLang')" outlined>
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
            <v-col cols="12" md="6" class="pa-0 ">
              <v-text-field
                v-model="book.publisher"
                :label="$t('publisher')"
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pa-0 pr-md-4  pr-lg-4 pr-0 pb-6 pb-md-0"
            >
              <tagsAutocomplete
                :validate="true"
                :height="36"
                @sendValue="getTag"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 pt-0">
              <v-textarea
                v-model="book.desc"
                :label="$t('description')"
                name="input-7-4"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-textarea
                v-model="book.bookSummary"
                :label="$t('bookSummary')"
                name="input-7-4"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 pt-0 pb-4">
              <div class="recieveUserWrap d-flex align-center pt-0">
                <span class="font-weight-black">
                  {{ $t('bookDonation') }} :
                </span>
                <v-radio-group
                  v-model="book.bookDonation"
                  row
                  class="pr-6"
                  :rules="requireRule"
                >
                  <v-radio :label="$t('yes')" :value="true"></v-radio>
                  <v-radio :label="$t('no')" :value="false"></v-radio>
                </v-radio-group></div
            ></v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-checkbox
                v-model="book.weeklyDiscount"
                :label="$t('weeklyDiscount')"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 pt-0">
              <v-text-field
                v-model="book.UndergraduatePrice"
                :label="$t('UndergraduatePrice')"
                outlined
                required
                :rules="requireRule"
                v-mask="'#############'"
                :hint="
                  this.book.UndergraduatePrice
                    ? `${$t('costInToman')}${moneyFormat(
                        book.UndergraduatePrice
                      )}`
                    : ''
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-select
                :items="bookStatus"
                :label="$t('status')"
                outlined
                required
                :rules="requireRule"
                v-model="book.status"
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
            <v-col cols="12">
              <div class="recieveUserWrap d-flex align-center ">
                <span class="font-weight-black"> {{ $t('recycle') }} : </span>
                <v-radio-group
                  v-model="book.recycle"
                  row
                  class="pr-6"
                  :rules="requireRule"
                >
                  <v-radio
                    :label="$t('recieveBook')"
                    value="recieveBook"
                    class="pr-4"
                  ></v-radio>
                  <v-radio
                    :label="$t('noProblem')"
                    value="noProblem"
                    class="pr-4"
                  ></v-radio>
                  <v-radio
                    :label="$t('noProblemWithKnowing')"
                    value="noProblemWithKnowing"
                    class="pr-4"
                  ></v-radio>
                </v-radio-group>
              </div>
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
import tagsAutocomplete from '../tags/tagsAutocomplete.vue';

export default {
  name: 'addBookCmp',
  components: {
    notifMessage,
    bookCatAutocomplete,
    tagsAutocomplete,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      langs: ['fa', 'en'],
      bookStatus: ['status1', 'status2'],
      book: {},
      // bookCategory vlidate
      bookCatVallidate: true,
    };
  },
  methods: {
    bookList() {
      this.$router.push({
        name: 'bookList',
      });
    },
    getBookCat(value) {
      console.log(value);
    },
    getTag(value) {
      console.log(value);
    },
    // validate form
    validate() {
      this.$refs.form.validate();
      // book category validation
      if (
        this.$refs.bookCat.bookCats.length < 1 ||
        this.$refs.bookCat.bookCats === null
      ) {
        this.bookCatVallidate = false;
      } else {
        this.bookCatVallidate = true;
      }
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
      this.bookCatVallidate = true;
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    moneyFormat(value) {
      return new Intl.NumberFormat('es-ES').format(value);
    },
  },
};
</script>
