<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" md="11">
      <v-card class="pa-4">
        <v-card-actions class="teal pointer" @click="show = !show">
          <v-card-title class="white--text pa-0">
            <span class="pointer">
              {{ $t('bookSearch') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-icon v-if="!show" class="white--text">mdi-arrow-down-thick</v-icon>
          <v-icon v-if="show" class="white--text">mdi-arrow-up-thick</v-icon>
        </v-card-actions>
        <v-expand-transition>
          <v-form
            v-show="show"
            class="pa-6"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row>
              <v-col cols="12" md="3" class="pa-0">
                <v-text-field
                  v-model="filter.name"
                  :label="$t('bookName')"
                  outlined
                >
                  <template v-slot:append v-if="filter.name">
                    <v-icon @click="clear('name')"
                      >mdi-close-circle-outline</v-icon
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <authorAutocomplete
                  :isRequire="false"
                  :isMultiple="false"
                  :placeHolder="'writer'"
                  @sendValue="getWriter"
                  :height="32"
                  :clearable="true"
                />
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <authorAutocomplete
                  :isRequire="false"
                  :isMultiple="false"
                  :placeHolder="'author'"
                  @sendValue="getAuthor"
                  :height="32"
                  :clearable="true"
                />
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <authorAutocomplete
                  :isRequire="false"
                  :isMultiple="false"
                  :placeHolder="'translator'"
                  @sendValue="getTranslator"
                  :height="32"
                  :clearable="true"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" class="pa-0">
                <authorAutocomplete
                  :isRequire="false"
                  :isMultiple="false"
                  :placeHolder="'searcher'"
                  @sendValue="getSearcher"
                  :height="32"
                  :clearable="true"
                />
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <v-text-field
                  v-model="filter.shabak"
                  :label="$t('shabak')"
                  outlined
                >
                  <template v-slot:append v-if="filter.shabak">
                    <v-icon @click="clear('shabak')"
                      >mdi-close-circle-outline</v-icon
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <v-text-field
                  v-model="filter.nationalCode"
                  :label="$t('nationalcode')"
                  outlined
                  v-mask="'###########'"
                >
                  <template v-slot:append v-if="filter.nationalcode">
                    <v-icon @click="clear('nationalcode')"
                      >mdi-close-circle-outline</v-icon
                    >
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <publisherAutocomplete
                  :isRequire="false"
                  :placeHolder="'publisher'"
                  @sendValue="getPublisher"
                  :height="32"
                  :isMultiple="false"
                  :clearable="true"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" class="pa-0">
                <bookCatAutocomplete
                  :isRequire="false"
                  @sendValue="getBookCat"
                  :height="32"
                />
              </v-col>
              <v-col cols="12" md="6" class="pa-0 d-flex align-self-end pr-4">
                <span class="pl-6">
                  {{ $t('priceRange') }}
                </span>

                <v-range-slider
                  :max="max"
                  :min="min"
                  v-model="range"
                  @change="priceRange"
                  persistent-hint
                  :hint="
                    `${moneyFormat(filter.minPrice)}${this.$t(
                      'rial'
                    )}-${moneyFormat(filter.maxPrice)}${this.$t('rial')}`
                  "
                ></v-range-slider>
              </v-col>
            </v-row>

            <div class="justify-center d-flex">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 px-8"
                @click="searchBook"
              >
                {{ $t('search') }}
              </v-btn>
            </div>
          </v-form>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';
import authorAutocomplete from '../author/authorAutocomplete.vue';
import publisherAutocomplete from '../publisher/publisherAutocomplete.vue';
import moneyFormat from '../../mixins/moneyFormat.js';

export default {
  name: 'bookSearchForm',
  components: {
    bookCatAutocomplete,
    authorAutocomplete,
    publisherAutocomplete,
  },
  mixins: [moneyFormat],
  data() {
    return {
      valid: true,
      show: true,
      filter: {
        minPrice: 10000,
        maxPrice: 9000000,
      },
      min: 10000,
      max: 9000000,
      range: [10000, 9000000],
    };
  },
  methods: {
    getBookCat(value) {
      if (value.length > 0) {
        this.filter.categoryId = value;
      } else {
        delete this.filter.categoryId;
        this.$emit('searchBook', this.filter);
      }
    },
    priceRange() {
      this.filter = { minPrice: this.range[0], maxPrice: this.range[1] };
    },
    searchBook() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.show = false;
        console.log(this.filter);
        this.$emit('searchBook', this.filter);
      } else {
        this.valid = false;
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
    },
    getWriter(value) {
      if (value && value.length > 0) {
        this.filter.writerId = value;
      } else {
        delete this.filter.writerId;
        console.log(`filter:${this.filter}`);
        this.$emit('searchBook', this.filter);
      }
    },
    getAuthor(value) {
      if (value && value.length > 0) {
        this.filter.authorId = value;
      } else if (value === null) {
        delete this.filter.authorId;
        this.$emit('searchBook', this.filter);
      }
    },
    getTranslator(value) {
      if (value && value.length > 0) {
        this.filter.translatorId = value;
      } else if (value === null) {
        delete this.filter.translatorId;
        this.$emit('searchBook', this.filter);
      }
    },
    getSearcher(value) {
      if (value && value.length > 0) {
        this.filter.searcherId = value;
      } else {
        delete this.filter.searcherId;
        this.$emit('searchBook', this.filter);
      }
    },
    getPublisher(value) {
      if (value && value.length > 0) {
        this.filter.publisherId = value;
      } else {
        delete this.filter.publisherId;
        this.$emit('searchBook', this.filter);
      }
    },
    clear(name) {
      console.log(name);
      this.filter[name] = '';
      delete this.filter.name;
      this.$emit('searchBook', this.filter);
    },
  },
};
</script>
