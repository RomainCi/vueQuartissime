<template>
  <div>
    <h2>{{ titre }}</h2>
    <form class="formulaire" @submit.prevent="submitForm">
      <label for="nomAssoc">Nom Association</label>
      <input type="text" class="nomAssoc" v-model="user.nomAssoc" />

      <label for="adresse">Adresse</label>
      <input type="text" class="adresse" v-model="user.adresse" />

      <label for="status">Veuillez écrire publique ou prive</label>
      <input type="text" class="status" v-model="user.status" />
      <!-- <div>
        <input type="radio" id="public" name="drone" v-model="user.publique" />
        <label for="public">Publique</label>

        <input type="radio" id="prive" name="drone" v-model="user.prive" />
        <label for="prive">Prive</label>
      </div> -->

      <label for="email">Email</label>
      <input type="email" class="email" v-model="user.email" />

      <label for="telephone">Numéro de téléphone (optionnel)</label>
      <input
        type="text"
        class="telephone"
        maxlength="10"
        minlength="10"
        @input="phone"
        :value="tele"
      />

      <label for="description">Description</label>
      <textarea class="description" v-model="user.description"></textarea>
      <label for="photo">Photos (optionnelle, maximum 10, 2Mo par photo)</label>
      <input
        type="file"
        multiple
        @change="test"
        accept="image/*"
        class="input-file"
      />

      <label for="accord"
        >Une case à cocher (opt-in) doit être présente sur le formulaire pour
        recueillir le consentement éclairé de l’utilisateur pour la transmission
        des données au comité de quartier par email.</label
      >
      <input type="checkbox" class="accord" v-model="user.accord" />
      <button>Valider</button>

      <p @click="showRiverain">Si vous etes un riverain</p>
    </form>
  </div>
</template>

<script>
const AssocComponent = {
  props: {
    titre: String,
    showRiverain: Function,
  },
  data() {
    return {
      user: {
        nomAssoc: "",
        adresse: "",
        status: "",
        email: "",
        telephone: "",
        description: "",
        accord: false,
        previewImage: null,
      },
      tele: "",
    };
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append("avatar", this.user.previewImage);
      console.log("test", this.user.previewImage);
      let verif = this.verification();
      verif ? this.envoieInscription() : console.log("faux");
    },
    phone(e) {
      if (isNaN(e.target.value)) {
        e.target.value = this.tele;
        console.log("hey");
        return;
      }

      this.tele = e.target.value;
      this.user.telephone = this.tele;
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.user.previewImage = e.target.result;
      };
    },
    test(e) {
      // for (let index = 0; index < e.target.files.length; index++) {
      //   this.user.previewImage.push(e.target.files[index]);
      // }
      this.user.previewImage = e.target.files[0];
    },
    verification() {
      if (this.user.status == "prive") {
        return true;
      } else if (this.user.status == "publique") {
        return true;
      } else {
        return false;
      }
    },
    async envoieInscription() {
      const promise = await fetch("http://127.0.0.1:8000/api/assoc", {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(promise);
      let res = await promise.json();
      console.log(res);
    },
  },
};
export default AssocComponent;
</script>

<style scoped>
.formulaire {
  display: flex;
  flex-direction: column;
}
</style>