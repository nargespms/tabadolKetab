<template>
  <v-row no-gutters justiffy="space-between">
    <v-col cols="12" sm="10">
      <bookCatAutocomplete
        :isRequire="true"
        @sendValue="getBookCat"
        ref="bookCat"
        :height="32"
        :editDataId="mode === 'edit' && editDataId ? editDataId : ''"
        :key="bookCatKey"
      />
    </v-col>
    <v-col
      cols="12"
      sm="2"
      :class="$vuetify.breakpoint.sm ? 'justify-space-between' : ''"
      class="d-flex align-center flex-row-reverse"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            @click="addCategory"
            class="d-block mb-3"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="white" small>
              fas fa-plus
            </v-icon>
          </v-btn>
        </template>
        {{ $t('AddBookCategory') }}
      </v-tooltip>
    </v-col>

    <v-dialog
      v-model="enableAddCategory"
      content-class="sh-0"
      @click:outside="closeDialog"
    >
      <addBookCategory :mode="'addPage'" @savedSuccessfully="closeDialog" />
    </v-dialog>
  </v-row>
</template>

<script>
import bookCatAutocomplete from '../bookCategory/bookCatAutocomplete.vue';
import addBookCategory from '../bookCategory/addBookCategory.vue';

export default {
  name: 'bookCategoryWrapper',
  components: {
    bookCatAutocomplete,
    addBookCategory,
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
      enableAddCategory: false,

      bookCatKey: 0,
    };
  },

  methods: {
    getBookCat(value) {
      this.$emit('getBookCat', value);
    },

    addCategory() {
      this.enableAddCategory = true;
    },
    closeDialog() {
      this.enableAddCategory = false;
      this.bookCatKey += 1;
    },
  },
};
</script>
