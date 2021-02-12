const moneyFormat = {
  methods: {
    moneyFormat(value) {
      return new Intl.NumberFormat('es-ES').format(value);
    },
  },
};
export default moneyFormat;
