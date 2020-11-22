<template>
  <div class="pa-5">
    <div class="pa-3 tabadolInfoWrap">
      <p>
        <span class="font-weight-black"> {{ $t('phone') }}: </span>
        <span> {{ information.phone }} </span>
      </p>
      <p class="text-left">
        <span class="font-weight-black"> Website : </span>
        <span> {{ information.website }} </span>
      </p>
      <p>
        <span class="font-weight-black"> {{ $t('address') }}: </span>
        <span> {{ information.address }} </span>
      </p>

      <span class="font-weight-black text-center"
        >" با تبادل کتاب‌های خوانده شده ، علاوه بر حفظ درختان به ترویج فرهنگ
        مطالعه کمک کنید "
      </span>
    </div>
  </div>
</template>

<script>
export default {
  nam: 'tabadolInfo',
  data() {
    return {
      information: {
        phone: '۰۲۱۶۶۱۷۷۸۹۲',
        website: 'TabadolKetab.com',
        address:
          'خیابان انقلاب اسلامی نرسیده به چهارراه ولی عصر (عج) ابتدای خیابان برادران مظفر شمالی',
      },
    };
  },
};
</script>
<style lang="scss">
.tabadolInfoWrap {
  border: 1px solid #797272;
}
</style>
