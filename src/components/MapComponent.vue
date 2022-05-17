<template>
  <div>
    <l-map style="height: 500px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
  </div>
</template>

<script>
// Inmportation des compsants de leafleats
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
      zoom: 15,
      center: [43.7101728, 7.2619532],
      markerLatLng: [43.7101728, 7.2619532],
    };
  },

  async mounted() {
    const promise = await fetch("http://127.0.0.1:8000/api/comites");
    console.log(promise);

    let response = await promise.json();
    console.log(response);

    if (promise.status === 200) {
      console.log("Vous avez bien récupéré la liste de commités");
    } else {
      console.log("c'est pas good");
    }
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
  width: 50%;
  height: 50%;
}
</style>
