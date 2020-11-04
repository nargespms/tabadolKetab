<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <printTableCmp
      v-if="!isLoading"
      :data="printData"
      :columns="discountCols"
    />
  </div>
</template>

<script>
import printTableCmp from '../components/print/printTableCmp.vue';

export default {
  name: 'print',
  components: {
    printTableCmp,
  },
  data() {
    return {
      endpoint: '',
      printData: '',
      isLoading: true,
      discountCols: [
        {
          text: 'id',
          value: 'id',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'title',
          value: 'title',
          align: 'center',
          filterable: true,
          divider: true,
        },

        {
          text: 'createdAt',
          value: 'createdAt',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'category',
          value: 'category',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'type',
          value: 'type',
          align: 'center',
          filterable: true,
          divider: true,
        },
        {
          text: 'amount',
          value: 'amount',
          filterable: true,
          align: 'left',
          divider: true,
        },
        {
          text: 'number',
          value: 'number',
          filterable: false,
          align: 'left',
          divider: true,
        },
        {
          text: 'usedNumber',
          value: 'usedNumber',
          filterable: false,
          align: 'left',
          divider: true,
        },
        {
          text: 'code',
          value: 'code',
          filterable: true,
          align: 'center',
          divider: true,
        },
        {
          text: 'description',
          value: 'description',
          filterable: true,
          align: 'center',
          divider: true,
          body: 150,
        },
        {
          text: 'user',
          value: 'user',
          filterable: true,
          align: 'center',
          divider: true,
        },
      ],
    };
  },
  methods: {
    getData() {
      this.$axios.get(this.endpoint).then(res => {
        this.printData = res.data;
        this.isLoading = false;
      });
    },
  },
  mounted() {
    console.log(this.$route.name);
    if (this.$route.name === 'printDiscounts') {
      this.endpoint = 'https://jsonplaceholder.typicode.com/users';
    }
    this.getData();
    // if(this.$router)
  },
};
</script>
