<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" md="11">
      <v-card class="pa-4">
        <v-card-actions class="teal pointer" @click="show = !show">
          <v-card-title class="white--text pa-0">
            <span class="pointer">
              {{ $t('filter') }}
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
            <v-row class="mt-6">
              <v-col cols="12" md="4" class="pa-0 d-flex align-self-end">
                <span class="pl-6">
                  {{ $t('priceRange') }}
                </span>
                <v-range-slider
                  max="100"
                  min="5"
                  v-model="range"
                  @change="priceRange"
                  thumb-label="always"
                  persistent-hint
                  :hint="$t('numberAreInToman')"
                ></v-range-slider>
              </v-col>

              <v-col cols="12" md="4" class="pa-0 pr-md-2 pr-0 d-flex">
                <v-checkbox
                  class="pr-4"
                  v-model="filter.status"
                  @change="bookStatus"
                  :label="$t('existedBooks')"
                ></v-checkbox
                ><v-checkbox
                  class="pr-8"
                  v-model="filter.withDiscount"
                  :label="$t('discountedBooks')"
                ></v-checkbox>
              </v-col>
            </v-row>

            <div class="justify-center d-flex">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 px-8"
                @click="filterBook"
              >
                {{ $t('filterOn') }}
              </v-btn>
            </div>
          </v-form>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'bookFilterSearch',
  data() {
    return {
      valid: true,
      show: true,
      range: [5, 200],
      filter: {},
    };
  },
  methods: {
    getBookCat(value) {
      console.log(value);
    },
    filterBook() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.$emit('filterSearch', this.filter);
        this.show = false;
      } else {
        this.valid = false;
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
    },
    bookStatus() {
      if (this.filter.status) {
        this.filter.status = 'CONFIRMED';
      } else {
        delete this.filter.status;
      }
      console.log(this.filter.status);
    },
    priceRange() {
      this.filter.range = this.range;
    },
  },
};
</script>
