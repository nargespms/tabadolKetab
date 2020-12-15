<template>
  <v-row no-gutters class="justify-center">
    <span class="fn-25">
      🧑‍💻
    </span>
    <span class="fn-25">
      👨‍🔧
    </span>
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
            v-model="bookCat.title"
            :counter="10"
            :rules="titleRules"
            :label="$t('title')"
            required
            outlined
            class="pt-4"
          ></v-text-field>
          <v-checkbox
            v-model="bookCat.active"
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

    <notifMessage
      v-if="saveSuccess"
      @hideNotif="hideNotif"
      :msg="'operationSuccessfullyOcured'"
      :type="'success'"
    />
  </v-row>
</template>

<script>
import notifMessage from '../structure/notifMessage.vue';

export default {
  name: 'addBookCategory',
  components: {
    notifMessage,
  },
  props: {
    mode: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valid: true,
      bookCat: {
        title: '',
        active: true,
      },

      titleRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      saveSuccess: false,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        if (this.mode === 'addPage') {
          this.saveSuccess = true;
          this.reset();
        }
        this.$emit('savedSuccessfully');
      } else {
        this.valid = false;
      }
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
  mounted() {
    if (this.mode === 'edit') {
      this.bookCat.active = this.active;
      this.bookCat.title = this.title;
    }
  },
  watch: {
    active(newVal) {
      this.bookCat.active = newVal;
    },
    title(newVal) {
      this.bookCat.title = newVal;
    },
  },
};
</script>
