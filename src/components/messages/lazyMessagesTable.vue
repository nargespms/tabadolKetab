<template>
  <div>
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
        {{ $t('MessagesList') }}
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
          {{ $t('title') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>{{ $t('summaryText') }}</th>
        <th>
          {{ $t('sendDate') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('reciever') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('recieverNumber') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>{{ $t('attachments') }}</th>
        <th>
          {{ $t('sender') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('messageType') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>
          {{ $t('sendSms') }}
          <v-icon color="grey" size="11" class="pa-2" @click="filter"
            >fas fa-filter
          </v-icon>
        </th>
        <th>{{ $t('operation') }}</th>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.index">
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
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    medium
                    class="ma-2"
                    color="grey darken-3"
                    @click="deleteRecord(item)"
                    v-on="on"
                    v-bind="attrs"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                {{ $t('delete') }}
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
      <messageShow :item="previewItem" />
    </v-dialog>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deleteMessage'"
        :message="'RUSureUWantToDeletThisMessage'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
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
import promptDialog from '../structure/promptDialog.vue';
import messageShow from './messageShow.vue';

export default {
  name: 'lazyMessagesTable',
  components: {
    successNotif,
    promptDialog,
    messageShow,
  },
  props: {},
  data() {
    return {
      isLoading: true,
      loadingMore: false,
      tableData: [],
      // delete
      enableDelete: false,
      deletingItem: {},
      successNotif: false,
      // preview
      enablePreview: false,
      previewItem: {},
    };
  },

  methods: {
    addMessage() {
      this.$router.push({
        name: 'createNewMsg',
      });
    },
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      console.log(`deleted ${value.name}`);
      this.successNotif = true;

      this.closeDelete();
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
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
  },
  watch: {
    enablePreview(newVal) {
      if (newVal === false) {
        this.previewItem = {};
      }
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
  th,
  td {
    border: thin solid rgba(0, 0, 0, 0.12);
    font-weight: normal;
    text-align: center;
    padding: 8px;
  }
}
</style>
