<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'totalRegisteredBookNumber'"
          :number="books.totalRegistered"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'confirmedBooksNumber'"
          :number="books.confirmedBooks"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'unconfirmedBooksNumber'"
          :number="books.unconfirmedBooks"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayRegisteredBookNumber'"
          :number="books.todayTotalRegistered"
          :color="color"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayconfirmedBookNumber'"
          :number="books.todayconfirmed"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'soldBooksNumber'"
          :number="books.soldBooks"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todaySoldBooksNumber'"
          :number="books.todaysoldBooks"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'requestedBooksNumber'"
          :number="books.reqbooks"
          :color="color"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'mostSoldCategory'"
          :item="books.mostSoldCat"
          :color="color"
        />
      </v-col>
      <v-col cols="12" lg="3">
        <statusCard
          :lable="'todayMostSoldCategory'"
          :item="books.todayMostSoldCat"
          :color="color"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import statusCard from './statusCard.vue';

export default {
  name: 'bookStatusCard',
  components: {
    statusCard,
  },
  data() {
    return {
      color: '#546E7A',
      books: {
        totalRegistered: 200,
        todayTotalRegistered: 100,
        confirmedBooks: 200,
        unconfirmedBooks: 50,
        todayconfirmed: 20,
        soldBooks: 130,
        todaysoldBooks: 30,
        reqbooks: 3,
        mostSoldCat: 'مذهبی',
        todayMostSoldCat: 'اجتماعی',
      },
    };
  },
};
</script>
