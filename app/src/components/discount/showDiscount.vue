<template>
  <v-row no-gutters class="justify-center ">
    <v-col cols="12" sm="6" md="8">
      <v-card class="pa-8">
        <v-toolbar color="teal " flat height="48">
          <span class="pr-4 font-weight-medium white--text">
            {{ $t('discountPreview') }}
          </span>
        </v-toolbar>
        <div class="pa-4 showDiscountInfo">
          <v-row>
            <v-col cols="12" md="3">
              <p>
                <span class="font-weight-bold"> {{ $t('title') }} : </span>
                {{ item.title }}
              </p>
            </v-col>
            <v-col cols="12" md="3">
              <p>
                <span class="font-weight-bold"> {{ $t('createdAt') }} : </span>
                {{ new Date(item.createdAt).toLocaleDateString('fa') }}
              </p>
            </v-col>
            <v-col cols="12" md="3" v-if="item.category">
              <p>
                <span class="font-weight-bold"> {{ $t('category') }} : </span>
                {{ item.category.title }}
              </p>
            </v-col>
            <v-col cols="12" md="3">
              <p>
                <span class="font-weight-bold"> {{ $t('percent') }} : </span>
                {{ item.percent }} %
              </p>
            </v-col>
          </v-row>
          <v-row v-if="item.code">
            <v-col cols="12" md="5">
              <p>
                <span class="font-weight-bold">
                  {{ $t('couponDiscount') }} :
                </span>
                <span contenteditable="false" ref="coupon">
                  {{ item.code }}
                </span>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="mr-4 pointer"
                      v-bind="attrs"
                      v-on="on"
                      @click="copyCoupon"
                      >mdi-content-copy</v-icon
                    >
                  </template>
                  {{ $t('copy') }}
                </v-tooltip>
              </p>
            </v-col>
          </v-row>
          <v-row v-if="item.description">
            <v-col v-if="item.description.length > 0">
              <span>
                <span class="font-weight-bold"> {{ $t('description') }}: </span>
                {{ item.description }}
              </span>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'showDiscount',
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    copyCoupon() {
      this.selectText(this.$refs.coupon);
      document.execCommand('copy');
    },
    selectText(element) {
      let range;
      if (document.selection) {
        // IE
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.contentEditable = false;
        range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    },
  },
};
</script>
<style lang="scss">
.showDiscountInfo {
  border: 1px solid #d5d5d5;
}
</style>
