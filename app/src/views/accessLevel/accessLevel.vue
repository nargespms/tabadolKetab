<template>
  <addAccessLevel
    :mode="'edit'"
    :permission="permission"
    v-if="!isLoading"
    :key="componentKey"
    :title="permission.title"
    :editData="editData"
  />
</template>

<script>
import addAccessLevel from '../../components/accessLevel/addAccessLevel.vue';

export default {
  name: 'accessLevel',
  components: {
    addAccessLevel,
  },
  data() {
    return {
      isLoading: true,
      permission: {},
      componentKey: 0,
      editData: {},
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/role/${this.$route.params.role}`)
        .then((res) => {
          if (res.status === 200) {
            this.permission.title = res.data.title;
            this.editData = res.data;
            this.initData(res.data);
            console.log(res.data);
            this.isLoading = false;
          }
        });
    },
    initData(data) {
      this.permission.tagData = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_tag,
          },
          {
            name: 'delete',
            value: data.d_tag,
          },
          { name: 'preview', value: data.r_tag },
        ],
      };
      this.permission.staffData = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_staff,
          },
          {
            name: 'delete',
            value: data.d_staff,
          },
        ],
      };
      this.permission.clientData = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_client,
          },
          {
            name: 'delete',
            value: data.d_client,
          },
        ],
      };
      this.permission.forbiddenData = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_forbiddenBook,
          },
          {
            name: 'delete',
            value: data.d_forbiddenBook,
          },
        ],
      };
      this.permission.discount = {
        items: [
          {
            name: 'addORedit',
            value: data.cd_discount,
          },
        ],
      };
      this.permission.book = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_book,
          },
          {
            name: 'delete',
            value: data.d_book,
          },
        ],
      };
      this.permission.ticket = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_ticket,
          },
        ],
      };
      this.permission.transaction = {
        items: [
          {
            name: 'preview',
            value: data.r_transaction,
          },
        ],
      };
      this.permission.category = {
        items: [
          {
            name: 'preview',
            value: data.cu_category,
          },
        ],
      };
      this.permission.log = {
        items: [
          {
            name: 'preview',
            value: data.r_log,
          },
        ],
      };
      this.permission.role = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_role,
          },
        ],
      };
      this.permission.messages = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_message,
          },
          {
            name: 'delete',
            value: data.d_message,
          },
        ],
      };
      this.permission.orders = {
        items: [
          {
            name: 'postListPreview',
            value: data.r_post,
          },
          {
            name: 'previewAll',
            value: data.r_order,
          },
        ],
      };
      this.permission.authors = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_author,
          },
          {
            name: 'delete',
            value: data.d_author,
          },
        ],
      };
      this.permission.publishers = {
        items: [
          {
            name: 'addORedit',
            value: data.cu_publisher,
          },
          {
            name: 'delete',
            value: data.d_publisher,
          },
        ],
      };
      this.permission.invoices = {
        items: [
          {
            name: 'add',
            value: data.c_invoice,
          },
          {
            name: 'delete',
            value: data.d_invoice,
          },
          {
            name: 'previewAll',
            value: data.r_invoices,
          },
          {
            name: 'preview',
            value: data.r_invoice,
          },
        ],
      };
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
