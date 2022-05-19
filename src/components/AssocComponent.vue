<template>
  <div>
    <h2>{{ titre }}</h2>
    <form class="formulaire" @submit.prevent="submitForm">
      <label for="nomAssoc">Nom Association</label>
      <input type="text" class="nomAssoc" v-model="user.nomAssoc" />

      <label for="adresse">Adresse</label>
      <input type="text" class="adresse" v-model="user.adresse" />

      <div>
        <input type="radio" id="public" name="drone" v-model="user.publique" />
        <label for="public">Publique</label>

        <input type="radio" id="prive" name="drone" v-model="user.prive" />
        <label for="prive">Prive</label>
      </div>

      <label for="email">Email</label>
      <input type="email" class="email" v-model="user.email" />

      <label for="telephone">Numéro de téléphone (optionnel)</label>
      <input type="text" class="telephone" v-model="user.telephone" />

      <label for="description">Description</label>
      <textarea class="description" v-model="user.description"></textarea>
      <label for="photo">Photos (optionnelle, maximum 10, 2Mo par photo)</label>
      <input
        type="file"
        @change="uploadImage"
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
        publique: false,
        prive: false,
        email: "",
        telephone: "",
        description: "",
        accord: false,
        image: "",
      },
      previewImage: null,
    };
  },
  methods: {
    submitForm() {
      console.log(this.user, this.previewImage);
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
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