<template>
  <!-- /********************** HEADER MAP ***********************/ -->
  <div class="template">
    <div class="btn-geoc-adresse">
      <!-- /********************** GEOLOCALISATION ***********************/ -->
      <button @click="geolocbutton" type="button" class="btn btn-warning">
        Me géolocaliser
      </button>
      <div>
        <input
          type="text"
          class="input-search"
          placeholder="Saisir une adresse"
          v-model="search"
        />
        <!-- /********************** RECHERCHE PAR ADRESSE ***********************/ -->
        <button @click="getadress" class="btn-search">Rechercher</button>
      </div>
    </div>

    <br />
    <br />

    <!-- /********************** MAP ***********************/ -->
    <div id="map" class="page-map">
      <l-map style="height: 65vh; width: 70vw" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <!-- /********************** marquers comités ***********************/ -->
        <l-marker
          v-for="comitee in comitees"
          :key="comitee.id"
          :lat-lng="[comitee.latitude, comitee.longitude]"
        >
          <l-popup
            ><strong>Nom du comité : </strong> {{ comitee.comiteName }}<br />
            <strong>Adresse : </strong>{{ comitee.adress }}<br />
            <strong>Contact : </strong>{{ comitee.phone }}<br /><br />
            <button
              type="button"
              class="btn btn-warning btn-detail"
              @click="test(comitee.id)"
            >
              Voir les détails
            </button>
          </l-popup>
        </l-marker>

        <!-- /********************** marquer riverains ***********************/ -->
        <l-marker :lat-lng="[latitude, longitude]">
          <l-icon>
            <img class="imgicon" src="../assets/icon.png" />
          </l-icon>
          <l-popup> vous êtes ici</l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

/* ******************* SCRIPT ************************** */
<script>
// Inmportation des compsants de leafleats
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 14,
      center: [43.7101728, 7.2619532],
      comitees: [],

      search: "",
      latitude: "",
      longitude: "",
    };
  },

  mounted() {
    this.getComiteesList();
  },

  methods: {
    //////////////////METHODE POUR ENVOYER LES DETAILS SUR UNE NOUVELLE VUE//////////////////
    test(id) {
      this.$store.dispatch("envoieId", id);
      this.$router.push("/detailscomite");
    },
    /********************* Methods geo/adresse ************************/
    async getadress() {
      try {
        const response = await fetch(
          "https://api-adresse.data.gouv.fr/search/?q=" + this.search
        );

        const data = await response.json();

        if (data) {
          this.longitude = data.features?.[0].geometry.coordinates[0];
          this.latitude = data.features?.[0].geometry.coordinates[1];
        }
      } catch (e) {
        console.log(e);
      }
    },
    async savedata() {
      const promise = await fetch("http://127.0.0.1:8000/api/comites", {
        method: "POST",
        body: JSON.stringify({
          lat: this.latitude,
          lon: this.longitude,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let res = await promise.json();
      console.log(res);
      if (promise.status === 200) {
        console.log("c'est good");
      } else {
        console.log("c'est pas good");
      }
    },
    geolocbutton() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    },
    /********************* Methods map ************************/
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },

    centerUpdated(center) {
      this.center = center;
    },

    /* ********************* RÉCUPÉRATION DES COMITES ************* */
    async getComiteesList() {
      const promise = await fetch("http://127.0.0.1:8000/api/publics");
      console.log(promise);

      let response = await promise.json();
      console.log(response);

      if (promise.status === 200) {
        this.comitees = response.comites;
      }
    },
  },
};
export default MapComponent;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgicon {
  width: 30px;
  height: 30px;
}
.btn-geoc-adresse {
  display: flex;
  justify-content: space-around;
  gap: 25px;
  margin-bottom: 10px;
  margin-top: 50px;
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

/* .hidden {
	display: none;
} */
</style>
