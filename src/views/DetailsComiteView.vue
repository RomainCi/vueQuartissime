<template>
  <div class="page-details">
    <div class="home">
      <header class="entete">
        <img src="../assets/logo.png" alt="" class="logo" />
      </header>
      <!------------ BLOC DETAILS COMITE AVEC IMAGE  ------------->

      <div class="bloc-details-img">
        <div class="div-img-personne">
          <img src="../assets/img-personne.png" alt="" class="img-personne" />
        </div>
        <div class="container-details">
          <p><strong>COMITE : </strong> {{ details.comiteName }}</p>
          <p>
            <i class="fa-solid fa-map-location-dot"></i
            ><strong>Adresse : </strong>{{ details.adress }}
          </p>
          <p><strong>Contact : </strong>{{ details.phone }}</p>
          <p><strong>email : </strong>{{ details.email }}</p>
          <p><strong> Site web : </strong>{{ details.webSite }}</p>
          <p><strong>Description : </strong>{{ details.description }}</p>
          <p>
            <strong>Prénom Gestionnaire: </strong
            >{{ details.firstnamePresident }}
          </p>
          <p>
            <strong>Nom Gestionnaire : </strong>{{ details.lastnamePresident }}
          </p>

          <button type="button" class="slide">
            <div>S'inscrire</div>
            <i class="icon-arrow-right"></i>
          </button>
        </div>
      </div>

      <div class="row bloc-assos-evens">
        <div class="card" style="width: 25rem">
          <img
            class="card-img-top"
            src="../assets/img-assos.png"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">LES ASSOCITIONS</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>

        <div class="card" style="width: 25rem">
          <img
            class="card-img-top"
            src="../assets/img-evens.png"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">LES EVENEMENTS</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const DetailsComiteView = {
  props: {
    idDetails: String,
  },

  data() {
    return {
      details: {},
    };
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
.entete {
  min-height: 80px;
  border-bottom: 4px solid black;
}
.logo {
  height: 7vh;
  margin: 20px;
}
.bloc-details-img {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 70px;
  gap: 8%;
}
.container-details {
  padding: 25px;
  border: solid 2px #ffda3e;
  width: 50%;
  box-shadow: 30px -16px #ffda3e;
  border-radius: 15px;
}

.img-personne {
  height: 65vh;
  margin-left: 10px;
}
/* CSS BOUTTON INSCRIPTION */
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

.bloc-assos-evens {
  display: flex;
  justify-content: center;
  margin: 110px 20px 0px 30px;
  gap: 10%;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
</style>
