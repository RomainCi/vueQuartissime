<template>
  <label for="insertadress">Insérer votre adresse</label>
  <input type="text" v-model="search" id="insertadress" />
  <button @click="getadress">search</button>

  <p>ou je me géocalise</p>
  <button @click="geolocbutton">Se Gélocaliser</button>

  <p>Mes coordonnées par Géolocalisation</p>
  <p>Longitude: {{ longitude }}</p>
  <p>Lattitude: {{ latitude }}</p>
</template>

<script>
export default {
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
