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
        <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
        <v-text-field
          ref="title"
          v-model="bookCat.title"
          :counter="10"
          :rules="titleRules"
          :label="$t('title')"
          required
          outlined
          class="pt-4"
          @keyup.enter="validate"
        >
          <template v-slot:prepend-inner>
            <span class="red--text">
              *
            </span>
          </template>
        </v-text-field>
        <v-checkbox
          v-if="mode === 'edit'"
          v-model="bookCat.active"
          :label="$t('activeinactive')"
          required
        ></v-checkbox>
        <div class="justify-center d-flex">
          <v-btn
            :disabled="!bookCat.title"
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
        <!-- </v-form> -->
      </v-card>
    </v-col>

    <notifMessage
      v-if="saveSuccess"
      @hideNotif="hideNotif"
      :msg="'operationSuccessfullyOcured'"
      :type="'success'"
    />
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
  name: 'addBookCategory',
  components: {
    notifMessage,
  },
  props: {
    mode: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      valid: true,
      bookCat: {
        title: '',
      },

      titleRules: [
        v => !!v || `${this.$t('thisFieldIsRequired')}`,
        v => (v && v.length >= 3) || `${this.$t('minCharaters3')}`,
      ],
      saveSuccess: false,
      // error
      errorEnable: false,
      errorMsg: '',
    };
  },
  methods: {
    validate() {
      this.$refs.title.validate();
      if (this.$refs.title.validate()) {
        if (this.mode === 'addPage') {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/category', { ...this.bookCat })
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                this.reset();
                this.$emit('savedSuccessfully');
              }
            })
            .catch(e => {
              if (e.response.status === 409) {
                this.errorEnable = true;
                this.errorMsg = 'repeatedTitle';
              }
            });
        } else if (this.mode === 'edit') {
          this.$axios
            .put(`/v1/api/tabaadol-e-ketaab/category/${this.data.id}`, {
              ...this.bookCat,
            })
            .then(res => {
              if (res.status === 200) {
                this.saveSuccess = true;
                this.reset();
                this.$emit('savedSuccessfully');
              }
            })
            .catch(e => {
              console.log(e);
              if (e.response.status === 409) {
                this.errorEnable = true;
                this.errorMsg = 'repeatedTitle';
              }
            });
        }
      } else {
        this.valid = false;
      }
    },
    reset() {
      this.$refs.title.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    hideError() {
      this.errorEnable = false;
    },
    bookCatList() {
      this.$router.push({ path: 'bookCatList' });
    },
  },
  mounted() {
    if (this.mode === 'edit') {
      this.bookCat = this.data;
    }
  },
  watch: {
    data(newVal) {
      this.bookCat = newVal;
    },
  },
};
</script>
