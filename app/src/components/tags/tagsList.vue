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
                <v-card-title> {{ item.title }} </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        width="35"
                        height="35"
                        min-width="10"
                        color="grey lighten-1"
                        v-on="on"
                        v-bind="attrs"
                        class="ml-3"
                        @click="editTag(item)"
                      >
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    {{ $t('edit') }}
                  </v-tooltip>
                  <v-spacer></v-spacer>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        width="35"
                        height="35"
                        min-width="10"
                        v-on="on"
                        v-bind="attrs"
                        color="grey lighten-1"
                        @click="deleteRecord(item)"
                      >
                        <v-icon small>fas fa-ban</v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{ $t('deactivate') }}
                    </span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </div>
            <div v-else>
              <v-card
                v-for="item in deactiveTags"
                :key="item.index"
                class="d-flex float-right ml-4 mb-4 mt-3 red-br"
              >
                <v-card-title>
                  {{ item.title }}
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="pa-0"
                        color="grey lighten-1"
                        v-bind="attrs"
                        v-on="on"
                        @click="retriveRecord(item)"
                      >
                        <v-icon>mdi-delete-restore</v-icon>
                      </v-btn>
                    </template>
                    <span>
                      {{ $t('restore') }}
                    </span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-col>
    <v-dialog v-model="enableDelete" max-width="500px">
      <promptDialog
        :title="deleteTitle"
        :message="deleteMsg"
        :data="deletingItem"
        @accept="acceptDelete"
        @reject="closeDelete"
      />
    </v-dialog>
    <v-dialog v-model="enableRestore" max-width="500px">
      <promptDialog
        :title="deleteTitle"
        :message="deleteMsg"
        :data="deletingItem"
        @accept="acceptRetrive"
        @reject="closeDelete"
      />
    </v-dialog>
    <v-dialog v-model="enableEdit" max-width="500px" height="500px">
      <singlePrompt :data="edittingItem" :name="'title'" @setValue="setValue" />
    </v-dialog>
    <notifMessage
      v-if="successNotif"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
      :type="'success'"
    />
    <notifMessage
      v-if="error"
      :msg="errorMsg"
      @hideNotif="hideError"
      :type="'error'"
    />
  </v-row>
</template>

<script>
import promptDialog from '../structure/promptDialog.vue';
import notifMessage from '../structure/notifMessage.vue';
import singlePrompt from '../structure/singlePrompt.vue';

export default {
  name: 'tagsList',
  components: {
    promptDialog,
    notifMessage,
    singlePrompt,
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
      enableRestore: false,
      deletingItem: {},
      deleteMsg: '',
      deleteTitle: '',
      // notif
      successNotif: false,
      // edit
      enableEdit: false,
      edittingItem: {},
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
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    // methods for delete notif
    deleteRecord(item) {
      this.deletingItem = item;
      this.deleteTitle = 'deActiveTags';
      this.deleteMsg = 'RUSureUWantToDeactiveThisTag';
      this.enableDelete = true;
    },
    acceptDelete(value) {
      this.$axios
        .put(`/v1/api/tabaadol-e-ketaab/tag/${value.id}`, {
          title: value.title,
          active: false,
        })
        .then(res => {
          if (res.status === 200) {
            this.closeDelete();
            this.successNotif = true;
            this.$emit('reloadList');
            this.deletingItem = value;
          }
        });
    },
    closeDelete() {
      this.enableDelete = false;
      this.deletingItem = {};
    },

    hideNotif() {
      this.successNotif = false;
    },
    // retrive
    retriveRecord(item) {
      this.deletingItem = item;
      this.deleteTitle = 'ActivateTags';
      this.deleteMsg = 'RUSureUWantToactiveThisTag';
      this.enableRestore = true;
    },
    acceptRetrive(value) {
      this.$axios
        .put(`/v1/api/tabaadol-e-ketaab/tag/${value.id}`, {
          title: value.title,
          active: true,
        })
        .then(res => {
          if (res.status === 200) {
            this.closeRetrive();
            this.successNotif = true;
            this.$emit('reloadList');
            this.deletingItem = value;
          }
        });
    },
    closeRetrive() {
      this.enableRestore = false;
      this.deletingItem = {};
    },
    // edit
    editTag(item) {
      this.edittingItem = item;
      this.enableEdit = true;
    },
    setValue(item, id) {
      console.log(item);
      this.$axios
        .put(`/v1/api/tabaadol-e-ketaab/tag/${id}`, {
          title: item,
        })
        .then(res => {
          if (res.status === 200) {
            this.$emit('reloadList');
            this.enableEdit = false;
            this.edittingItem = {};
          }
        })
        .catch(e => {
          if (e.response.status === 409) {
            this.enableEdit = false;
            this.error = true;
            this.errorMsg = 'repeatedTag';
            this.edittingItem = {};
          }
        });
    },
    hideError() {
      this.error = false;
    },
  },
  computed: {
    activeTags() {
      return this.data.filter(item => item.active === true);
    },
    deactiveTags() {
      return this.data.filter(item => item.active === false);
    },
  },
};
</script>
<style lang="scss">
.red-br {
  border: 1px solid red;
}
</style>
