<template>
  <div class="d-flex flex-row-reverse mxW100">
    <div class="d-flex flex-column dashBorder px-2">
      <span class="text-center font-weight-medium">
        {{ $t('changing') }}
      </span>
      <svg id="barcode"></svg>
      <span class="text-center" v-if="!isLoading">
        {{ $t('rial') }}{{ book.undergraduatePrice }} | {{ book.number }}</span
      >
      <span class="text-center font-weight-bold fn12" v-if="!isLoading">
        {{ book.category.title }} |
        {{ new Date().toLocaleDateString('fa') }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'barcodePrint',
  data() {
    return {
      book: {},
      isLoading: true,
    };
  },
  methods: {
    getBarcode(data) {
      this.$jsbarcode('#barcode', data.number, {
        displayValue: false,
        height: 40,
      });
      this.isLoading = false;
    },
    getBookData() {
      this.$axios
        .get(`/v1/api/tabaadol-e-ketaab/book/${this.$route.params.bookId}`)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            this.book = res.data;
            this.getBarcode(res.data);
          }
        });
    },
  },
  mounted() {
    this.getBookData();
  },
};
</script>

<style lang="scss">
.dashBorder {
  border: 1px dashed black;
}
.mxW100 {
  max-width: 100%;
}
</style>
