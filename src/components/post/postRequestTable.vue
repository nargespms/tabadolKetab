<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4">
      <v-btn color="green" class="white--text" @click="addressModal">{{
        $t('postRequest')
      }}</v-btn>
    </div>
    <v-toolbar color="teal " flat height="48">
      <v-icon color="white">fas fa-motorcycle</v-icon>
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('postRequest') }}
      </span>
    </v-toolbar>
    <v-progress-linear
      v-if="isLoading"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <table v-if="!isLoading" class="generalTable ">
      <thead class="grey lighten-2">
        <th>
          {{ $t('select') }}
        </th>
        <th>
          {{ $t('title') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('reqisterDate') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('category') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.index">
          <td class="d-flex justify-center">
            <v-checkbox @click="postRequest(item)"></v-checkbox>
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.name }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-center">
      <v-btn
        class="ma-2 d-flex"
        :loading="loadingMore"
        :disabled="loadingMore"
        color="teal white--text"
        @click="getMoreData"
      >
        {{ $t('uploadeMore') }}
      </v-btn>
      <v-btn color="green" class="white--text ma-2" @click="addressModal">{{
        $t('postRequest')
      }}</v-btn>
    </div>
    <v-dialog v-model="addressModalEnable" max-width="500px">
      <addressCmp />
    </v-dialog>
    <successNotif
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
    />
  </div>
</template>

<script>
import successNotif from '../structure/successNotif.vue';
import addressCmp from '../userControls/addressCmp.vue';

export default {
  name: 'postRequestTable',
  components: {
    addressCmp,
    successNotif,
  },
  data() {
    return {
      request: [],
      successNotif: false,
      isLoading: true,
      loadingMore: false,
      tableData: [],
      addressModalEnable: true,
    };
  },
  methods: {
    postRequest(item) {
      this.request.push(item);
    },
    hideNotif() {
      this.successNotif = false;
    },
    // sort funcs
    sort() {
      console.log('sorted');
    },
    // filter
    filter() {
      console.log('filtered');
    },
    getData() {
      this.$axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          console.log();
          this.tableData = res.data;
          this.isLoading = false;
        });
    },
    getMoreData() {
      this.loadingMore = true;
      this.$axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          console.log();
          this.tableData.push(...res.data);
          this.loadingMore = false;
        });
    },
    addressModal() {
      this.addressModalEnable = true;
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss">
.generalTable {
  border: thin solid rgba(0, 0, 0, 0.12);
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
  th {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
  td {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 4px;
  }
}
</style>
