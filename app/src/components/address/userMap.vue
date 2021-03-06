<template>
  <div>
    <l-map ref="myMap" id="map" @click="chooseLocation"> </l-map>
    latitude:{{ location.lat }} longitude:{{ location.lng }}
  </div>
</template>

<script>
// import L from 'leaflet';
// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { LMap } from 'vue2-leaflet';

export default {
  name: 'userMap',
  components: {
    LMap,
    // LTileLayer,
    // LMarker,
  },
  data() {
    return {
      location: {},
    };
  },
  methods: {
    chooseLocation(e) {
      console.log(e);
      this.location = e.latlng;
      console.log('clicked');
    },
  },
  mounted() {
    console.log(this.$refs.myMap.mapObject.setView([51.505, -0.09], 13));
    // this.$refs.myMap.mapObject.setView([51.505, -0.09], 13);
  },
};
</script>

<style lang="scss">
#map {
  height: 200px;
  width: 500px;
}
</style>
