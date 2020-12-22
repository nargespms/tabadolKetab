<template>
  <v-row class="justify-center">
    <v-col cols="12" lg="6">
      <v-text-field
        :label="$t('addTag')"
        outlined
        @keyup.enter="addTag"
        v-model="tag"
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
      v-if="errorEnable"
      :msg="errorMsg"
      @hideNotif="hideNotif"
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
      errorEnable: false,
      errorMsg: '',
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
    };
  },
  methods: {
    addTag() {
      if (this.$refs.tag.validate()) {
        this.$emit('addTag', this.tag);
        this.tag = '';
      } else {
        this.errorEnable = true;
        this.errorMsg = 'pleaseFillTheInput';
        this.$refs.tag.blur();
      }
    },
    // notif hide
    hideNotif() {
      this.errorEnable = false;
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
