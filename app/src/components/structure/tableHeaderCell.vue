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
  </div>
</template>

<script>
import _ from 'lodash';
import datePickerCmp from './datePickerCmp.vue';

export default {
  name: 'tableHeaderCell',
  components: {
    datePickerCmp,
  },
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
    // convert out put of date picker to gregorian timestamp for server
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().setHours(15, 0);
    },
    setDate(value) {
      if (value.length > 0) {
        console.log(`date is :${value}`);
        this.filter[this.data.value] = value;
        this.filter[this.data.value] = new Date(
          this.persionToGregorian(value)
        ).toISOString();
        console.log(this.filter[this.data.value]);
        this.emitFilter('createdAt');
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
