<template>
  <!-- /********************** GEOLOCALISATION ***********************/ -->
  <div class="btn-geoc-search">
    <div class="btn-geoc">
      <div class="wrap">
        <button @click="geolocbutton" class="button-geoc">
          Me géolocaliser
        </button>
      </div>
    </div>
  </div>

  <!-- /********************** INPUT ET BOUTON RECHERCHE PAR ADRESSE ***********************/ -->
  <div class="input-group">
    <div class="form-outline">
      <input
        v-model="search"
        id="form1"
        class="form-control input-search"
        placeholder="Rechercher par adresse"
      />
    </div>
    <button type="button" @click="getadress" class="btn btn-primary">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
const LocalisationComponent = {
  props: {
    updatelocation: Function,
  },
  data() {
    return {
      search: "",
    };
  },

  methods: {
    /** GEOLOCALISATION et  AFFICHAGE DES TOP 3 ACOMITES/ASSOCIATIONS  **/
    async geolocbutton() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.updatelocation(latitude, longitude);
      });
    },

    /********************* Methods geo/adresse ************************/
    async getadress() {
      try {
        const response = await fetch(
          "https://api-adresse.data.gouv.fr/search/?q=" + this.search
        );

        const data = await response.json();

        if (data) {
          const longitude = data.features?.[0].geometry.coordinates[0];
          const latitude = data.features?.[0].geometry.coordinates[1];

          this.updatelocation(latitude, longitude);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default LocalisationComponent;
</script>

<style></style>
