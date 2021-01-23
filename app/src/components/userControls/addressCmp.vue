<template>
  <v-card>
    <v-toolbar
      color="teal "
      flat
      height="48"
      class="pointer "
      @click="show = !show"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="white" v-bind="attrs" v-on="on">
            mdi-comment-question-outline
          </v-icon>
        </template>
        <span> حداکثر تعداد آدرس ۳ میباشد </span>
      </v-tooltip>
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('selectAddress') }}
      </span>
    </v-toolbar>

    <addressInput
      v-if="mode === 'add' || mode === 'edit'"
      :mode="mode"
      :data="edittingItem"
      @saveAddress="saveAddress"
      @returnToList="returnToList"
    />
    <addressList
      v-show="expand ? show : true"
      v-if="mode === 'list'"
      @editAddress="editAddress"
      @addNewAddress="addNewAddress"
      @deleteAddress="deleteAddress"
      @hideAddressList="hideAddressList"
      @setAddress="setAddress"
    />
  </v-card>
</template>

<script>
import addressList from './addressList.vue';
import addressInput from './addressInput.vue';

export default {
  name: 'addressCmp',
  props: {
    state: {
      type: String,
    },
    expand: {
      type: Boolean,
    },
  },
  components: {
    addressList,
    addressInput,
  },
  data() {
    return {
      show: false,
      mode: this.state,
      edittingItem: {},
    };
  },
  methods: {
    editAddress(item) {
      this.edittingItem = item;
      this.mode = 'edit';
    },
    deleteAddress(item) {
      console.log(`delete${item.id}`);
    },
    addNewAddress() {
      this.mode = 'add';
    },
    setAddress(value) {
      this.$emit('setAddress', value);
    },
    saveAddress(value) {
      this.mode = value;
    },
    returnToList(value) {
      this.mode = value;
    },
    hideAddressList() {
      this.$emit('hideAddressList');
    },
  },
  watch: {
    state(newVal) {
      this.mode = newVal;
    },
  },
};
</script>
