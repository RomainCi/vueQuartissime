<template>
  <div class="page-details">
    <div class="container-details">
      <p><strong>Nom du comité : </strong> {{ details.comiteName }}</p>
      <p><strong>Adresse : </strong>{{ details.adress }}</p>
      <p><strong>Contact : </strong>{{ details.phone }}</p>
      <p><strong>email : </strong>{{ details.email }}</p>
      <p><strong> Site web : </strong>{{ details.webSite }}</p>
      <p><strong>Description : </strong>{{ details.description }}</p>
      <p>
        <strong>Prénom Gestionnaire: </strong>{{ details.firstnamePresident }}
      </p>
      <p><strong>Nom Gestionnaire : </strong>{{ details.lastnamePresident }}</p>
    </div>
    <div class="div-img-personne">
      <img src="../assets/img-personne.png" alt="" class="img-personne" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const DetailsComiteView = {
  components: {
    idDetails: "",
  },

  data() {
    return {
      details: {},
    };
  },
  computed: {
    ...mapState({ idDetails: "id" }),
  },
  mounted() {
    this.showdetailsComite();
  },
  /****************** RÉCUPÉRATION DES DÉTAILS D'UN COMITÉ ************/
  methods: {
    async showdetailsComite() {
      const promise = await fetch(
        "http://127.0.0.1:8000/api/publics/" + this.idDetails
      );
      console.log("test", promise);
      let response = await promise.json();
      console.log("response", response);
      if (promise.status === 200) {
        this.details = response.detailsComite;
      }
    },
  },
};
export default DetailsComiteView;
</script>

<style scoped>
.div-img-personne {
  display: flex;
  justify-content: left;
}
.img-personne {
  height: 50vh;
  margin-top: -50px;
}
</style>
