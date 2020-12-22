<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'allUsersNumber'"
          :number="users.total"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'registeredUserTodayNumber'"
          :number="users.registeredNumber"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'mostbuyerUser'"
          :users="users.mostbuyerUsers"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'staffsNumber'"
          :number="users.staffsNum"
          :color="color"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        :lg="12 / staffs.length"
        v-for="staff in staffs"
        :key="staff.index"
      >
        <userCard :actions="users.actions" :user="staff" :color="color" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';
import userCard from './userCard.vue';

export default {
  name: 'usersStatusCards',
  components: {
    statusCard,
    userCard,
  },
  data() {
    return {
      color: '#0277BD',
      staffs: [
        {
          fullName: 'کارمند تبادل',
        },
        {
          fullName: ' مدیر تبادل',
        },
        {
          fullName: ' صندوقدار تبادل',
        },
      ],
      users: {
        total: 150,
        registeredNumber: 20,
        staffsNum: 30,
        mostbuyerUsers: [
          {
            fullName: 'علی تبادلیان',
          },
        ],
        actions: [
          {
            title: 'todayRegisteredBooksNumber',
            number: 20,
          },
          {
            title: 'RegisteredBooksNumber',
            number: 50,
          },
        ],
      },
    };
  },
};
</script>
