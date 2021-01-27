<template>
  <v-row no-gutters class="justify-center pt-4 ">
    <v-col>
      <v-card
        class="pa-4 d-flex justify-space-between"
        :color="userName === 'staff' ? 'teal lighten-5' : 'blue-grey lighten-5'"
      >
        <div class="d-flex">
          <div class="ticketInfo pa-4">
            <v-avatar size="32">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
            <span class="grey--text text--darken-3" v-if="data[userName]">
              {{ data[userName].firstName }}
            </span>
            &nbsp;
            <span class="grey--text text--darken-3" v-if="data[userName]">
              {{ data[userName].lastName }}
            </span>
            <p class="text-center pt-3 grey--text text--darken-2 fn12">
              {{ new Date(data.createdAt).toLocaleTimeString('fa') }}
              &nbsp;
              <v-icon small>
                mdi-checkbox-intermediate
              </v-icon>
              {{ new Date(data.createdAt).toLocaleDateString('fa') }}
            </p>
          </div>

          <div class="ticketDesc pa-4">
            {{ data.description }}
          </div>
        </div>

        <v-card
          class="attachments pa-2 d-flex  justify-space-between flex-column"
          width="160"
          height="125"
        >
          <v-icon color="grey " x-large class="d-flex">
            mdi-file-document
          </v-icon>
          <v-card-actions class="grey lighten-2">
            <v-spacer></v-spacer>
            <span>
              {{ attachments.name }}
            </span>
            <v-icon left color="primary" medium class="pointer"
              >mdi-download
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'threadEncapsule',
  props: {
    data: {
      type: Object,
    },
    userName: {
      type: String,
    },
  },
  data() {
    return {
      attachments: {
        name: 'file.txt',
      },
    };
  },
};
</script>

<style lang="scss">
.ticketDesc {
  border-right: 1px solid #bfbfbf;
  border-radius: 0 !important;
}
.pointer {
  cursor: pointer;
}
.ticketInfo {
  min-width: 200px;
}
</style>
