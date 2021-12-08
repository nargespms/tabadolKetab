<template>
  <v-row no-gutters>
    <v-col cols="12" sm="10">
      <publisherAutocomplete
        :isRequire="false"
        :placeHolder="'publisher'"
        @sendValue="getPublisher"
        :height="56"
        :isMultiple="false"
        :editDataId="mode === 'edit' && editDataId ? editDataId : ''"
        :clearable="true"
        :key="publisherKey"
      />
    </v-col>

    <v-col cols="12" sm="2" class="d-flex align-end flex-row-reverse">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" @click="addPublisher" v-bind="attrs" v-on="on">
            <v-icon color="white" small>
              fas fa-plus
            </v-icon>
          </v-btn>
        </template>
        {{ $t('addPublisher') }}
      </v-tooltip>
    </v-col>

    <v-dialog
      v-model="enableAddPublisher"
      content-class="sh-0"
      @click:outside="closeDialog"
    >
      <addPublisherCmp @addedSuccessfully="closeDialog" />
    </v-dialog>
  </v-row>
</template>

<script>
import publisherAutocomplete from '../publisher/publisherAutocomplete.vue';
import addPublisherCmp from '../publisher/addPublisherCmp.vue';

export default {
  name: 'publisherControlWrapper',
  components: {
    publisherAutocomplete,
    addPublisherCmp,
  },

  props: {
    editDataId: {
      type: String,
    },
    mode: {
      type: String,
    },
  },

  data() {
    return {
      enableAddPublisher: false,
      publisherKey: 0,
    };
  },

  methods: {
    addPublisher() {
      this.enableAddPublisher = true;
    },
    getPublisher(value) {
      this.$emit('setPublisher', value);
    },
    closeDialog() {
      this.enableAddPublisher = false;
      this.publisherKey += 1;
    },
  },
};
</script>
