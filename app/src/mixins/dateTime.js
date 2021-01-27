const dateTime = {
  methods: {
    // convert out put of date picker to gregorian timestamp for server
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().setHours(15, 0);
    },
  },
};
export default dateTime;
