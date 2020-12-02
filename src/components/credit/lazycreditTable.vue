<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4">
      <v-btn
        color="light-blue darken-2"
        class="white--text"
        @click="printData"
        >{{ $t('print') }}</v-btn
      >
      <v-btn class="ml-4 white--text" color="green" @click="excelFile">{{
        $t('filteredFileDl')
      }}</v-btn>
    </div>
    <v-toolbar color="teal " flat height="48">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="white" @click="addCredit" v-bind="attrs" v-on="on"
            >mdi-credit-card-plus
          </v-icon>
        </template>
        <span>{{ $t('increaseCredit') }}</span>
      </v-tooltip>
      <span class="pr-4 font-weight-medium white--text">
        {{ $t('transactionsList') }}
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
      :class="$vuetify.breakpoint.lg ? '' : 'tableMobileScroll'"
    >
      <thead class="grey lighten-2">
        <th>
          {{ $t('id') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('transactionDate') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('amount') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('trackingCode') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>{{ $t('payType') }}</th>
        <th>
          {{ $t('sender') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('description') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('user') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('expDateCredit') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>{{ $t('operation') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="item in tableData"
          :key="item.index"
          :class="item.name === 'Ervin Howell' ? 'grey lighten-2' : ''"
        >
          <td>
            {{ item.name }}
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
          <td>
            {{ item.name }}
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
          <td>
            {{ item.name }}
          </td>
          <td>
            <div class="d-flex">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    class="ma-2"
                    v-bind="attrs"
                    @click="preview(item)"
                    v-on="on"
                  >
                    mdi-eye
                  </v-icon>
                </template>
                {{ $t('preview') }}
              </v-tooltip>
            </div>
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
    </div>

    <v-dialog v-model="enablePreview" content-class="sh-0">
      <showCredit :item="previewItem" />
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
import showCredit from './showCredit.vue';

export default {
  name: 'lazycreditTable',
  components: {
    notifMessage,
    showCredit,
  },

  data() {
    return {
      isLoading: true,
      loadingMore: false,
      tableData: [],
      successNotif: false,
      // preview
      enablePreview: false,
      previewItem: {},
    };
  },
  methods: {
    addCredit() {
      this.$router.push({
        name: 'increaseCredit',
      });
    },

    hideNotif() {
      this.successNotif = false;
    },
    // methods for preview
    preview(item) {
      this.enablePreview = true;
      this.previewItem = item;
    },
    // sort funcs
    sort() {
      console.log('sorted');
    },
    // filter
    filter() {
      console.log('filtered');
    },
    excelFile() {
      // getData as excel file with filtered included
    },
    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printCredit',
      });
      window.open(routeData.href, '_blank');
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
  },
  mounted() {
    this.getData();
  },
  watch: {
    enablePreview(newVal) {
      if (newVal === false) {
        this.previewItem = {};
      }
    },
  },
};
</script>
