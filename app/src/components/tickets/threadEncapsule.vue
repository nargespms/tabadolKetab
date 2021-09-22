<template>
  <v-row no-gutters class="justify-center pt-4 ">
    <v-col>
      <v-card
        class="pa-4 d-flex justify-space-between"
        :color="
          userName === 'staff' ? 'teal lighten-5' : 'light-blue lighten-5'
        "
      >
        <div class="d-flex">
          <div class="ticketInfo pa-4">
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
        <filePreview
          v-if="data.attachment"
          :data="data.attachment ? data.attachment : {}"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import filePreview from '../file/filePreview.vue';

export default {
  name: 'threadEncapsule',
  components: {
    filePreview,
  },
  props: {
    data: {
      type: Object,
    },
    userName: {
      type: String,
    },
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
