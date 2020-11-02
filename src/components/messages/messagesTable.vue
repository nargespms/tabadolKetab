<template>
  <div>
    <span>
      This Component is not used anyWhere It will be deleted after
      lazyMessageTable confirmed
    </span>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :options.sync="innerOptions"
      update:options
      :server-items-length="totalData"
      :loading="loading"
      class="elevation-1 text-center ma-4"
      hide-default-header
      :loading-text="$t('loadingText')"
    >
      <template v-slot:top>
        <v-toolbar color="teal " flat height="48">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="white" @click="addMessage" v-bind="attrs" v-on="on"
                >mdi-comment-plus-outline
              </v-icon>
            </template>
            <span>{{ $t('CreateMessage') }}</span>
          </v-tooltip>
        </v-toolbar>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <v-icon
                v-if="h.sortable"
                :key="h.index"
                color="grey"
                @click="sort"
              >
                mdi-menu-down
              </v-icon>
              {{ $t(h.text) }}
              <v-icon
                v-if="h.filterable"
                color="grey"
                size="11"
                class="pa-2"
                @click="filter"
                >fas fa-filter
              </v-icon>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.operation`]="{ item }">
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
      </template>
    </v-data-table>
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
  name: 'messagesTable',
  components: {
    successNotif,
    promptDialog,
    messageShow,
  },
  props: {
    headers: { type: Array },
    tableData: { type: Array },
    options: {
      type: Object,
    },
    totalData: { type: Number },
    loading: { type: Boolean },
  },
  data() {
    return {
      innerOptions: this.options,
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
  },
  watch: {
    options: {
      handler(newVal) {
        this.innerOptions = newVal;
      },
    },
    enablePreview(newVal) {
      if (newVal === false) {
        this.previewItem = {};
      }
    },
  },
};
</script>
