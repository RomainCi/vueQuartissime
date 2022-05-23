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

    <!-- /********************** BOUTON POUR AFFICHAGE 3 COMITES/ASSOC LES PLUS PROCHES ********************* */ -->

    <button
      type="button"
      class="btn btn-warning btn-detail"
      @click="affichagetop3comassoc"
    >
      Afficher comité assoc
    </button>

    <br />
    <br />
    <!-- /********************** MAP ***********************/ -->
    <div v-if="!afficheDetails" id="map" class="page-map">
      <l-map style="height: 80vh; width: 80vw" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

        <!-- /********************** marquers comités ***********************/ -->
        <l-marker
          v-for="comitee in comitees"
          :key="comitee.id"
          :lat-lng="[comitee.latitude, comitee.longitude]"
        >
          <l-icon>
            <img class="imgicon" src="../assets/icon2.jpg" />
          </l-icon>
          <l-popup
            ><strong>Nom du comité : </strong> {{ comitee.comiteName }}<br />
            <strong>Adresse : </strong>{{ comitee.adress }}<br />
            <strong>Contact : </strong>{{ comitee.phone }}<br /><br />
            <button
              type="button"
              class="btn btn-warning btn-detail"
              @click="showdetailsComite(comitee.id)"
            >
              Voir les détails
            </button>
          </l-popup>
        </l-marker>

        <!-- /********************** marquers associations ***********************/ -->

        <l-marker
          v-for="association in associations"
          :key="association.id"
          :lat-lng="[association.latitude, association.longitude]"
        >
          <l-icon>
            <img class="imgicon" src="../assets/associcon.png" />
          </l-icon>
          <l-popup
            ><strong>Nom de l'association : </strong>
            {{ association.associationName }}<br />
            <strong>Adresse : </strong>{{ association.adress }}<br />
            <strong>Contact : </strong>{{ association.phone }}<br /><br />
            <button
              type="button"
              class="btn btn-warning btn-detail"
              @click="showdetailsAssociation(association.id)"
            >
              Voir les détails
            </button>
          </l-popup>
        </l-marker>

    <!-- /********************** GEOLOCALISATION ***********************/ -->
    <div class="btn-geoc">
      <div class="wrap">
        <button @click="geolocbutton" class="button">Me géolocaliser</button>
      </div>
    </div>
    <!-- /********************** RECHERCHE PAR ADRESSE ***********************/ -->
    <div class="search">
      <div class="col-3">
        <input
          v-model="search"
          class="effect-1"
          type="text"
          placeholder="Saisir une adresse"
        />
        <span class="focus-border"></span>
      </div>
      <div class="btnS">
        <input
          class="btnSearch"
          type="button"
          @click="getadress"
          value="Rechercher"
        />
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
            <router-link
              class="btn btn-warning btn-detail"
              :to="{ name: 'detailscomite', params: { idDetails: comitee.id } }"
            >
              Voir les détails
            </router-link>
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

    <!-- /********************** DÉTAILS COMITE ********************* */ -->

    <div v-else-if="afficheDetails">
      <p>{{ details.name }}</p>
      <p>{{ details.adress }}</p>
      <p>{{ details.phone }}</p>
    </div>

    <!-- /********************** DÉTAILS Associations ********************* */ -->

    <div>
      <p>{{ details.name }}</p>
      <p>{{ details.adress }}</p>
      <p>{{ details.phone }}</p>
    </div>
  </div>
</template>

<!-- ******************* SCRIPT ************************** */ -->
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
      associations: [],
      details: {},
      afficheDetails: false,
      search: "",
      latitude: "",
      longitude: "",
    };
  },

  mounted() {
    this.getComiteesList();
    this.getAssociationList();
  },

  methods: {
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
      const promise = await fetch("http://127.0.0.1:8000/api/publics", {
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
        this.comitees = response.comitees;
      }
    },

    /****************** RÉCUPÉRATION DES DÉTAILS D'UN COMITÉ ************/
    async showdetailsComite(id) {
      const promise = await fetch("http://127.0.0.1:8000/api/publics/" + id);
      console.log("test", promise);

      let response = await promise.json();
      console.log("response", response);

      if (promise.status === 200) {
        this.details = response.detailsComite;
      }

      this.afficheDetails = true;
      /* let map = document.getElementById("map");
			map.classList.add("hidden");

			let det = document.getElementsById("det");
			det.classList.remove("hidden"); */
    },

    /* ********************* RÉCUPÉRATION DES Associations ************* */
    async getAssociationList() {
      const promise = await fetch("http://127.0.0.1:8000/api/publics");
      console.log(promise);

      let response = await promise.json();
      console.log(response);

      if (promise.status === 200) {
        this.associations = response.associations;
      }
    },

    /****************** RÉCUPÉRATION DES DÉTAILS D'UNE Association ************/
    async showdetailsAssociation(id) {
      const promise = await fetch("http://127.0.0.1:8000/api/publics/" + id);
      console.log("testassoc", promise);

      let response = await promise.json();
      console.log("responseassoc", response);

      if (promise.status === 200) {
        this.details = response.detailsAssociation;
      }

      this.afficheDetails = true;
      /* let map = document.getElementById("map");
			map.classList.add("hidden");

			let det = document.getElementsById("det");
			det.classList.remove("hidden"); */
    },

    /****************** AFFICHAGE DES TOP 3 ACOMITES/ASSOCIATIONS  ************/

    async affichagetop3comassoc() {
      const response = await fetch(
        "http://127.0.0.1:8000/api/comites/nearest?lat=" +
          this.latitude +
          "&lon=" +
          this.longitude
      );

      const data = await response.json();

      this.comites = data.comites;
    },
  },
};
export default MapComponent;
</script>

<style scoped>
/************* Header map CSS ************/
.imgicon {
  width: 30px;
  height: 30px;
}
.btn-geoc {
  align-items: center;
  margin-bottom: 20px;
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
  padding: 10px;
}
/************* bouton geolocalisation ************/
.wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  min-width: 200px;
  min-height: 40px;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  letter-spacing: 1.3px;
  color: #373738;
  background: #ffffff;
  border: 4px solid #ffda3e;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px #ffda3e;
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 6px;
}

.button:hover,
.button:focus {
  color: #313133;
  transform: translateY(-4px);
}

button::after {
  content: "";
  width: 15px;
  height: 15px;
  border-radius: 100%;
  border: 6px solid #ffda3e;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 2s infinite;
}

button:hover::after,
button:focus::after {
  animation: none;
  display: none;
}

@keyframes ring {
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}
/************* Input adresse  ************/
:focus {
  outline: none;
}
.search {
  display: flex;
  justify-content: left;
  gap: 60px;
  margin-top: 70px;
}
.col-3 {
  float: left;
  width: 27.33%;
  position: relative;
}
input[type="text"] {
  font: 15px/24px "Lato", Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}

.effect-1 {
  border: 0;
  padding: 7px 0;
  border-bottom: 2px solid #ccc;
}

.effect-1 ~ .focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #ffda3e;
  transition: 0.4s;
}
.effect-1:focus ~ .focus-border {
  width: 100%;
  transition: 0.4s;
}

/************* Bouton adresse  ************/
.btnS {
  align-self: end;
}
.btnSearch {
  border: 4px solid #ffda3e;
  line-height: 2.5;
  padding: 0 20px;
  font-size: 1rem;
  text-align: center;
  color: rgb(0, 0, 0);
  border-radius: 20px;
  background-color: #ffffff;

  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.986),
    inset -2px -2px 3px rgba(0, 0, 0, 0.438);
}

.btnSearch:hover {
  background-color: #ffda3e;
}

.btnSearch:active {
  box-shadow: inset -2px -2px 3px rgb(255, 255, 255),
    inset 2px 2px 3px rgba(0, 0, 0, 0.424);
}
</style>
