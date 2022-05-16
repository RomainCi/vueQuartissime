<template>
  <div class="home">
    <div class="btn-geoc-adresse">
      <button type="button" class="btn btn-warning">Me géolocaliser</button>
      <input type="search" placeholder="Saisir une adresse" />
    </div>
    <div class="img-acceuil">
      <img src="../assets/carte.png" alt="" class="img-carte" />
      <img src="../assets/imeuble.png" alt="" class="imeuble" />
    </div>
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

<style scoped>
.img-carte {
  width: 40vw;
  margin-top: 52px;
}
.imeuble {
  text-align: right;
  height: 70vh;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  /* Styles pour cette Media Queries */

  .imeuble {
    display: none;
  }
}

.img-acceuil {
  display: flex;
  justify-content: right;
  gap: 20%;
}
</style>
