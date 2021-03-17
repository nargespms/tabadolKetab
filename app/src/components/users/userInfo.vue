<template>
  <v-card flat class="pr-6">
    <v-card-text>
      <template v-for="(item, index) in items">
        <v-row
          v-if="item.condition"
          :key="item.id"
          :class="index % 2 === 0 ? 'grey lighten-3' : 'white'"
        >
          <v-col cols="12" lg="3">
            <span>
              {{ $t(item.text) }}
            </span>
          </v-col>
          <v-col cols="12" lg="9">
            <span v-if="item.text === 'mobile'" class="float-right d-block">
              <span class="numberDir">
                {{ $t(item.value) }}
              </span>
            </span>
            <span v-else>
              {{ $t(item.value) }}
            </span>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'userInfo',
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      items: [
        {
          text: 'fullName',
          value: `${this.data.firstName}   ${this.data.lastName}`,
          condition: true,
        },
        {
          text: 'mobile',
          value: this.data.mobile,
          condition: true,
        },
        {
          text: 'email',
          value: this.data.email,
          condition: true,
        },
        {
          text: 'nationalId',
          value: this.data.nationalId,
          condition: true,
        },
        {
          text: 'department',
          value: this.data.department,
          condition: this.data.role !== 'CLIENT',
        },
        {
          text: 'role',
          value: this.data.role ? this.data.role.title : 'CLIENT',
          condition: this.data.role !== 'CLIENT',
        },
      ],
    };
  },
  watch: {
    data() {
      this.items = [
        {
          text: 'fullName',
          value: `${this.data.firstName}   ${this.data.lastName}`,
          condition: true,
        },
        {
          text: 'mobile',
          value: this.data.mobile,
          condition: true,
        },
        {
          text: 'email',
          value: this.data.email,
          condition: true,
        },
        {
          text: 'nationalId',
          value: this.data.nationalId,
          condition: true,
        },
        {
          text: 'department',
          value: this.data.department,
          condition: this.data.role !== 'CLIENT',
        },
        {
          text: 'role',
          value: this.data.role ? this.data.role.title : 'CLIENT',
          condition: this.data.role !== 'CLIENT',
        },
      ];
    },
  },
};
</script>
