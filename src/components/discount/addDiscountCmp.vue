<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="9">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('addDiscount') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="discountsList">
                  fa fa-table</v-icon
                >
              </v-btn>
            </template>
            <span>
              {{ $t('discountsList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form class="pt-6 pa-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="12" class="pa-0 ">
              <v-text-field
                v-model="discount.title"
                :rules="requireRule"
                :label="$t('title')"
                required
                outlined
                error-count="2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" class="pa-0">
              <rangeDatePickerCmp
                ref="datePicker"
                :fromValidate="fromDateValidation"
                :toValidate="toDateValidation"
                :key="dateKey"
                @setDate="setDate"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 ">
              <v-select
                :items="discountType"
                v-model="discount.type"
                :label="$t('discountType')"
                outlined
                required="true"
                :rules="[v => !!v || `${this.$t('thisFieldIsRequired')}`]"
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
            <v-col cols="12" md="6" class="pa-0 pr-0 pr-md-4 pr-lg-4">
              <v-text-field
                v-model.number="discount.amount"
                :rules="requireRule"
                :label="$t('amount')"
                required
                outlined
                error-count="1"
                v-mask="'##########'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              :md="discount.type === 'percent' ? '4' : '6'"
              class="pa-0"
            >
              <v-text-field
                v-model.number="discount.number"
                :label="$t('number')"
                outlined
                v-mask="'##########'"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              :md="discount.type === 'percent' ? '4' : '6'"
              class="pa-0 pr-md-4  pr-lg-4 pr-0"
            >
              <v-text-field
                v-model="discount.preCode"
                :label="$t('discountCode')"
                :rules="prefix"
                outlined
                :hint="
                  this.discount.preCode
                    ? `${$t('legalCharsAreEngCharNum')}`
                    : ''
                "
                persistent-hint
              ></v-text-field>
            </v-col>

            <v-col
              v-if="discount.type === 'percent'"
              cols="12"
              :md="discount.type === 'percent' ? '4' : '6'"
              class="pa-0 pr-md-4  pr-lg-4 pr-0"
            >
              <v-text-field
                v-model.number="discount.maxAmount"
                :label="$t('discountMaxAmount')"
                outlined
                v-mask="'##########'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="pa-0 pb-6 pa-md-0 pa-lg-0">
              <bookCatAutocomplete ref="bookCat" :validate="bookCatVallidate"
            /></v-col>
            <v-col cols="12" md="6" class="pa-0 pr-0 pr-md-4 pr-lg-4 pb-4">
              <usersAutocomplete
                ref="userAutocomplete"
                :validate="userValidate"
                :hint="`${$t('notSelectedMeanAll')}`"
                :persistentHint="true"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0 pt-4">
              <v-textarea
                v-model="discount.desc"
                :label="$t('description')"
                name="input-7-4"
                outlined
              ></v-textarea>
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
      <successNotif
        v-if="saveSuccess"
        :msg="'operationSuccessfullyOcured'"
        @hideNotif="hideNotif"
      />
    </v-col>
  </v-row>
</template>

<script>
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';
import usersAutocomplete from '../structure/usersAutoComplete.vue';
import successNotif from '../structure/successNotif.vue';
import rangeDatePickerCmp from '../structure/rangeDatePickerCmp.vue';

export default {
  name: 'addDiscountCmp',
  components: {
    successNotif,
    bookCatAutocomplete,
    usersAutocomplete,
    rangeDatePickerCmp,
  },
  data() {
    return {
      valid: true,
      saveSuccess: false,
      discount: {
        title: '',
      },
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      prefix: [
        value => {
          const pattern = /^[a-z][a-z0-9]*$/i;
          return pattern.test(value) || `${this.$t('invalidPhrase')}`;
        },
      ],
      // rangepcker data
      dateKey: 0,
      fromDateValidation: true,
      toDateValidation: true,
      discountType: ['percent', 'cost'],
      // bookCategory vlidate
      bookCatVallidate: true,
      // user validation
      userValidate: true,
    };
  },

  methods: {
    discountsList() {
      this.$router.push({
        name: 'discountsList',
      });
    },
    setDate(value) {
      console.log(`date is :${value.fromDate}`);
      console.log(`date is :${value.toDate}`);
    },
    // validate form
    validate() {
      this.$refs.form.validate();
      // date picker validation
      if (
        this.$refs.datePicker.date.fromDate.length < 1 ||
        this.$refs.datePicker.date === null
      ) {
        this.fromDateValidation = false;
      } else {
        this.fromDateValidation = true;
      }
      if (
        this.$refs.datePicker.date === null ||
        this.$refs.datePicker.date.toDate.length < 1
      ) {
        this.toDateValidation = false;
      } else {
        this.toDateValidation = true;
      }
      // book category validation
      if (
        this.$refs.bookCat.bookCats.length < 1 ||
        this.$refs.bookCat.bookCats === null
      ) {
        this.bookCatVallidate = false;
      } else {
        this.bookCatVallidate = true;
      }

      // user validation
      if (
        this.$refs.userAutocomplete.users === null ||
        this.$refs.userAutocomplete.users.length < 1
      ) {
        this.userValidate = false;
      } else {
        this.userValidate = true;
      }

      if (this.toDateValidation && this.fromDateValidation) {
        // formvalidation
        if (this.$refs.form.validate()) {
          this.saveSuccess = true;
          this.reset();
        } else {
          this.valid = false;
        }
      }
    },
    // reset form
    reset() {
      this.$refs.form.reset();
      this.dateKey = +1;
      this.toDateValidation = true;
      this.fromDateValidation = true;
      this.bookCatVallidate = true;
      this.userValidate = true;
    },
    // notification hide
    hideNotif() {
      this.saveSuccess = false;
    },
  },
};
</script>

<style lang="scss"></style>
