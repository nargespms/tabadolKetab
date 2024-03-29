<template>
  <v-row class="justify-center">
    <v-col cols="12" md="8">
      <v-card class="pa-8">
        <v-card-actions class="teal">
          <v-card-title class="white--text pa-0">
            <span>
              {{ $t('add') }}
              {{ $t(name) }}
            </span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="white" @click="authorList"> fa fa-table</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t('authorsList') }}
            </span>
          </v-tooltip>
        </v-card-actions>
        <div v-if="mode === 'edit'" class="alertMessage mt-3">
          <p class="font-weight-black">
            <v-icon color="red"> fas fa-exclamation-triangle </v-icon>
            <span>
              توجه داشته باشید با ویرایش مولف اطلاعاتی که به این مولف اختصاص
              داشته ، تغییر میکند
            </span>
          </p>
        </div>
        <v-form class="pt-6 pa-6" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="12" class="pa-0 ">
              <v-text-field
                v-model="author.title"
                :rules="requireRule"
                :label="$t('title')"
                required
                outlined
                error-count="1"
              >
                <template v-slot:prepend-inner>
                  <span class="red--text">
                    *
                  </span>
                </template>
              </v-text-field>
              <v-checkbox
                v-if="this.mode === 'edit'"
                v-model="author.active"
                :label="$t('activeinactive')"
              ></v-checkbox>
            </v-col>
          </v-row>
          <div class="justify-center d-flex">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              {{ $t('save') }}
            </v-btn>

            <v-btn
              v-if="mode === 'edit'"
              color="error"
              class="mr-4"
              @click="close"
            >
              {{ $t('close') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
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
  name: 'addAuthorCmp',
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
    name: {
      type: String,
      default: 'author',
    },
  },
  data() {
    return {
      valid: true,
      requireRule: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      author: {
        title: '',
      },
      saveSuccess: false,
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    authorList() {
      this.$router.push({ name: 'authorsList' });
    },
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        if (this.mode === 'edit') {
          this.$axios
            .put(`/v1/api/tabaadol-e-ketaab/author/${this.author.id}`, {
              ...this.author,
            })
            .then(res => {
              console.log(res.data);
              if (res.status === 200) {
                this.$emit('editAuthor');
              }
            });
        } else {
          this.$axios
            .post('/v1/api/tabaadol-e-ketaab/author', { ...this.author })
            .then(res => {
              console.log(res.data);
              this.$emit('addedSuccessfully');
            })
            .catch(e => {
              if (e.response.status === 409) {
                this.error = true;
                this.errorMsg = 'repeatedAuthor';
              }
            });
          this.saveSuccess = true;
        }
        this.reset();
      } else {
        this.valid = false;
      }
    },
    close() {
      this.$emit('closeModal');
    },
    reset() {
      this.$refs.form.reset();
    },
    // notif hide
    hideNotif() {
      this.saveSuccess = false;
    },
    hideError() {
      this.error = false;
    },
  },
  mounted() {
    if (this.mode === 'edit') {
      this.author = this.data;
    }
  },
  watch: {
    data(newVal) {
      this.author = newVal;
    },
  },
};
</script>
<style lang="scss">
.alertMessage {
  padding: 12px;
  border-radius: 4px;
  background-color: #ffdede;
  border: 1px solid red;
}
</style>
