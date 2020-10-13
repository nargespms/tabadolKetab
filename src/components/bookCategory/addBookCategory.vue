<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-4">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('AddBookCategory') }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="bookCatList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('BookCategoryList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="catTitle"
            :counter="10"
            :rules="titleRules"
            :label="$t('title')"
            required
          ></v-text-field>
          <v-checkbox
            v-model="activeCategory"
            :rules="[(v) => !!v || `${this.$t('thisFieldIsRequired')}`]"
            :label="$t('activeinactive')"
            required
          ></v-checkbox>
          <div class="justify-center d-flex">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ $t('save') }}
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset"
              >{{ $t('resetForm') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
    <successNotif
      v-if="saveSuccess"
      :msg="'operationSuccessfullyOcured'"
      @hideNotif="hideNotif"
    />
  </v-row>
</template>


<script>
import successNotif from '../structure/successNotif.vue';

export default {
  name: 'addBookCategory',
  components: {
    successNotif,
  },
  data() {
    return {
      valid: true,
      catTitle: '',
      titleRules: [
        (v) => !!v || `${this.$t('thisFieldIsRequired')}`,
        (v) => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      activeCategory: true,
      saveSuccess: false,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.saveSuccess = true;
    },
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    bookCatList() {
      this.$router.push({ path: 'bookCatList' });
    },
  },
};
</script>
