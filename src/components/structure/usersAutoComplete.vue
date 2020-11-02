<template>
  <div :class="dynamicClass">
    <v-autocomplete
      v-model="users"
      :disabled="isUpdating"
      :items="people"
      outlined
      chips
      color="blue-grey lighten-2"
      :label="$t('chooseUserorS')"
      item-text="name"
      item-value="name"
      multiple
      :required="true"
      :rules="requireRules"
      :error="!validation"
      hide-details
      @change="sendValue"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          <v-avatar left>
            <v-img :src="data.item.avatar"></v-img>
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-avatar>
            <img :src="data.item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="data.item.group"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
    <p v-if="!validation" class="red--text fn13">
      {{ $t('thisFieldIsRequired') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'usersAutoComplete',
  props: {
    validate: {
      type: Boolean,
    },
    dynamicClass: {
      type: String,
      default: '',
    },
  },
  data() {
    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    };
    return {
      validation: this.validate,
      isUpdating: false,
      requireRules: [v => !!v || `${this.$t('thisFieldIsRequired')}`],
      users: [],
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
      ],
    };
  },
  methods: {
    remove(item) {
      const index = this.users.indexOf(item.name);
      if (index >= 0) this.users.splice(index, 1);
    },
    sendValue() {
      this.$emit('setUser', this.users);
      if (this.users.length > 0) {
        this.validation = true;
      }
    },
  },
  watch: {
    isUpdating(val) {
      if (val) {
        // eslint-disable-next-line no-return-assign
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    validate(newVal) {
      this.validation = newVal;
    },
  },
};
</script>
