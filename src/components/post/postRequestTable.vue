<template>
  <div>
    <v-row class="px-2 justify-end">
      <v-col cols="12" md="4" align="center" class="pa-0">
        <div class="d-flex flex-row-reverse  pa-2">
          <v-btn
            color="green"
            class="white--text"
            @click="addressModal"
            :disabled="request.length < 1"
            >{{ $t('postRequest') }}</v-btn
          >
          <div v-if="request.length < 1" class="warnReq ml-3">
            <v-icon color="red"> fas fa-exclamation-triangle </v-icon>
            {{ $t('chooseAtLeastOneBook') }}
          </div>
        </div>
      </v-col>
    </v-row>
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
    <table
      v-if="!isLoading"
      class="generalTable "
      :class="$vuetify.breakpoint.xs ? 'tableMobileScroll' : ''"
    >
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
            <v-checkbox :value="item" v-model="request"></v-checkbox>
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
      <v-btn
        color="green"
        class="white--text ma-2"
        @click="addressModal"
        :disabled="request.length < 1"
        >{{ $t('postRequest') }}</v-btn
      >
    </div>
    <v-dialog v-model="addressModalEnable" max-width="500px">
      <addressCmp @hideAddressList="hideAddressList" state="list" />
    </v-dialog>
    <notifMessage
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
  </div>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';
import addressCmp from '../userControls/addressCmp.vue';

export default {
  name: 'postRequestTable',
  components: {
    addressCmp,
    notifMessage,
  },
  data() {
    return {
      request: [],
      successNotif: false,
      isLoading: true,
      loadingMore: false,
      tableData: [],
      addressModalEnable: false,
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
    hideAddressList() {
      this.addressModalEnable = false;
      this.successNotif = true;
      this.request = [];
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
.tableMobileScroll {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
.warnReq {
  padding: 8px;
  border: 1px solid red;
  border-radius: 3px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>
