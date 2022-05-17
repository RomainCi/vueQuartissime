<template>
  <!-- CSS only -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous"
  />
  <div class="home">
    <div class="btn-geoc-adresse">
      <button type="button" class="btn btn-warning">Me géolocaliser</button>
      <div>
        <input
          type="text"
          class="input-search"
          placeholder="Saisir une adresse"
        />
        <!-- mettre @click la fonction getComites -->
        <button class="btn-search">Rechercher</button>
      </div>
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

.btn-geoc-adresse {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.input-search {
  border: solid 1px black;
  padding: 6px;
  border-radius: 3px;
}
.btn-search {
  border: none;
  border-radius: 3px;
  background-color: black;
  color: white;
  padding: 7px;
}
</style>
