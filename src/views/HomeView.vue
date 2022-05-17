<template>
  <!-- CSS only -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous"
  />
  <div class="home">
    <div class="div-btn-carte">
      <button @click="showMap">Voir la carte</button>
    </div>

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

    <div v-show="imgAccueil" class="img-acceuil">
      <video
        type="video/mp4"
        autoplay
        :src="carteImg"
        class="img-carte"
      ></video>

      <img src="../assets/imeuble.png" alt="" class="immeuble" />
    </div>

    <div v-show="map">
      <map-component />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapComponent from "@/components/MapComponent.vue";
import carteImg from "@/assets/carte.mp4";

export default {
  name: "HomeView",
  components: {
    MapComponent,
  },
  data() {
    return {
      carteImg: carteImg,
      imgAccueil: true,
      map: false,
    };
  },

  methods: {
    showMap() {
      this.imgAccueil = false;
      this.map = true;
    },
  },
};
</script>

<style scoped>
.div-btn-carte {
  display: flex;
  justify-content: left;
}
.img-carte {
  width: 40vw;
  margin-top: 52px;
}
.immeuble {
  text-align: right;
  height: 70vh;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  /* Styles pour cette Media Queries */

  .immeuble {
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

/* button page principale pour afficher la carte */

@media (min-width: 768px) {
  .button-53 {
    padding: 0.75rem 3rem;
    font-size: 1.25rem;
  }
}
</style>
