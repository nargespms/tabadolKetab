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
      <v-btn
        class="ml-4 white--text"
        color="blue lighten-1"
        @click="changeType('PUBLIC')"
        >{{ $t('PUBLIC') }}</v-btn
      >
      <v-btn
        class="ml-4 white--text"
        color="indigo lighten-1"
        @click="changeType('PRIVATE')"
        >{{ $t('PRIVATE') }}</v-btn
      >
    </div>
    <v-toolbar color="teal " flat height="48">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="white" @click="addMessage" v-bind="attrs" v-on="on"
            >mdi-comment-plus-outline
          </v-icon>
        </template>
        <span>{{ $t('CreateMessage') }}</span>
      </v-tooltip>
      <span class="pr-4 font-weight-medium white--text">
        {{ $t(tableName) }}
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
      :class="
        $vuetify.breakpoint.xl
          ? ''
          : $vuetify.breakpoint.lg
          ? ''
          : 'tableMobileScroll'
      "
    >
      <thead class="grey lighten-2">
        <th class="text-center" v-for="h in headers" :key="h.index">
          <tableHeaderCell
            :data="h"
            :items="h.text === 'type' ? status : h.text === 'sms' ? smsOpt : []"
            @filterCol="filterCol"
          />
        </th>
      </thead>
      <tbody v-if="tableData.length > 0">
        <tr v-for="item in tableData" :key="item.index">
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ new Date(item.sendDate).toLocaleDateString('fa') }}
          </td>
          <td>
            {{ item.receiver.firstName }}
            {{ item.receiver.lastName }}
          </td>
          <td>
            <span class="numberDir">
              {{ item.receiver.mobile }}
            </span>
          </td>
          <td>
            {{ item.attachments }}
          </td>
          <td>
            {{ item.createdBy.firstName }}
            {{ item.createdBy.lastName }}
          </td>
          <td>
            {{ $t(item.type) }}
          </td>
          <td>
            <span v-if="item.sms">
              {{ $t('smsDone') }}
              <v-icon color="success">mdi-check</v-icon>
            </span>
            <span v-else>
              {{ $t('smsUnDone') }}
              <v-icon color="error">mdi-close</v-icon>
            </span>
          </td>

          <td>
            <div class="d-flex justify-center">
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
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    class="ma-2"
                    @click="editRecord(item)"
                    v-on="on"
                    v-bind="attrs"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                {{ $t('edit') }}
              </v-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="tableData.length === 0">
        <div class=" pa-4 ma-auto ">
          <span class="text-center">
            {{ $t('noResultsText') }}
          </span>
        </div>
      </tbody>
    </table>
    <div class="d-flex justify-center">
      <v-btn
        class="ma-2 d-flex"
        :loading="loadingMore"
        :disabled="enableLoadingMore"
        color="teal white--text"
        @click="getMoreData"
      >
        {{ $t(uploadMoreBut) }}
      </v-btn>
    </div>
    <v-dialog
      v-model="enablePreview"
      content-class="sh-0"
      @click:outside="closeDialog"
    >
      <messageShow :id="previewItem.id" />
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
import tableHeaderCell from '../structure/tableHeaderCell.vue';
import messageShow from './messageShow.vue';

export default {
  name: 'lazyMessagesTable',
  components: {
    notifMessage,
    messageShow,
    tableHeaderCell,
  },
  props: {
    headers: { type: Array },
    tableData: { type: Array },
    totalData: { type: Number },
    loading: { type: Boolean },
    options: {
      type: Object,
      default: () => ({
        descending: false,
        page: 1,
        limit: 10,
      }),
    },
  },
  data() {
    return {
      isLoading: false,
      loadingMore: false,
      enableLoadingMore: false,
      // tableData: [],
      innerOptions: this.options,

      successNotif: false,
      // preview
      enablePreview: false,
      previewItem: {},
      tableName: 'PUBLIC',
      filter: {},
      uploadMoreBut: 'uploadeMore',
      status: [
        { text: 'PRIVATE', value: 'PRIVATE' },
        { text: 'PUBLIC', value: 'PUBLIC' },
      ],
      smsOpt: [
        { text: 'smsTrue', value: 'true' },
        { text: 'smsFalse', value: 'false' },
      ],
    };
  },

  methods: {
    addMessage() {
      this.$router.push({
        name: 'createNewMsg',
      });
    },

    hideNotif() {
      this.successNotif = false;
    },
    // methods for preview
    preview(item) {
      console.log(item);
      this.enablePreview = true;
      this.previewItem = item;
    },
    // edit func
    editRecord(item) {
      this.$router.push({
        path: `/messagesList/${item.id}`,
      });
    },
    excelFile() {
      // getData as excel file with filtered included
    },
    reloadTable() {
      this.onRequest({
        options: this.innerOptions,
      });
    },
    filterCol(value, name) {
      this.filter[name] = value[name];
      this.onRequest({
        options: this.innerOptions,
      });
    },
    onRequest(props) {
      props.filter = this.filter;
      this.innerOptions = props.options;
      this.$emit('getData', props);
    },
    printData() {
      // go to print page of this table
      const routeData = this.$router.resolve({
        name: 'printMessages',
      });
      window.open(routeData.href, '_blank');
    },

    getMoreData() {
      this.loadingMore = true;
      this.enableLoadingMore = true;
      this.$axios
        .get('/v1/api/tabaadol-e-ketaab/messages/list', {
          params: {
            offset: this.tableData.length,
            limit: this.innerOptions.limit,
          },
        })
        .then(res => {
          if (res.data.result.docs.length > 0) {
            this.tableData.push(...res.data.result.docs);
            this.enableLoadingMore = false;
          } else {
            this.uploadMoreBut = 'endOfList';
            this.enableLoadingMore = true;
          }
          this.loadingMore = false;
        });
    },
    changeType(name) {
      this.tableName = name;
      this.filter.type = name;
      this.onRequest({
        options: this.innerOptions,
      });
    },
    closeDialog() {
      this.previewItem = {};
    },
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

<style lang="scss">
.generalTable {
  border: thin solid rgba(0, 0, 0, 0.12);
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
  th,
  td {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
}
.tableMobileScroll {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
