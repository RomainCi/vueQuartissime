<template>
  <!-- CSS only -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
    crossorigin="anonymous"
  />
  <div class="page-details">
    <div class="container-details">
      <p><strong>COMMITE : </strong> {{ details.comiteName }}</p>
      <p>
        <i class="fa-solid fa-map-location-dot"></i><strong>Adresse : </strong
        >{{ details.adress }}
      </p>
      <p><strong>Contact : </strong>{{ details.phone }}</p>
      <p><strong>email : </strong>{{ details.email }}</p>
      <p><strong> Site web : </strong>{{ details.webSite }}</p>
      <p><strong>Description : </strong>{{ details.description }}</p>
      <p>
        <strong>Prénom Gestionnaire: </strong>{{ details.firstnamePresident }}
      </p>
      <p><strong>Nom Gestionnaire : </strong>{{ details.lastnamePresident }}</p>

      <button type="button" class="slide">
        <div>S'inscrire</div>
        <i class="icon-arrow-right"></i>
      </button>
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
.container-details {
  margin-top: 70px;
  padding: 25px;
  border: solid 2px #ffda3e;
  width: 50%;
  margin-left: 25%;
  box-shadow: 30px -16px #ffda3e;
  border-radius: 15px;
}
.div-img-personne {
  display: flex;
  justify-content: left;
}
.img-personne {
  height: 53vh;
  margin-top: -15%;
}

.slide {
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 10px 20px 10px;
  outline: 0;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
}

.slide i {
  opacity: 0;
  font-size: 13px;
  transition: 0.2s;
  position: absolute;
  right: 10px;
  top: 21px;
  transition: transform 1;
}

.slide div {
  transition: transform 0.8s;
}

.slide:hover div {
  transform: translateX(-6px);
}

.slide::after {
  content: "";
  background-color: #ffda3e;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  border-radius: 5px;
}

.slide:hover i {
  opacity: 1;
  transform: translateX(-6px);
}

/* CSS BOUTTON INSCRIPTION */
</style>
