<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="8">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="cat in tagCategory"
          :key="cat.title"
          :color="cat.color"
          small
        >
          <div>
            <div class="font-weight-normal">
              <strong
                :class="
                  cat.title === 'activeTags'
                    ? 'success--text'
                    : 'red--text darken-2--text'
                "
                >{{ $t(cat.title) }}</strong
              >
            </div>
            <div v-if="cat.title === 'activeTags'">
              <v-card
                v-for="item in activeTags"
                :key="item.index"
                class="d-flex float-right ml-4 mb-4 mt-4"
              >
                <v-card-title>
                  {{ item.title }}
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    width="35"
                    height="35"
                    min-width="10"
                    color="grey lighten-1"
                    @click="deleteRecord(item)"
                  >
                    <v-icon small>fas fa-ban</v-icon>
                  </v-btn>
                  <v-btn
                    width="35"
                    height="35"
                    min-width="10"
                    color="grey lighten-1"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
            <div v-else>
              <v-card
                v-for="item in deactiveTags"
                :key="item.index"
                class="d-flex float-right ml-4 mb-4 mt-3"
              >
                <v-card-title>
                  {{ item.title }}
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn class="pa-0" color="grey lighten-1">
                    <v-icon>fas fa-ban</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="'deActiveTags'"
        :message="'RUSureUWantToDeactiveThisTag'"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
    <notifMessage
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
  </v-row>
</template>

<script>
import promptDialog from '../structure/promptDialog.vue';
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'tagsList',
  components: {
    promptDialog,
    notifMessage,
  },
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      // delete
      enableDelete: false,
      deletingItem: {},
      successNotif: false,
      tagCategory: [
        {
          title: 'activeTags',
          color: 'success',
        },
        {
          title: 'inactiveTags',
          color: 'red darken-2',
        },
      ],
    };
  },
  methods: {
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.enableDelete = true;
    },
    acceptDelete(value) {
      console.log(`deleted ${value.name}`);
      this.successNotif = true;
      // ban this tag delet req to server

      this.deletingItem = value;
      this.closeDelete();
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },
    hideNotif() {
      this.$emit('banTag');
      this.successNotif = false;
    },
  },
  computed: {
    activeTags() {
      return this.data.filter(item => item.status === 'ACTIVE');
    },
    deactiveTags() {
      return this.data.filter(item => item.status === 'DEACTIVE');
    },
  },
};
</script>
