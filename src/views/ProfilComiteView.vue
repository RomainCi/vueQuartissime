<template>
  <div>
    <h1>PROFIL COMITE</h1>
    <p>{{ comite.comiteName }}</p>
  </div>
</template>

<script>
const ProfilComiteView = {
  data() {
    return {
      comite: {},
    };
  },
  mounted() {
    this.showComite();
  },
  methods: {
    async showComite() {
      const promise = await fetch("http://127.0.0.1:8000/api/profilcomite", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("profil", promise);

      let response = await promise.json();
      console.log("response", response);

      if (promise.status === 200) {
        this.comite = response.comite;
      }
    },
  },
};
export default ProfilComiteView;
</script>

<style scoped></style>
