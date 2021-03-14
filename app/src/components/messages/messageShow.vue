<template>
  <v-row no-gutters class="justify-center">
    <v-col cols="12" sm="6" md="8">
      <v-card color="white" class="pa-8 ma-auto" width="80%">
        <v-toolbar color="light-blue darken-1" flat height="32"> </v-toolbar>
        <div class="messageCardInner">
          <v-card-title class="text-center justify-space-between">
            {{ message.title }}
            <v-chip
              class="ma-2"
              color="light-blue darken-2"
              label
              text-color="white"
            >
              {{ $t(message.type) }}
              <v-icon right> mdi-android-messages </v-icon>
            </v-chip>
          </v-card-title>

          <v-card-actions class="justify-end">
            <div @click="show = !show">
              <v-btn color="blue darken-2" text>
                {{ $t('previewMore') }}
              </v-btn>

              <v-btn color="blue darken-2" icon>
                <v-icon>{{
                  show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                }}</v-icon>
              </v-btn>
            </div>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ message.text }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'messageShow',
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
      message: {},
    };
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.getMessageData();
      }
    },
  },
  methods: {
    getMessageData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/message/${this.id}`)
        .then(res => {
          if (res.status === 200) {
            this.message = res.data;
          }
        });
    },
  },
  mounted() {
    this.getMessageData();
  },
};
</script>
<style lang="scss">
.messageCardInner {
  border: 1px solid #e1e1e1;
}
</style>
