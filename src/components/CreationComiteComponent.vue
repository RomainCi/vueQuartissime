<template>
  <div>
    <h1>Creation comite de quartier</h1>
    <div>
      <form class="container" @submit.prevent="submitForm">
        <div class="container1">
          <div class="aligne">
            <label for="indentifiant">identifiant</label>
            <input type="text" v-model="user.identifiant" />
          </div>

          <div class="aligne">
            <label for="password">password</label>
            <input type="text" v-model="user.password" />
          </div>

          <div class="aligne">
            <label for="nom">Nom du comite</label>
            <input type="text" v-model="comite.nom" />
          </div>

          <div class="aligne">
            <label for="nomP">Nom du president</label>
            <input type="text" v-model="comite.nomP" />
          </div>

          <div class="aligne">
            <label for="prenomP">Prenom du president</label>
            <input type="text" v-model="comite.prenomP" />
          </div>

          <div class="aligne">
            <label for="photo"
              >Photos (optionnelle, maximum 10, 2Mo par photo)</label
            >
            <input
              type="file"
              ref="fileuplaod"
              multiple
              @change="file"
              accept="image/*"
              class="input-file"
            />
          </div>
        </div>
        <div class="container2">
          <div class="aligne">
            <label for="adresse">adresse</label>
            <input type="text" v-model="comite.adresse" />
          </div>

          <div class="aligne">
            <label for="email">email</label>
            <input type="email" v-model="comite.email" />
          </div>

          <div class="aligne">
            <label for="telephone">telephone</label>
            <input type="text" v-model="comite.telephone" />
          </div>

          <div class="aligne">
            <label for="facebook">lien Facebook</label>
            <input type="text" v-model="comite.facebook" />
          </div>

          <div class="aligne">
            <label for="siteWeb">lien site Web</label>
            <input type="text" v-model="comite.site" />
          </div>

          <div class="aligne">
            <label for="descritpion">description</label>
            <textarea
              class="description"
              v-model="comite.description"
            ></textarea>
          </div>
          <button>Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const CreationComiteComponent = {
  props: {
    recharge: Function,
  },
  data() {
    return {
      user: {
        identifiant: "",
        password: "",
      },
      comite: {
        nom: "",
        nomP: "",
        prenomP: "",
        adresse: "",
        email: "",
        telephone: "",
        facebook: "",
        site: "",
        description: "",
      },
      image: null,
    };
  },
  methods: {
    submitForm() {
      this.recupCoords();
    },
    file(e) {
      this.image = e.target.files;
    },
    async recupCoords() {
      try {
        const response = await fetch(
          "https://api-adresse.data.gouv.fr/search/?q=" + this.comite.adresse
        );

        const data = await response.json();

        if (data) {
          let longitude = data.features?.[0].geometry.coordinates[0];
          let latitude = data.features?.[0].geometry.coordinates[1];
          this.envoieInscription(longitude, latitude);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async envoieInscription(longitude, latitude) {
      let fd = new FormData();
      if (this.image != null) {
        for (let index = 0; index < this.image.length; index++) {
          fd.append("images[" + index + "]", this.image[index]);
        }
      }
      fd.append("latitude", latitude);
      fd.append("longitude", longitude);
      fd.append("identifiant", this.user.identifiant);
      fd.append("password", this.user.password);
      fd.append("nom", this.comite.nom);
      fd.append("nomP", this.comite.nomP);
      fd.append("prenomP", this.comite.prenomP);
      fd.append("adresse", this.comite.adresse);
      fd.append("email", this.comite.email);
      fd.append("telephone", this.comite.telephone);
      fd.append("facebook", this.comite.facebook);
      fd.append("site", this.comite.site);
      fd.append("description", this.comite.description);

      const promise = await fetch(
        "http://127.0.0.1:8000/api/inscriptionComite",
        {
          method: "POST",
          body: fd,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admin_token"),
          },
        }
      );

      console.log(promise);
      let res = await promise.json();
      console.log(res);
      if (promise.status === 200) {
        this.recharge();
      } else {
        console.log("c'est pas good");
      }
    },
  },
};
export default CreationComiteComponent;
</script>

<style scoped>
.container {
  display: flex;
}

.aligne {
  display: flex;
  flex-direction: column;
}
</style>