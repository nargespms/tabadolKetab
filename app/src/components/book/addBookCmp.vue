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
                v-model="book.name"
                :rules="requireRule"
                :label="$t('bookName')"
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
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-text-field
                v-model="book.coverPrice"
                :label="$t('coverPrice')"
                outlined
                v-mask="'#############'"
                :hint="
                  this.book.coverPrice
                    ? `${$t('costInRial')}${moneyFormat(book.coverPrice)}`
                    : ''
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <bookCatAutocomplete
                :isRequire="bookCatVallidate"
                @sendValue="getBookCat"
                ref="bookCat"
                :height="32"
            /></v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <authorAutocomplete
                :isRequire="false"
                :isMultiple="false"
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
                :isMultiple="false"
                :placeHolder="'author'"
                @sendValue="getAuthor"
                :height="32"
              />
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <authorAutocomplete
                :isRequire="false"
                :isMultiple="false"
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
                :isMultiple="false"
                :placeHolder="'searcher'"
                @sendValue="getSearcher"
                :height="32"
              />
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <publisherAutocomplete
                :isRequire="false"
                :placeHolder="'publisher'"
                @sendValue="getPublisher"
                :height="32"
                :isMultiple="false"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <v-text-field
                v-model="book.nationalCode"
                :label="$t('nationalcode')"
                outlined
                v-mask="'###########'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-select
                :items="langs"
                :label="$t('bookLang')"
                outlined
                v-model="book.bookLang"
                required
                :rules="requireRule"
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
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <v-text-field
                v-model="book.shabak"
                :label="$t('shabak')"
                outlined
                required
                :rules="requireRule"
              >
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col
              v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
              cols="12"
              md="6"
              class="pa-0 pr-md-4  pr-lg-4 pr-0"
            >
              <div class="flex">
                <tagsAutocomplete
                  :isRequire="false"
                  :placeHolder="'tags'"
                  @sendValue="getTag"
                  :height="32"
                />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0">
              <clientsAutoComplete
                v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
                :placeHolder="'client'"
                @setUser="setClient"
                :height="32"
                :isRequired="true"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              class="pa-0 pt-0"
              v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
            >
              <v-text-field
                v-model="book.undergraduatePrice"
                :label="$t('UndergraduatePrice')"
                outlined
                required
                :rules="requireRule"
                v-mask="'#############'"
                :hint="
                  this.book.undergraduatePrice
                    ? `${$t('costInRial')}${moneyFormat(
                        book.undergraduatePrice
                      )}`
                    : ''
                "
              >
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pa-0 pr-md-4  pr-lg-4 pr-0"
              v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
            >
              <v-select
                v-if="mode === 'edit'"
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
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 pt-0">
              <v-textarea
                v-model="book.description"
                :label="$t('description')"
                name="input-7-4"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
              <v-textarea
                v-model="book.summary"
                :label="$t('bookSummary')"
                name="input-7-4"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 pt-0 ">
              <div class="recieveUserWrap d-flex align-center pt-0">
                <span class="font-weight-black">
                  {{ $t('bookDonation') }} :
                </span>

                <v-radio-group
                  mandatory
                  v-model="book.donation"
                  row
                  class="pr-6"
                >
                  <v-radio
                    :label="$t('yes')"
                    :value="true"
                    color="green"
                  ></v-radio>
                  <v-radio
                    :label="$t('no')"
                    :value="false"
                    color="red"
                  ></v-radio>
                </v-radio-group></div
            ></v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="recieveUserWrap d-flex align-center ">
                <span class="font-weight-black"> {{ $t('recycle') }} : </span>
                <v-radio-group
                  mandatory
                  v-model="book.recycle"
                  row
                  class="pr-6"
                >
                  <v-radio
                    :label="$t('RECEIVEBOOK')"
                    value="RECEIVEBOOK"
                    class="pr-4"
                  ></v-radio>
                  <v-radio
                    :label="$t('NOPROBLEM')"
                    value="NOPROBLEM"
                    class="pr-4"
                  ></v-radio>
                  <v-radio
                    :label="$t('NOPROBLEMIFASKED')"
                    value="NOPROBLEMIFASKED"
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
      :type="'success'"
      @hideNotif="hideNotif"
    />
    <notifMessage
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import clientsAutoComplete from '../structure/clientsAutoComplete.vue';
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';
import tagsAutocomplete from '../tags/tagsAutocomplete.vue';
import publisherAutocomplete from '../publisher/publisherAutocomplete.vue';
import authorAutocomplete from '../author/authorAutocomplete.vue';

export default {
  name: 'addBookCmp',
  components: {
    notifMessage,
    bookCatAutocomplete,
    tagsAutocomplete,
    publisherAutocomplete,
    authorAutocomplete,
    clientsAutoComplete,
  },
  props: {
    mode: {
      type: String,
    },
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      langs: ['fa', 'en', 'ar'],
      bookStatus: ['CLIENTREGISTER', 'RECEIVED', 'CONFIRMED', 'SOLD'],
      book: {},
      // bookCategory vlidate
      bookCatVallidate: true,
      // error
      errorEnable: false,
      errorMsg: '',
    };
  },
  methods: {
    bookList() {
      this.$router.push({
        name: 'bookList',
      });
    },
    setClient(value) {
      this.book.sellerId = value;
    },
    getBookCat(value) {
      this.book.categoryId = value;
    },
    getPublisher(value) {
      this.book.publisherId = value;
    },
    getTag(value) {
      this.book.tags = value;
    },
    getWriter(value) {
      this.book.writerId = value;
    },
    getSearcher(value) {
      this.book.searcherId = value;
    },
    getTranslator(value) {
      this.book.translatorId = value;
    },
    getAuthor(value) {
      this.book.authorId = value;
    },
    // validate form
    validate() {
      this.$refs.form.validate();
      // book category validation
      if (this.$refs.bookCat.model === null) {
        this.bookCatVallidate = true;
      } else {
        this.bookCatVallidate = false;
      }
      if (this.$refs.form.validate()) {
        if (this.mode === 'add') {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/book', {
              ...this.book,
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.saveSuccess = true;
                this.reset();
              }
            })
            .catch(e => {
              if (e.response.status === 403) {
                this.errorEnable = true;
                this.errorMsg = 'permissionDenied';
              }
            });
        } else if (this.mode === 'edit') {
          this.$axios
            .put(
              `/v1/api/tabaadol-e-ketaab/book/${this.$route.params.bookId}`,
              {
                ...this.book,
              }
            )
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.saveSuccess = true;
              }
            })
            .catch(e => {
              if (e.response.status === 403) {
                this.errorEnable = true;
                this.errorMsg = 'permissionDenied';
              }
            });
        }
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
    getBookData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/book/${this.$route.params.bookId}`)
        .then(res => {
          if (res.status === 200) {
            this.book = res.data;
          }
        });
    },
  },
  mounted() {
    this.getBookData();
  },
};
</script>
