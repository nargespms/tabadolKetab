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
            <v-row class="mt-6">
              <v-col cols="12" md="6" class="pa-0 d-flex align-self-end">
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
                    `${filter.minPrice}${this.$t('rial')}-${
                      filter.maxPrice
                    }${this.$t('rial')}`
                  "
                ></v-range-slider>
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
      show: false,
      min: 10000,
      max: 4000000,
      range: [10000, 4000000],
      filter: {
        minPrice: 10000,
        maxPrice: 4000000,
      },
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
      this.filter = { minPrice: this.range[0], maxPrice: this.range[1] };
    },
  },
};
</script>
