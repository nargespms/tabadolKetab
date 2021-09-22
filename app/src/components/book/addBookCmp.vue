<template>
  <v-card>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card class="pa-4" v-if="!isLoading">
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
              <v-icon color="white" @click="booksList"> fa fa-table</v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('booksList') }}
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
              v-mask="'#########'"
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
              :editDataId="mode === 'edit' ? book.category.id : ''"
          /></v-col>
          <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
            <authorAutocomplete
              :isRequire="false"
              :isMultiple="false"
              :placeHolder="'writer'"
              @sendValue="getWriter"
              :height="32"
              :editDataId="mode === 'edit' && book.writer ? book.writer.id : ''"
              :clearable="true"
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
              :editDataId="mode === 'edit' && book.author ? book.author.id : ''"
              :clearable="true"
            />
          </v-col>
          <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
            <authorAutocomplete
              :isRequire="false"
              :isMultiple="false"
              :placeHolder="'translator'"
              @sendValue="getTranslator"
              :height="32"
              :editDataId="
                mode === 'edit' && book.translator ? book.translator.id : ''
              "
              :clearable="true"
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
              :editDataId="
                mode === 'edit' && book.searcher ? book.searcher.id : ''
              "
              :clearable="true"
            />
          </v-col>
          <v-col cols="12" md="6" class="pa-0 pr-md-4  pr-lg-4 pr-0">
            <publisherAutocomplete
              :isRequire="false"
              :placeHolder="'publisher'"
              @sendValue="getPublisher"
              :height="32"
              :isMultiple="false"
              :editDataId="
                mode === 'edit' && book.publisher ? book.publisher.id : ''
              "
              :clearable="true"
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
                :editDataId="mode === 'edit' && book.tags ? book.tags : []"
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
              :editDataId="mode === 'edit' && book.seller ? book.seller.id : ''"
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
              v-mask="'#########'"
              :hint="
                this.book.undergraduatePrice
                  ? `${$t('costInRial')}${moneyFormat(book.undergraduatePrice)}`
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

              <v-radio-group mandatory v-model="book.donation" row class="pr-6">
                <v-radio
                  :label="$t('yes')"
                  :value="true"
                  color="green"
                ></v-radio>
                <v-radio :label="$t('no')" :value="false" color="red"></v-radio>
              </v-radio-group></div
          ></v-col>
        </v-row>

        <v-row v-if="$store.state.bookShop.userInfo.role === 'CLIENT'">
          <v-col cols="12">
            <div class="recieveUserWrap d-flex align-center ">
              <span class="font-weight-black"> {{ $t('recycle') }} : </span>
              <v-radio-group mandatory v-model="book.recycle" row class="pr-6">
                <v-radio
                  :label="$t('NOPROBLEM')"
                  value="NOPROBLEM"
                  class="pr-4"
                ></v-radio>
                <v-radio
                  :label="$t('RECEIVEBOOK')"
                  value="RECEIVEBOOK"
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
        <v-row v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'">
          <v-col>
            <v-checkbox
              v-model="book.allowDiscount"
              :label="$t('allowDiscount')"
              :key="allowKey"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 pt-0">
            <uploadFile @setUploadedId="setUploadedId" />
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

          <v-btn
            v-if="this.$store.state.bookShop.userInfo.role !== 'CLIENT'"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate('barcode')"
          >
            {{ $t('saveandBarcode') }}
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"
            >{{ $t('resetForm') }}
          </v-btn>
        </div>
      </v-form>
    </v-card>

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
  </v-card>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import clientsAutoComplete from '../structure/clientsAutoComplete.vue';
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';
import tagsAutocomplete from '../tags/tagsAutocomplete.vue';
import publisherAutocomplete from '../publisher/publisherAutocomplete.vue';
import authorAutocomplete from '../author/authorAutocomplete.vue';
import moneyFormat from '../../mixins/moneyFormat.js';
import uploadFile from '../file/uploadFile.vue';

export default {
  name: 'addBookCmp',
  components: {
    notifMessage,
    bookCatAutocomplete,
    tagsAutocomplete,
    publisherAutocomplete,
    authorAutocomplete,
    clientsAutoComplete,
    uploadFile,
  },
  props: {
    mode: {
      type: String,
    },
    state: {
      type: String,
    },
    edittingData: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [moneyFormat],

  data() {
    return {
      valid: true,
      saveSuccess: false,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      langs: ['fa', 'en', 'ar'],
      bookStatus: ['CLIENTREGISTER', 'RECEIVED', 'CONFIRMED', 'SOLD'],
      book: {
        allowDiscount: true,
      },
      // bookCategory vlidate
      bookCatVallidate: true,
      // error
      errorEnable: false,
      errorMsg: '',
      isLoading: true,
      allowKey: 0,

      showBorcode: false,
      bookId: undefined,
    };
  },

  methods: {
    booksList() {
      this.$router.push({
        name: 'booksList',
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

      if (value.length > 0) {
        this.book.allowDiscount = false;
      } else {
        this.book.allowDiscount = true;
      }
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
    setUploadedId(value) {
      this.book.attachmentId = value;
    },
    // validate form
    validate(barcode) {
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
              if (e.response.status === 409) {
                this.errorEnable = true;
                this.errorMsg = 'forbiddenBookRegister';
              }
            });
        } else if (this.mode === 'edit') {
          let id;
          if (this.state === 'modal') {
            id = this.edittingData.id;
          } else {
            id = this.$route.params.bookId;
          }
          this.$axios
            .put(`/v1/api/tabaadol-e-ketaab/book/${id}`, {
              ...this.book,
            })
            .then(res => {
              console.log(res);
              if (res.status === 200 && barcode === 'barcode') {
                const routeData = this.$router.resolve({
                  path: `/print/barcode/${id}`,
                });
                window.open(routeData.href, '_blank');
                this.$emit('closeModal');

                this.saveSuccess = true;
              } else {
                this.saveSuccess = true;
                if (this.state === 'modal') {
                  this.$emit('closeModal');
                } else {
                  this.$router.push({
                    name: 'booksList',
                  });
                }
              }
            })
            .catch(e => {
              if (e.response.status === 403) {
                this.errorEnable = true;
                this.errorMsg = 'permissionDenied';
              }
              if (e.response.status === 412) {
                this.errorEnable = true;
                const msg = e.response.data.message.replace(/ /g, '');
                console.log(msg);
                this.errorMsg = msg;
              }
              if (e.response.status === 409) {
                this.errorEnable = true;
                this.errorMsg = 'forbiddenBookRegister';
              }
            });
        }
      } else {
        this.valid = false;
      }
    },

    reset() {
      this.$refs.form.reset();
      this.bookCatVallidate = true;
      this.book.allowDiscount = true;
      this.allowKey += 1;
    },
    // notif hide

    hideNotif() {
      this.saveSuccess = false;
    },
    hideError() {
      this.error = false;
    },

    getBookData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/book/${this.$route.params.bookId}`)
        .then(res => {
          if (res.status === 200) {
            this.book = res.data;
            this.isLoading = false;
          }
        });
    },

    closeBarcode() {
      this.showBorcode = false;
      this.bookNumber = '';
    },
  },
  watch: {
    book(newVal) {
      this.book.allowDiscount = newVal.allowDiscount;

      if (
        this.$store.state.bookShop.userInfo.role !== 'CLIENT' ||
        this.edittingData.recycle === undefined
      ) {
        this.book.recycle = 'NOPROBLEM';
      }
    },

    edittingData(newVal) {
      this.book = newVal;
    },
  },
  mounted() {
    if (this.mode === 'edit' && this.state !== 'modal') {
      this.getBookData();
    } else if (this.mode === 'edit' && this.state === 'modal') {
      this.book = { ...this.edittingData };

      this.isLoading = false;
    } else {
      this.isLoading = false;
    }

    if (
      this.$store.state.bookShop.userInfo.role !== 'CLIENT' ||
      this.edittingData.recycle === undefined
    ) {
      this.book.recycle = 'NOPROBLEM';
    }
  },
};
</script>
