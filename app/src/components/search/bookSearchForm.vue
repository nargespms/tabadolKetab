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
                  v-model="search.name"
                  :label="$t('bookName')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <authorAutocomplete
                  :isRequire="false"
                  :isMultiple="false"
                  :placeHolder="'writer'"
                  @sendValue="getWriter"
                  :height="32"
                />
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <authorAutocomplete
                  :isRequire="false"
                  :isMultiple="false"
                  :placeHolder="'author'"
                  @sendValue="getAuthor"
                  :height="32"
                />
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
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
              <v-col cols="12" md="3" class="pa-0">
                <authorAutocomplete
                  :isRequire="false"
                  :isMultiple="false"
                  :placeHolder="'searcher'"
                  @sendValue="getSearcher"
                  :height="32"
                />
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <v-text-field
                  v-model="search.shabak"
                  :label="$t('shabak')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <v-text-field
                  v-model="search.nationalcode"
                  :label="$t('nationalcode')"
                  outlined
                  v-mask="'###########'"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
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
              <v-col cols="12" md="3" class="pa-0">
                <bookCatAutocomplete
                  :isRequire="false"
                  @sendValue="getBookCat"
                  :height="32"
                />
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

export default {
  name: 'bookSearchForm',
  components: {
    bookCatAutocomplete,
    authorAutocomplete,
    publisherAutocomplete,
  },
  data() {
    return {
      valid: true,
      show: true,
      search: {},
    };
  },
  methods: {
    getBookCat(value) {
      this.search.categoryId = value;
    },
    searchBook() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.show = false;
        console.log(this.search);
        this.$emit('searchBook', this.search);
      } else {
        this.valid = false;
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
    },
    getWriter(value) {
      this.search.writerId = value;
    },
    getAuthor(value) {
      this.search.authorId = value;
    },
    getTranslator(value) {
      this.search.translatorId = value;
    },
    getSearcher(value) {
      this.search.searcherId = value;
    },
    getPublisher(value) {
      this.search.publisherId = value;
    },
  },
};
</script>
