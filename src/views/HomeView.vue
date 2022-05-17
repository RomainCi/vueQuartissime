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
        <!-- mettre @click la fonction getComites -->
        <button @click="getadress" class="btn-search">Rechercher</button>
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

  data() {
    return {
      search: "",
      latitude: "",
      longitude: "",
    };
  },

  methods: {
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

      //this.savedata();
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
