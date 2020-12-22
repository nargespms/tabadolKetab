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
                  v-model="search.bookName"
                  :label="$t('bookName')"
                  outlined
                  error-count="1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <v-text-field
                  v-model="search.writer"
                  :label="$t('writer')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <v-text-field
                  v-model="search.author"
                  :label="$t('author')"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="pa-0 pr-md-2 pr-0">
                <v-text-field
                  v-model="search.translator"
                  :label="$t('translator')"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" class="pa-0">
                <v-text-field
                  v-model="search.searcher"
                  :label="$t('searcher')"
                  outlined
                ></v-text-field>
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
                <v-text-field
                  v-model="search.publisher"
                  :label="$t('publisher')"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <bookCatAutocomplete
                  :validate="true"
                  :height="36"
                  @sendValue="getBookCat"
                />
              </v-col>
              <v-col cols="12" md="6">
                <div class="recieveUserWrap d-flex align-center pt-0">
                  <span class="font-weight-black">
                    {{ $t('bookDonation') }} :
                  </span>
                  <v-radio-group v-model="search.bookDonation" row class="pr-6">
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
                  </v-radio-group>
                </div>
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

export default {
  name: 'bookSearchForm',
  components: {
    bookCatAutocomplete,
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
      console.log(value);
    },
    searchBook() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.reset();
        this.show = false;
        this.$emit('searchBook');
      } else {
        this.valid = false;
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
