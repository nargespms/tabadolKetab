<template>
  <v-row no-gutters class="justify-center pt-4 ">
    <v-col>
      <v-card
        class="pa-4 d-flex"
        :color="
          data.createdBy.role === 'client'
            ? 'cyan lighten-4'
            : 'light-blue lighten-4'
        "
      >
        <div class="ticketInfo pa-4">
          <v-avatar size="32">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <span class="grey--text text--darken-3">
            {{ data.createdBy.firstName }}
          </span>
          &nbsp;
          <span class="grey--text text--darken-3">
            {{ data.createdBy.lastName }}
          </span>
          <p class="text-left pt-3 grey--text text--darken-2 fn12">
            {{ new Date(data.createdAt).toLocaleTimeString('fa') }}
            &nbsp;
            <v-icon small>
              mdi-checkbox-intermediate
            </v-icon>
            {{ new Date(data.createdAt).toLocaleDateString('fa') }}
          </p>
          <p class="text-left grey--text text--darken-2 fn12"></p>
        </div>
        <div class="ticketDesc pa-4">
          {{ data.description }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'threadEncapsule',
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.ticketDesc {
  border-right: 1px solid #bfbfbf;
  border-radius: 0 !important;
}
</style>
