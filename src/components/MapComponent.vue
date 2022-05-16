<template>
  <div>
    <l-map style="height: 400px" class="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
const MapComponent = {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [43.7101728, 7.2619532],
      zoom: 15,
      markerLatLng: [43.7101728, 7.2619532],
    };
  },

  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
export default MapComponent;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  position: absolute;
  width: 50%;
  height: 50%;
  overflow: hidden;
}
</style>
