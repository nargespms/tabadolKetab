<template>
  <div>
    <dataTableWrap
      :headers="
        this.$store.state.bookShop.userInfo.role !== 'CLIENT'
          ? headers
          : clientHeaders
      "
      :module="'messages'"
      :endpoint="'/v1/api/tabaadol-e-ketaab/messages/list'"
    />
  </div>
</template>

<script>
import dataTableWrap from '../../components/structure/dataTableWrap.vue';

export default {
  name: 'messagesList',
  components: {
    dataTableWrap,
  },
  data() {
    return {
      headers: [
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'sendDate',
          value: 'sendDate',
          align: 'center',
          filterable: true,
          filterType: 'date',
          filterName: 'sendDate',
          divider: true,
        },
        {
          text: 'receiver',
          value: 'receiver',
          align: 'center',
          divider: true,
        },
        {
          text: 'receiverPhoneNumber',
          value: 'receiverPhoneNumber',
          align: 'left',
          class: 'ltr',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'attachments',
          value: 'attachments',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'sender',
          value: 'createdById',
          align: 'center',
          filterable: true,
          filterType: 'staffUsers',
          divider: true,
        },
        {
          text: 'type',
          value: 'type',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'sms',
          value: 'sms',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },

        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          filterable: false,
          divider: true,
        },
      ],
      clientHeaders: [
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          filterType: 'text',
          divider: true,
        },
        {
          text: 'sendDate',
          value: 'sendDate',
          align: 'center',
          filterable: true,
          filterType: 'date',
          filterName: 'sendDate',
          divider: true,
        },
        {
          text: 'sender',
          value: 'sender',
          align: 'center',
          filterable: true,
          filterType: 'bookCategory',
          divider: true,
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          filterable: true,
          filterType: 'staticDropDown',
          divider: true,
        },
        {
          text: 'operation',
          value: 'operation',
          align: 'center',
          filterable: false,
          divider: true,
        },
      ],
    };
  },
};
</script>
