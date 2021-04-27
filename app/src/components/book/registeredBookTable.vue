<template>
  <div>
    <div class="d-flex flex-row-reverse ma-4"></div>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :options.sync="innerOptions"
      update:options
      :server-items-length="totalData"
      hide-default-header
      hide-default-footer
      :loading="loading"
      class="elevation-1 text-center ma-4 clear"
      :loading-text="$t('loadingText')"
      :no-data-text="$t('Nodataavailable')"
      :mobile-breakpoint="100"
      expand-icon="mdi-menu-down"
      show-expand
      single-expand
      :expanded.sync="expanded"
      @update:expanded="getClientBooks(expanded)"
    >
      <template v-slot:top>
        <v-toolbar color="teal " flat height="48">
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('clientsWhoRegisteredBook') }}
          </span>
        </v-toolbar>
      </template>

      <template v-slot:header="{ props: { headers } }">
        <!-- {{ headers }} -->
        <thead class="tableDataHead grey lighten-2">
          <tr>
            <th class="text-center" v-for="h in headers" :key="h.index">
              <tableHeaderCell
                :data="h"
                @filterCol="filterCol"
                :items="h.text === 'status' ? statusItems : []"
                :editData="options.filter ? options.filter : {}"
              />
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        <span class="numberDir">
          {{ item.client.mobile }}
        </span>
      </template>

      <template v-slot:[`item.fullName`]="{ item }">
        <span> {{ item.client.firstName }} {{ item.client.lastName }} </span>
      </template>

      <template v-slot:[`item.credit`]="{ item }">
        <span> {{ moneyFormat(item.client.credit) }} {{ $t('rial') }} </span>
      </template>

      <template v-slot:[`item.email`]="{ item }">
        <span> {{ item.client.email }} </span>
      </template>

      <template v-slot:[`item.nationalId`]="{ item }">
        <span> {{ item.client.nationalId }} </span>
      </template>

      <!-- expanded rows for books  -->
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length - 1" class="pa-0 pt-4 pr-4 pb-4">
          <table
            v-if="books.length > 0"
            class="generalTable"
            :class="
              $vuetify.breakpoint.xl
                ? ''
                : $vuetify.breakpoint.lg
                ? ''
                : 'tableMobileScroll'
            "
          >
            <thead class="teal lighten-2">
              <th>
                {{ $t('name') }}
              </th>
              <th>
                {{ $t('createdAt') }}
              </th>
              <th>
                {{ $t('category') }}
              </th>

              <th>
                {{ $t('operation') }}
              </th>
            </thead>
            <tbody class="grey lighten-4">
              <tr v-for="book in books" :key="book.id">
                <td>
                  {{ book.name }}
                </td>
                <td>
                  {{ new Date(book.createdAt).toLocaleDateString('fa') }}
                </td>
                <td>
                  {{ book.category.title }}
                </td>

                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        medium
                        class="ma-2"
                        v-bind="attrs"
                        @click="edit(book)"
                        v-on="on"
                      >
                        mdi-pencil
                      </v-icon>
                    </template>
                    {{ $t('edit') }}
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
          <span v-else>
            {{ $t('Nodataavailable') }}
          </span>
        </td>

        <td></td
      ></template>

      <template v-if="totalData > 0" v-slot:[`footer`]="{ props }">
        <v-pagination
          class="pa-3 flex-wrap d-flex"
          @input="changePage"
          :value="options.page"
          :length="props.pagination.pageCount"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </template>
    </v-data-table>
    <v-dialog v-model="enableEdit" content-class="sh-0" max-width="1000">
      <addBookCmp
        :edittingData="edittingItem"
        :state="'modal'"
        :mode="'edit'"
        @closeModal="closeModal"
      />
    </v-dialog>
  </div>
</template>

<script>
import tableHeaderCell from '../structure/tableHeaderCell.vue';
import moneyFormat from '../../mixins/moneyFormat.js';
import addBookCmp from './addBookCmp.vue';

export default {
  name: 'registeredBookTable',
  components: { tableHeaderCell, addBookCmp },
  mixins: [moneyFormat],

  props: {
    headers: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    totalData: {
      type: Number,
    },
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      expanded: [],
      innerOptions: { ...this.options },
      filter: {},
      // edit
      enableEdit: false,
      edittingItem: {},
      // fiter
      statusItems: [
        { text: 'active', value: true },
        {
          text: 'inactive',
          value: false,
        },
      ],
      books: [],
    };
  },
  methods: {
    addClient() {
      this.$router.push({
        path: `/users/addUser`,
      });
    },
    edit(book) {
      this.enableEdit = true;
      this.edittingItem = book;
    },
    closeModal() {
      this.enableEdit = false;
      this.edittingItem = {};
      this.getClientBooks(this.expanded);
    },

    // filter
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
    changePage(page) {
      this.$emit('getData', {
        filter: this.filter,
        options: { ...this.options, page },
      });
    },
    excelFile() {
      // getData as excel file with filtered included
      const pagination = this.options;
      const excelData = Object.assign(pagination, {
        filter: this.filter,
      });
      console.log(excelData);
    },
    getClientBooks(expandedRow) {
      if (expandedRow.length > 0) {
        console.log(expandedRow);
        expandedRow.forEach(client => {
          const { id } = client;
          this.$axios
            .get('/v1/api/tabaadol-e-ketaab/books/list', {
              params: {
                filter: {
                  sellerId: id,
                  status: 'CLIENTREGISTER',
                },
              },
            })
            .then(res => {
              if (res.status === 200) {
                this.books = res.data.result.docs;
              }
            });
        });
      }
    },
  },
};
</script>

<style lang="scss">
.tableDataHead {
  tr {
    th {
      border-top: thin solid rgba(0, 0, 0, 0.12);
      border-right: thin solid rgba(0, 0, 0, 0.12);
    }
  }
}
.v-pagination {
  display: flex;
  flex-wrap: wrap;
}
</style>
