<template>
  <div>
    <header class="entete">
      <img src="../assets/logo.png" alt="" class="logo" />
    </header>
    <h4 class="title-profil">PROFIL COMITÉ</h4>
    <div class="bloc-details-img">
      <div class="div-img-personne">
        <img src="../assets/comite.jpeg" alt="" class="img-personne" />
      </div>
      <div class="container-details">
        <p><strong>Nom du comité : </strong> {{ comiteName }}</p>
        <p>
          <i class="fa-solid fa-map-location-dot"></i
          ><strong>Adresse du comité : </strong>{{ adress }}
        </p>
        <p><strong>Telephone : </strong>{{ phone }}</p>
        <p><strong>Email : </strong>{{ email }}</p>
        <p><strong> Site web : </strong>{{ webSite }}</p>
        <p><strong>Description : </strong>{{ description }}</p>
        <p><strong>Prénom du Président: </strong>{{ firstnamePresident }}</p>
        <p><strong>Nom du Président : </strong>{{ lastnamePresident }}</p>

        <button @click="openForm" class="btn updatebtn">
          Modifier les informations
        </button>
      </div>
    </div>
    <!---------- FORMULAIRE POP UP MODIFICATION DONNES COMITES -------------->

    <div class="div_form" id="popupForm">
      <form @submit.prevent="updateComite" class="form">
        <div class="form-group div-input">
          <label for="">Nom du comité</label>
          <input type="text" class="form-control" id="" v-model="comiteName" />
        </div>
        <div class="form-group">
          <label for="inputPhone">Téléphone</label>
          <input
            type="text"
            maxlength="10"
            minlength="10"
            class="form-control"
            id="inputPhone"
            @input="telephone"
            :value="phone"
          />
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            type="text"
            class="form-control"
            id="inputEmail"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="inputWebSite">Site web</label>
          <input
            type="text"
            class="form-control"
            id="inputWebSite"
            v-model="webSite"
          />
        </div>
        <div class="form-group">
          <!-- <label for="inputDescription">Description</label> -->
          <input
            type="text"
            class="form-control"
            id="inputDescription"
            v-model="description"
          />
        </div>

        <div class="form-group">
          <!-- <label for="inputFirstname">Prénom du Président</label> -->
          <input
            type="text"
            class="form-control"
            id="inputFirstname"
            v-model="firstnamePresident"
          />
        </div>
        <div class="form-group">
          <!-- <label for="inputLastname">Nom du Président</label> -->
          <input
            type="text"
            class="form-control"
            id="inputLastname"
            v-model="lastnamePresident"
          />
        </div>
        <div class="btnForm">
          <button type="submit" @click="savenewevent" class="btn updatebtn">
            Enregistrer
          </button>

          <button type="button" class="closebtn" @click="closeForm">
            Fermer
          </button>
        </div>
      </form>
    </div>

    <!----------- CONTAINER ASSOCITIONS ET EVENS  ------------>
    <div class="row bloc-assos-evens">
      <div class="card" style="width: 25rem">
        <img
          class="card-img-top"
          src="../assets/assoc.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">LES ASSOCITIONS</h5>

          <p class="card-text" v-for="assoc in detailsAssoc" :key="assoc.id">
            {{ assoc.nom }}
            {{ assoc.email }}
            {{ assoc.telephone }} <br />
            <button class="btn updatebtn">Modifier</button>
          </p>
          <form @submit.prevent="updateComite" class="form">
            <div class="form-group div-input">
              <label for="">Nom du comité</label>
              <input
                type="text"
                class="form-control"
                id=""
                v-model="assocNom"
              />
            </div>
            <button type="submit">Valider</button>
          </form>
        </div>
      </div>

      <div class="card" style="width: 25rem">
        <img
          class="card-img-top"
          src="../assets/evens.jpg"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">LES EVENEMENTS</h5>
          <p class="card-text" v-for="event in events" :key="event.id">
            {{ event.eventname }}
            {{ event.eventdate }}
            {{ event.place }}
            <button class="btn updatebtn">Modifier</button>
          </p>

          <!---------- FORMULAIRE POP UP MODIFICATION DONNES COMITES -------------->
          <button class="btn updatebtn" @click="openeventForm">
            Ajouter un évènement
          </button>

          <div class="form-popup" id="myForm">
            <form
              @submit.prevent
              action="/action_page.php"
              class="form-container"
            >
              <h1>Nouvel Evènement</h1>
              <label for="comite_id"><b>comite_id</b></label>
              <input type="number" name="comite_id" v-model="comite_id" /><br />

              <label for="eventname"><b>Nom de l'évènement</b></label>
              <input type="text" name="eventname" v-model="eventname" />

              <label for="place"><b>Lieu de l'évènement</b></label>
              <input type="text" name="place" v-model="eventplace" />

              <label for="eventdate"><b>date de l'évènement</b></label>
              <input
                type="text"
                placeholder="yyyy-mm-dd"
                name="date"
                v-model="eventdate"
              />

              <label for="description"><b>Description de l'évènement</b></label>
              <input
                type="text"
                name="description"
                v-model="eventdescription"
              />

              <label for="type"><b>Type de l'évènement</b></label>
              <input type="text" name="type" v-model="eventtype" />

              <button type="submit" class="updatebtn" @click="submiteventdata">
                Soumettre
              </button>
              <button type="button" class="btn cancel" @click="closeeventForm">
                Fermer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ProfilComiteView = {
  data() {
    return {
      comiteName: "",
      adress: "",
      phone: "",
      email: "",
      webSite: "",
      description: "",
      firstnamePresident: "",
      lastnamePresident: "",
      eventname: "",
      place: "",
      eventdate: "",
      type: "",
      comite_id: "",

      detailsAssoc: [],
      assocNom: "",

      events: [],
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
        this.comiteName = response.comite.comiteName;
        this.adress = response.comite.adress;
        this.phone = response.comite.phone;
        this.email = response.comite.email;
        this.webSite = response.comite.webSite;
        this.description = response.comite.description;
        this.firstnamePresident = response.comite.firstnamePresident;
        this.lastnamePresident = response.comite.lastnamePresident;

        this.detailsAssoc = response.assoc;
        this.events = response.detailsEvents;
      }
    },

    async updateComite() {
      const promise = await fetch("http://127.0.0.1:8000/api/profilcomite", {
        method: "PUT",
        body: JSON.stringify({
          comiteName: this.comiteName,
          phone: this.phone,
          email: this.email,
          webSite: this.webSite,
          description: this.description,
          firstnamePresident: this.firstnamePresident,
          lastnamePresident: this.lastnamePresident,

          assocNom: this.assocNom,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      let res = await promise.json();
      console.log("update", res);
      if (promise.status === 200) {
        console.log("c'est good");
      } else {
        console.log("c'est pas good");
      }
    },
    // FONCTION QUI PERMET D'ECRIRE QUE DES CHIFFRES DANS L'INPUT TEL QUI DE BASE EST DE TYPE TEXT
    telephone(e) {
      if (isNaN(e.target.value)) {
        e.target.value = this.tele;
        return;
      }

      this.tele = e.target.value;
      this.phone = this.tele;
    },

    async submiteventdata() {
      const promise = await fetch("http://127.0.0.1:8000/api/events", {
        method: "POST",
        body: JSON.stringify({
          comite_id: this.comite_id,
          eventname: this.eventname,
          eventdate: this.eventdate,
          place: this.eventplace,
          description: this.eventdescription,
          type: this.eventtype,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let res = await promise.json();
      console.log(res);
      if (promise.status === 200) {
        console.log("new event saved");
      } else {
        console.log("event not saved");
      }
    },

    // FONCTIONS POUR OUVRIR LE FORMULAIRE DE MODIFICATIONS

    openForm() {
      document.getElementById("popupForm").style.display = "block";
    },

    closeForm() {
      document.getElementById("popupForm").style.display = "none";
    },

    openeventForm() {
      document.getElementById("myForm").style.display = "block";
    },

    closeeventForm() {
      document.getElementById("myForm").style.display = "none";
    },
  },
};

export default ProfilComiteView;
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

.title-profil {
  text-align: left;
  margin-top: 30px;
  margin-left: 30px;
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
.bloc-details-img {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 70px;
  gap: 8%;
}
/* CONTAINER FORMULAIRE POPUP */
.div_form {
  display: none;
  padding: 30px;
  border: solid #ffda3e 3px;
  border-radius: 10px;
  width: 90%;
  position: absolute;
  top: 15%;
  left: 5%;
  background-color: white;
}
.btnForm {
  display: flex;
  justify-content: center;
  gap: 40px;
}
.updatebtn {
  background-color: #ffda3e;
}
.closebtn {
  background-color: black;
  color: white;
}

.bloc-assos-evens {
  display: flex;
  justify-content: center;
  margin: 110px 20px 0px 30px;
  gap: 10%;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.form-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

.form-container {
  max-width: 500px;
  padding: 10px;
  background-color: white;
}

.form-container input[type="text"] {
  width: 50%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}
</style>
