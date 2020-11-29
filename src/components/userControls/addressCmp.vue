<template>
  <v-card>
    <v-toolbar
      color="teal "
      flat
      height="48"
      class="pointer"
      @click="show = !show"
    >
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
      @hideAddressList="hideAddressList"
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
    addNewAddress() {
      this.mode = 'add';
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
