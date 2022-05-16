<template>
  <div class="home">
    <map-component />
  </div>
</template>

<script>
// @ is an alias to /src
import MapComponent from "@/components/MapComponent.vue";

export default {
  name: "HomeView",
  components: {
    MapComponent,
  },
};
</script>
