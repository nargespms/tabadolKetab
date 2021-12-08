<template>
  <v-row>
    <v-col cols="12" sm="10">
      <authorAutocomplete
        :isRequire="false"
        :isMultiple="false"
        :placeHolder="name"
        @sendValue="getAuthor"
        :height="32"
        :editDataId="mode === 'edit' && editDataId ? editDataId : ''"
        :clearable="true"
        :key="authorKey"
      />
    </v-col>

    <v-col cols="12" sm="2" class="d-flex align-center flex-row-reverse">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            class="mb-3"
            @click="addAuthor"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="white" small>
              fas fa-plus
            </v-icon>
          </v-btn>
        </template>
        {{ $t('add') }}
      </v-tooltip>
    </v-col>

    <v-dialog
      v-model="enableAddAuthor"
      content-class="sh-0"
      @click:outside="closeDialog"
    >
      <addAuthorCmp @addedSuccessfully="closeDialog" :name="name" />
    </v-dialog>
  </v-row>
</template>

<script>
import authorAutocomplete from '../author/authorAutocomplete.vue';
import addAuthorCmp from '../author/addAuthorCmp.vue';

export default {
  name: 'authorControlWrapper',
  components: {
    authorAutocomplete,
    addAuthorCmp,
  },

  props: {
    editDataId: {
      type: String,
    },
    mode: {
      type: String,
    },
    name: {
      type: String,
    },
  },

  data() {
    return {
      enableAddAuthor: false,
      authorKey: 0,
    };
  },

  methods: {
    getAuthor(value) {
      this.$emit(`${this.name}Set`, value);
    },

    addAuthor() {
      this.enableAddAuthor = true;
    },
    closeDialog() {
      this.enableAddAuthor = false;
      this.authorKey += 1;
    },
  },
};
</script>
