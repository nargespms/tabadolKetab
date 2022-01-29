<template>
  <div class="text-center">
    <div :class="filterEnable && data.filterable ? 'mt-4' : ''">
      <v-icon
        v-if="data.sortable && descSort"
        :key="data.index"
        color="grey"
        @click="sortFun(data.value)"
      >
        mdi-menu-down
      </v-icon>
      <v-icon
        v-if="data.sortable && !descSort"
        :key="data.index"
        color="grey"
        @click="sortFun(data.value)"
      >
        mdi-menu-up
      </v-icon>
      {{ $t(data.text) }}
      <v-icon
        v-if="data.filterable"
        color="grey"
        size="11"
        class="pa-2"
        @click="filterFunc"
        >fas fa-filter
      </v-icon>
    </div>

    <v-text-field
      outlined
      v-if="filterEnable && data.filterable && data.filterType === 'text'"
      v-model="filter[data.value]"
      :style="`width:200px`"
      class="ma-auto"
      @input="emitFilter(data.value)"
    >
      <template v-slot:append v-if="filter[data.value]">
        <v-icon @click="clear(data.value)">mdi-close-circle-outline</v-icon>
      </template>
    </v-text-field>

    <v-select
      outlined
      :style="`width:200px`"
      v-if="
        filterEnable &&
          data.filterable &&
          data.filterType === 'staticDropDown' &&
          items
      "
      class="ma-auto"
      :items="items"
      item-text="text"
      item-value="value"
      @input="emitFilter(data.value)"
      v-model="filter[data.value]"
    >
      <template v-slot:selection="{ item }">
        <span>
          {{ $t(item.text) }}
        </span>
      </template>
      <template v-slot:item="{ item }">
        <span>
          {{ $t(item.text) }}
        </span>
      </template>
      <template
        v-slot:append
        v-if="
          filter[data.value] ||
            (data.text === 'status' && filter.hasOwnProperty([data.value]))
        "
      >
        <v-icon @click="clear(data.value)">mdi-close-circle-outline</v-icon>
      </template>
    </v-select>
    <datePickerCmp
      :style="`width:200px`"
      v-if="filterEnable && data.filterable && data.filterType === 'date'"
      class="pr-4 ma-auto mb-3"
      @setDate="setDate"
      :isRequired="false"
      :editData="editData ? editData[data.value] : ''"
    />

    <template v-if="filterEnable && data.filterType === 'staffUsers'">
      <div class="ma-auto w250">
        <staffsAutoComplete @setStaff="setStaff" />
      </div>
    </template>

    <template v-if="filterEnable && data.filterType === 'clientUsers'">
      <div class="ma-auto w250">
        <clientsAutoComplete @setUser="setClient" />
      </div>
    </template>
    <template v-if="filterEnable && data.filterType === 'roles'">
      <div class="ma-auto w250">
        <rolesAutoComplete @setRole="setRole" />
      </div>
    </template>
    <template v-if="filterEnable && data.filterType === 'bookCategory'">
      <div class="ma-auto w250">
        <bookCatAutocomplete
          :isRequire="false"
          @sendValue="getBookCat"
          :height="32"
        />
      </div>
    </template>
    <template v-if="filterEnable && data.filterType === 'tags'">
      <div class="ma-auto w250">
        <tagsAutocomplete
          :isRequire="false"
          :placeHolder="'tags'"
          @sendValue="getTag"
          :height="32"
        />
      </div>
    </template>
    <template v-if="filterEnable && data.filterType === 'dateRange'">
      <div class="ma-auto ">
        <rangeDatePickerCmp
          ref="datePicker"
          :fromValidate="fromDateValidation"
          :toValidate="toDateValidation"
          :key="dateKey"
          @setDate="setRangeDate"
        />
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
import datePickerCmp from './datePickerCmp.vue';
import rangeDatePickerCmp from './rangeDatePickerCmp.vue';
import staffsAutoComplete from './staffsAutoComplete.vue';
import clientsAutoComplete from './clientsAutoComplete.vue';
import dateTime from '../../mixins/dateTime.js';
import rolesAutoComplete from './rolesAutocomplete.vue';
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';
import tagsAutocomplete from '../tags/tagsAutocomplete.vue';

export default {
  name: 'tableHeaderCell',
  components: {
    datePickerCmp,
    staffsAutoComplete,
    clientsAutoComplete,
    rolesAutoComplete,
    bookCatAutocomplete,
    tagsAutocomplete,
    rangeDatePickerCmp,
  },
  mixins: [dateTime],
  props: {
    data: {
      type: Object,
    },
    items: {
      type: Array,
    },
    editData: {
      type: Object,
    },
  },
  data() {
    return {
      filterEnable: false,
      date: '',
      filter: {},
      sort: '',
      sortMode: '',
      descSort: true,
      // rangeDate
      dateKey: 0,
      fromDateValidation: true,
      toDateValidation: true,
    };
  },
  methods: {
    // filter
    filterFunc() {
      this.filterEnable = !this.filterEnable;
    },

    setStaff(value) {
      if (value.length > 0) {
        this.filter[this.data.value] = value;
        if (this.data.filterName) {
          this.emitFilter(this.data.filterName);
        } else {
          this.emitFilter('createdById');
        }
      } else {
        delete this.filter[this.data.value];
        this.emitFilter(this.data.value);
      }
    },
    setClient(value) {
      if (value.length > 0) {
        this.filter[this.data.value] = value;
        if (this.data.filterName) {
          this.emitFilter(this.data.filterName);
        } else {
          this.emitFilter('clientId');
        }
      } else {
        delete this.filter[this.data.value];
        this.emitFilter(this.data.value);
      }
    },
    setRole(value) {
      if (value.length > 0) {
        this.filter[this.data.value] = value;
        console.log(this.filter[this.data.value]);
        this.emitFilter('roleId');
      } else {
        delete this.filter[this.data.value];
        this.emitFilter(this.data.value);
      }
    },
    setDate(value) {
      if (value.length > 0) {
        this.filter[this.data.value] = value;
        this.filter[this.data.value] = new Date(
          this.persionToGregorian(value)
        ).toISOString();

        if (this.data.filterName) {
          this.emitFilter(this.data.filterName);
        } else {
          this.emitFilter('createdAt');
        }
      } else {
        delete this.filter[this.data.value];
        this.emitFilter(this.data.value);
      }
    },
    setRangeDate(value) {
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

      if (this.toDateValidation && this.fromDateValidation) {
        if (this.data.value === 'soldDate') {
          this.filter.soldDateFrom = new Date(
            this.persionToGregorian(value.fromDate)
          ).toISOString();
          this.filter.soldDateTo = new Date(
            this.persionToGregorian(value.toDate)
          ).toISOString();
          this.emitFilterRange('soldDateFrom', 'soldDateTo');
        }
      }
    },
    getBookCat(value) {
      if (value.length > 0) {
        this.filter[this.data.value] = value;
        console.log(this.filter[this.data.value]);
        this.emitFilter('categoryId');
      } else {
        delete this.filter[this.data.value];
        this.emitFilter(this.data.value);
      }
    },
    getTag(value) {
      if (value.length > 0) {
        this.filter[this.data.value] = value.toString();
        this.emitFilter(this.data.value);
      } else {
        delete this.filter[this.data.value];
        this.emitFilter(this.data.value);
      }
    },
    clear(name) {
      this.filter[name] = '';
      delete this.filter[name];
      console.log(this.filter);
      this.emitFilter(name);
    },
    // sort funcs
    sortFun(value) {
      this.descSort = !this.descSort;

      if (this.descSort) {
        this.sortMode = 'DESC';
      } else {
        this.sortMode = 'ASC';
      }

      this.sort = value;
      this.$emit('sortCol', this.sort, this.sortMode);
    },

    emitFilter: _.debounce(function b(name) {
      if (
        this.data.filterName === 'sellerMobile' &&
        this.filter.sellerMobile.length > 7
      ) {
        this.$emit('filterCol', this.filter, name);
      } else if (this.data.filterName !== 'sellerMobile') {
        this.$emit('filterCol', this.filter, name);
      }
    }, 1500),

    emitFilterRange: _.debounce(function b(first, second) {
      this.$emit('filterColRange', this.filter, first, second);
    }, 1500),
  },
  watch: {
    editData(newVal) {
      if (this.editData && Object.keys(this.editData)[0] === this.data.value) {
        this.filter = newVal;
      }
    },
    filterEnable(newVal) {
      this.filterEnable = newVal;
    },
  },
  mounted() {
    if (this.editData && Object.keys(this.editData)[0] === this.data.value) {
      // console.log(this.editData);
      // console.log(Object.keys(this.editData)[0]);
      // console.log(this.data.value);
      this.filter = this.editData;
      this.filterEnable = true;
      console.log('ss');
    }
  },
};
</script>

<style lang="scss">
.w250 {
  width: 250px;
}
</style>
