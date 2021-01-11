<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="6">
      <v-text-field
        v-model="tag"
        :label="$t('addTag')"
        outlined
        @keyup.enter="addTag"
        required
        :rules="requireRule"
        ref="tag"
        class="addTagInput"
      >
        <template v-slot:append>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" v-bind="attrs" v-on="on" @click="addTag">
                <v-icon color="white" class="pointer">fas fa-plus</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('addTag') }}
            </span>
          </v-tooltip>
        </template>
        <template v-slot:prepend-inner>
          <v-icon small class="mt-2 pl-2">fas fa-tag</v-icon>
        </template>
      </v-text-field>
    </v-col>
    <notifMessage
      v-if="saveSuccess"
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
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'addTag',
  components: {
    notifMessage,
  },
  data() {
    return {
      tag: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      saveSuccess: false,
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    addTag() {
      if (this.$refs.tag.validate()) {
        this.$axios
          .post('/v1/api/tabaadol-e-ketaab/tag', { title: this.tag })
          .then(res => {
            if (res.status === 200) {
              this.saveSuccess = true;
              this.$emit('reloadList');
              this.tag = '';
            }
          })
          .catch(e => {
            if (e.response.status === 409) {
              this.error = true;
              this.errorMsg = 'repeatedTag';
            }
          });
      } else {
        this.errorEnable = true;
        this.errorMsg = 'pleaseFillTheInput';
        this.$refs.tag.blur();
      }
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    hideError() {
      this.error = false;
    },
  },
};
</script>
<style lang="scss">
.addTagInput {
  .v-input__append-inner {
    margin-top: 12px !important;
  }
}
</style>
