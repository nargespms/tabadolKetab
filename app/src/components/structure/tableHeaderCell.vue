<template>
  <div class="text-center">
    <div :class="filterEnable && data.filterable ? 'mt-4' : ''">
      <v-icon v-if="data.sortable" :key="data.index" color="grey" @click="sort">
        mdi-menu-down
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

      <template v-slot:append v-if="filter[data.value]">
        <v-icon @click="clear(data.value)">mdi-close-circle-outline</v-icon>
      </template>
    </v-select>
    <datePickerCmp
      :style="`width:200px`"
      v-if="filterEnable && data.filterable && data.filterType === 'date'"
      class="pr-4 ma-auto mb-3"
      :placeHolderText="'sendDate'"
      @setDate="setDate"
      :isRequired="false"
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
  </div>
</template>

<script>
import _ from 'lodash';
import datePickerCmp from './datePickerCmp.vue';
import staffsAutoComplete from './staffsAutoComplete.vue';
import clientsAutoComplete from './clientsAutoComplete.vue';
import dateTime from '../../mixins/dateTime.js';
import rolesAutoComplete from './rolesAutocomplete.vue';
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';

export default {
  name: 'tableHeaderCell',
  components: {
    datePickerCmp,
    staffsAutoComplete,
    clientsAutoComplete,
    rolesAutoComplete,
    bookCatAutocomplete,
  },
  mixins: [dateTime],
  props: {
    data: {
      type: Object,
    },
    items: {
      type: Array,
    },
  },
  data() {
    return {
      filterEnable: false,
      date: '',
      filter: {},
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
    getBookCat(value) {
      console.log(value);
      if (value.length > 0) {
        this.filter[this.data.value] = value;
        console.log(this.filter[this.data.value]);
        this.emitFilter('categoryId');
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
    sort() {
      console.log('sorted');
    },
    emitFilter: _.debounce(function b(name) {
      console.log(name);
      this.$emit('filterCol', this.filter, name);
    }, 1500),
  },
};
</script>

<style lang="scss">
.w250 {
  width: 250px;
}
</style>
