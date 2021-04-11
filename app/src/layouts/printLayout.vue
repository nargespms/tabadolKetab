<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'print',
};
</script>
<style lang="scss">
@import '../../node_modules/@aasaam/noto-font/dist/font-face.css';
@import '../../node_modules/paper-css/paper.css';
$body-font-family: 'aasaam-Noto', sans-serif;

.v-application {
  font-family: $body-font-family;
  background: #fff !important;
}
.v-application .headline {
  font-family: $body-font-family !important;
  background: #fff !important;
}

a {
  text-decoration: none;
}
.sh-0 {
  box-shadow: none !important;
}
.fn13 {
  font-size: 13px;
}
.fn14 {
  font-size: 14px;
}
.fn12 {
  font-size: 12px;
}
.clear {
  overflow: auto;
}
</style>
