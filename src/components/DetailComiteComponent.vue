<template>
  <div>
    <ul v-for="comitee in comitees" :key="comitee.id">
      <p><strong>Nom du comité : </strong> {{ comitee.comiteName }}</p>
      <p><strong>Adresse : </strong>{{ comitee.adress }}</p>
      <p><strong>Contact : </strong>{{ comitee.phone }}</p>
    </ul>
  </div>
</template>

<script>
const DetailComiteComponent = {
  data() {
    return {
      comitees: [],
    };
  },

  mounted() {
    this.getComiteesList();
  },

  methods: {
    async getComiteesList() {
      const promise = await fetch("http://127.0.0.1:8000/api/publics");
      console.log(promise);

      let response = await promise.json();
      console.log(response);

      if (promise.status === 200) {
        this.comitees = response.comites;
      }
    },
  },
};
export default DetailComiteComponent;
</script>

<style scoped></style>
